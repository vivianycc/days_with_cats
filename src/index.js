import {
  Application,
  AnimatedSprite,
  Loader,
  utils,
  Texture,
  Graphics,
  Text,
  Sprite,
  State,
} from "pixi.js";
import { machine, transition } from "./machine";
import { createTimer } from "./timer";

let type = "WebGL";
if (!utils.isWebGLSupported()) {
  type = "canvas";
}

utils.sayHello(type);

//Create a Pixi Application
let app = new Application({
  width: 1280, // default: 800
  height: 720, // default: 600
  antialias: true, // default: false
  backgroundAlpha: 1,
  resolution: 1, // default: 1
});

app.renderer.backgroundColor = 0xc4c4c4;
//Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view);

const loader = Loader.shared;
loader.onLoad.add((loader, resource) => {
  //Display the file `url` currently being loaded
  console.log("loading: " + resource.url);

  //Display the percentage of files currently loaded
  console.log("progress: " + loader.progress + "%");

  //If you gave your files names as the first argument
  //of the `add` method, you can access them like this
  //console.log("loading: " + resource.name);
});

loader
  .add("assets/sit_to_sleep.json")
  .add("assets/walk_sit.json")
  .add("assets/cat-standing.png")
  .add("assets/cat-walk-left.png")
  .add("assets/cat-walk-right.png")
  .add("assets/cat-sleeping.png")
  .add("assets/cat-bathing.png")
  .add("assets/bg-1.jpg")
  .load(onAssetsLoaded);

let cat, cat_sitting, cat_walk_left, cat_walk_right, cat_sleeping;
let direction = 5;

function onAssetsLoaded(e, r) {
  let walk_sit_sheet =
    Loader.shared.resources["assets/walk_sit.json"].spritesheet;
  let sit_sleep_sheet =
    Loader.shared.resources["assets/sit_to_sleep.json"].spritesheet;
  cat_sitting = Loader.shared.resources["assets/cat-standing.png"].texture;
  cat_walk_left = Loader.shared.resources["assets/cat-walk-left.png"].texture;
  cat_walk_right = Loader.shared.resources["assets/cat-walk-right.png"].texture;
  cat_sleeping = Loader.shared.resources["assets/cat-sleeping.png"].texture;
  cat = new Sprite(cat_sitting);

  let bg = new Sprite(Loader.shared.resources["assets/bg-1.jpg"].texture);

  cat.animationSpeed = 0.08;
  cat.x = app.screen.width / 2;
  cat.y = 480;
  cat.anchor.set(0.5);
  cat.width = 200;
  cat.height = 200;

  // cat.on("pointerdown", () => {
  //   state = flying;
  // });
  bg.x = app.screen.width / 2;
  bg.y = app.screen.height / 2;
  bg.anchor.set(0.5);
  bg.width = app.screen.width;
  bg.height = app.screen.height;

  app.stage.addChild(bg, cat);
  // app.ticker.add(() => {
  //   cat.x += direction;

  //   if (cat.x == app.screen.width) {
  //     direction = -1;
  //   }
  //   if (cat.x == 0) {
  //     direction = 1;
  //   }
  // });
  app.ticker.add((delta) => gameLoop(delta));
}

// function sendEvent(event) {
//   let nextState = transition(currentState, event);
//   currentState = nextState;
//   console.log(currentState);
// }

// window.sendEvent = sendEvent;

let currentState = machine.initial;
let timer = createTimer();
function gameLoop(delta) {
  timer.tick();
  checkTime(timer.getTime());
  UIStates[currentState]();
}

// function walking() {
//   let direction = -1;
//   cat.x += direction;

//   if (cat.x == app.screen.width) {
//     direction = -1;
//   }
//   if (cat.x == 0) {
//     direction = 1;
//   }
// }

function checkTime(time) {
  console.log(time);
  if (time === 10) {
    currentState = transition(currentState, "TIME_TO_WALK");
  } else if (time === 500) {
    currentState = transition(currentState, "TIME_TO_SIT");
  } else if (time === 600) {
    currentState = transition(currentState, "TIME_TO_SLEEP");
  } else if (time === 900) {
    currentState = transition(currentState, "TIME_TO_WAKEUP");
  } else if (time > 1000) {
    timer.reset();
  }
  console.log(currentState);
}

const UIStates = {
  walking: () => {
    console.log("walking now!");
    if (direction > 0) {
      cat.texture = cat_walk_right;
    } else {
      cat.texture = cat_walk_left;
    }

    if (cat.x == 0 || cat.x < 0) {
      direction = 5;
    }
    if (cat.x == app.screen.width || cat.x > app.screen.width) {
      direction = -5;
    }
    cat.x += direction;
  },
  sleeping: () => {
    cat.texture = cat_sleeping;
    cat.x = cat.x;
    cat.y = cat.y;
    console.log("sleeping now!");
  },
  idle: () => {
    cat.texture = cat_sitting;
    console.log("sitting now!");
  },
};

import {
  Application,
  AnimatedSprite,
  Loader,
  utils,
  Texture,
  Graphics,
  Text,
} from "pixi.js";
import { Cat } from "./assets";

let type = "WebGL";
if (!utils.isWebGLSupported()) {
  type = "canvas";
}

utils.sayHello(type);

//Create a Pixi Application
let app = new Application({
  width: 800, // default: 800
  height: 360, // default: 600
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

loader.add("assets/nekonin.json").load(onAssetsLoaded);

let nekonin;

function onAssetsLoaded(e, r) {
  let sheet = Loader.shared.resources["assets/nekonin.json"].spritesheet;

  nekonin = new AnimatedSprite(sheet.animations["nekonin-left"]);

  nekonin.x = app.screen.width / 2;
  nekonin.y = app.screen.height / 2;
  nekonin.width = 80;
  nekonin.height = 80;
  nekonin.anchor.set(0.5);
  nekonin.animationSpeed = 0.1;
  nekonin.play();

  app.stage.addChild(nekonin);

  let button3 = createButton(
    3,
    app.screen.width - 40,
    app.screen.height - 40,
    "3"
  );
  let button2 = createButton(
    2,
    app.screen.width - 96,
    app.screen.height - 40,
    "2"
  );
  let button1 = createButton(
    1,
    app.screen.width - 152,
    app.screen.height - 40,
    "1"
  );
  app.stage.addChild(button1, button2, button3);

  let direction = -1;
  // Animate the rotation
  app.ticker.add(() => {
    nekonin.x += direction;

    if (nekonin.x == app.screen.width) {
      direction = -1;
    }
    if (nekonin.x == 0) {
      direction = 1;
    }
  });
}

// const cat_bathing = PIXI.Sprite.from("./img/cat-begging.png");
// app.stage.addChild(cat_bathing);
function createButton(id, x, y, label) {
  let button = new Graphics();
  button.lineStyle(1, 0xffffff, 1);
  button.beginFill(0xffffff, 0.25);
  button.drawCircle(x, y, 24);
  button.endFill();

  let text = new Text(`${label}`);
  text.anchor.set(0.5);
  text.x = x;
  text.y = y;
  text.style = { fill: 0xffffff };

  button.interactive = true;
  button.buttonMode = true;
  button.addChild(text);
  button.on("pointerdown", () => changeState(id));
  return button;
}

function changeState(buttonId) {
  let sheet = Loader.shared.resources["assets/nekonin.json"].spritesheet;
  if (buttonId == 1) {
    nekonin.textures = sheet.animations["nekonin-left"];
  } else if (buttonId == 2) {
    nekonin.textures = sheet.animations["nekonin-front"];
  } else if (buttonId == 3) {
    nekonin.textures = sheet.animations["nekonin-right"];
  }
  nekonin.play();
}

import * as PIXI from "pixi.js";
import { Cat } from "./img";

let type = "WebGL";
if (!PIXI.utils.isWebGLSupported()) {
  type = "canvas";
}

PIXI.utils.sayHello(type);

//Create a Pixi Application
let app = new PIXI.Application({
  width: 1200, // default: 800
  height: 1200, // default: 600
  antialias: true, // default: false
  backgroundAlpha: 1,
  resolution: 1, // default: 1
});

//Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view);
PIXI.Loader.shared
  .add("cat_standing", Cat.standing)
  .add("cat_running", Cat.running)
  .load(onAssetsLoaded);

function onAssetsLoaded() {
  let catframes = [];

  // var cat_default = PIXI.Texture.from(Cat.standing);
  // var cat_running = PIXI.Texture.from(Cat.running);

  catframes = [PIXI.Texture.from(Cat.standing), PIXI.Texture.from(Cat.running)];

  const anim = new PIXI.AnimatedSprite(catframes);

  anim.x = app.screen.width / 2;
  anim.y = app.screen.height / 2;
  anim.anchor.set(0.5);
  anim.animationSpeed = 0.01;
  anim.play();

  app.stage.addChild(anim);
  console.log(app.stage);
  // Animate the rotation
  app.ticker.add(() => {
    anim.rotation += 0.01;
  });
}

// const cat_bathing = PIXI.Sprite.from("./img/cat-begging.png");
// app.stage.addChild(cat_bathing);

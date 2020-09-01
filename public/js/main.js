import { loadLevel } from "./loaders.js";
import { loadMarioSprite, loadBackgroundSprites } from "./sprites.js";
import Compositor from "./compositor.js";
import { createBackgroundLayer, createSpriteLayer } from "./layers.js";

const canvas = document.createElement("canvas");
canvas.width = 640;
canvas.height = 640;
const context = canvas.getContext("2d");
document.body.appendChild(canvas);

Promise.all([
  loadMarioSprite(),
  loadBackgroundSprites(),
  loadLevel("1-1"),
]).then(([marioSprite, backgroundSprites, level]) => {
  const comp = new Compositor();
  const backgroundLayer = createBackgroundLayer(level.backgrounds, backgroundSprites);
  comp.layers.push(backgroundLayer);

  const pos = { x: 64, y: 64 };

  const spriteLayer = createSpriteLayer(marioSprite, pos);
  comp.layers.push(spriteLayer);

  function update() {
    comp.draw(context);
    marioSprite.draw("idle", context, pos.x, pos.y);
    pos.x += 2;
    pos.y += 2;
    requestAnimationFrame(update);
  }

  update();
});

import Compositor from "./compositor.js";
import { loadLevel } from "./loaders.js";
import { loadBackgroundSprites } from "./sprites.js";
import { createMario } from "./entities.js";
import { createBackgroundLayer, createSpriteLayer } from "./layers.js";

const canvas = document.createElement("canvas");
canvas.width = 640;
canvas.height = 640;
const context = canvas.getContext("2d");
document.body.appendChild(canvas);

Promise.all([createMario(), loadBackgroundSprites(), loadLevel("1-1")]).then(
  ([mario, backgroundSprites, level]) => {
    const comp = new Compositor();
    const backgroundLayer = createBackgroundLayer(
      level.backgrounds,
      backgroundSprites
    );
    comp.layers.push(backgroundLayer);

    const gravity = 0.5;

    const spriteLayer = createSpriteLayer(mario);

    comp.layers.push(spriteLayer);

    function update() {
      comp.draw(context);
      mario.update();
      mario.pos.x += mario.vel.x;
      mario.pos.y += mario.vel.y;
      mario.vel.y += gravity;

      // requestAnimationFrame(update);
      setTimeout(update, 1000 / 144);
    }

    update();
  }
);

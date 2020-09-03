import Compositor from "./compositor.js";
import Timer from "./timer.js";
import { loadLevel, loadCanvas } from "./loaders.js";
import { loadBackgroundSprites } from "./sprites.js";
import { createMario } from "./entities.js";
import { createBackgroundLayer, createSpriteLayer } from "./layers.js";
import KeyboardState from "./keyboardState.js";

Promise.all([
  loadCanvas(),
  createMario(),
  loadBackgroundSprites(),
  loadLevel("1-1"),
]).then(([context, mario, backgroundSprites, level]) => {
  const comp = new Compositor();
  const backgroundLayer = createBackgroundLayer(
    level.backgrounds,
    backgroundSprites
  );
  comp.layers.push(backgroundLayer);

  const gravity = 2000;
  mario.pos.set(64, 180);
 // mario.vel.set(200, -600);

  const input = new KeyboardState();
  input.addMapping(32, (keyState) => {
    if (keyState) {
      mario.jump.start();
    } else {
      mario.jump.cancel();
    }
  });

  input.listenTo(window);

  const spriteLayer = createSpriteLayer(mario);
  comp.layers.push(spriteLayer);
  const timer = new Timer(1 / 60);

  timer.update = function update(deltaTime) {
    mario.update(deltaTime);
    mario.vel.y += gravity * deltaTime;
    comp.draw(context);
  };

  timer.start();
});

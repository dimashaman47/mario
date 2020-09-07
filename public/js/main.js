import Timer from "./timer.js";
import { loadLevel, loadContext } from "./loaders.js";

import { createMario } from "./entities.js";
import { createCollisionLayer } from "./layers.js";
import KeyboardState from "./keyboardState.js";

Promise.all([loadContext(), createMario(), loadLevel("1-1")]).then(
  ([context, mario, level]) => {
    const gravity = 2000;
    mario.pos.set(64, 180);
    createCollisionLayer(level);

    level.entities.add(mario);

    level.comp.layers.push(createCollisionLayer(level));

    const input = new KeyboardState();
    input.addMapping(32, (keyState) => {
      if (keyState) {
        mario.jump.start();
      } else {
        mario.jump.cancel();
      }
    });

    input.listenTo(window);
    ["mousedown", "mousemove"].forEach((eventName) => {
      context.canvas.addEventListener(eventName, (event) => {
        if (event.buttons === 1) {
          mario.vel.set(0, 0);
          mario.pos.set(event.offsetX, event.offsetY);
        }
      });
    });

    const timer = new Timer(1 / 60);

    timer.update = (deltaTime) => {
      level.update(deltaTime);
      mario.vel.y += gravity * deltaTime;
      level.comp.draw(context);
    };

    timer.start();
  }
);

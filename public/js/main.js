import Timer from "./timer.js";
import { loadLevel, loadContext } from "./loaders.js";

import { createMario } from "./entities.js";

import KeyboardState from "./keyboardState.js";

Promise.all([loadContext(), createMario(), loadLevel("1-1")]).then(
  ([context, mario, level]) => {
    const gravity = 2000;
    mario.pos.set(64, 180);
    // mario.vel.set(200, -600);

    level.entities.add(mario);

    const input = new KeyboardState();
    input.addMapping(32, (keyState) => {
      if (keyState) {
        mario.jump.start();
      } else {
        mario.jump.cancel();
      }
    });

    input.listenTo(window);

    const timer = new Timer(1 / 60);

    timer.update = (deltaTime) => {
      level.update(deltaTime)
      //mario.update(deltaTime);
      mario.vel.y += gravity * deltaTime;
      level.comp.draw(context);
    };

    timer.start();
  }
);

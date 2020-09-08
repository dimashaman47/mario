import Timer from "./timer.js";
import { loadLevel, loadContext } from "./loaders.js";
import { createMario } from "./entities.js";
import { createCollisionLayer } from "./layers.js";
import { setupKeyboard } from "./input.js";

Promise.all([loadContext(), createMario(), loadLevel("1-1")]).then(
  ([context, mario, level]) => {
    mario.pos.set(64, 180);
    createCollisionLayer(level);

    level.entities.add(mario);

    level.comp.layers.push(createCollisionLayer(level));

    const input = setupKeyboard(mario);

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

      level.comp.draw(context);
    };

    timer.start();
  }
);

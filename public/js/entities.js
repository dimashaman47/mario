import Entity from "./entity.js";
import { loadMarioSprite } from "./sprites.js";

export function createMario() {
  const mario = new Entity();
  mario.pos.set(30, 200);
  mario.vel.set(2, -10);

  return loadMarioSprite().then((marioSprite) => {
    mario.draw = function drawMario(context) {
      marioSprite.draw("idle", context, this.pos.x, this.pos.y);
    };
    mario.update = function updateMario() {
      this.pos.x += this.vel.x;
      this.pos.y += this.vel.y;
    };
    return mario;
  });
}

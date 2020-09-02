import Entity from "./entity.js";
import { loadMarioSprite } from "./sprites.js";

export function createMario() {
  const mario = new Entity();

  return loadMarioSprite().then((marioSprite) => {
    mario.draw = function drawMario(context) {
      marioSprite.draw("idle", context, this.pos.x, this.pos.y);
    };
    mario.update = function updateMario(deltaTime) {
      this.pos.x += this.vel.x * deltaTime;
      this.pos.y += this.vel.y * deltaTime;
    };
    return mario;
  });
}

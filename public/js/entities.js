import Entity, { Trait } from "./entity.js";
import { loadMarioSprite } from "./sprites.js";
import Velocity from "./traits/velocity.js";
import Jump from "./traits/Jump.js";

export function createMario() {
  const mario = new Entity();

  return loadMarioSprite().then((marioSprite) => {
    mario.size.set(14, 16);
    mario.addTrait(new Velocity());
    mario.addTrait(new Jump());
    mario.draw = function drawMario(context) {
      marioSprite.draw("idle", context, this.pos.x, this.pos.y);
    };

    return mario;
  });
}

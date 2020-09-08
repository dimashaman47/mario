import { Trait } from "../entity.js";
export default class Go extends Trait {
  constructor() {
    super("go");
    this.speed = 6000;
    this.dir = 0;
  }

  update(entity, deltaTime) {
    entity.vel.x = this.speed * this.dir * deltaTime;
  }
}

export default class SpriteSheet {
  constructor(image, width, height) {
    this.image = image;
    this.height = height;
    this.width = width;
    this.tiles = new Map();
  }

  define(name, x, y) {
    const buffer = document.createElement("canvas");
    buffer.width = this.width;
    buffer.height = this.height;
    buffer
      .getContext("2d")
      .drawImage(
        this.image,
        x,
        y,
        this.width,
        this.height,
        0,
        0,
        this.width,
        this.height
      );
    this.tiles.set(name, buffer);
  }

  defineTile(name, x, y) {
    this.define(name, x * this.width, y * this.height);
  }

  draw(name, context, x, y) {
    const buffer = this.tiles.get(name);
    context.drawImage(buffer, x, y);
  }

  drawTile(name, context, x, y) {
    this.draw(name, context, x * 16, y * 16);
  }
}

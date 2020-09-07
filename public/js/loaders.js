import { createBackgroundLayer, createSpriteLayer } from "./layers.js";
import { loadBackgroundSprites } from "./sprites.js";
import Level from "./level.js";

export function loadImage(url) {
  return new Promise((resolve) => {
    const image = new Image();
    image.addEventListener("load", () => {
      resolve(image);
    });
    image.src = url;
  });
}

function createTiles(level, backgrounds) {
  backgrounds.forEach((background) => {
    background.ranges.forEach(([x1, x2, y1, y2]) => {
      for (let x = x1; x < x2; ++x) {
        for (let y = y1; y < y2; ++y) {
          level.tiles.set(x, y, {
            name: background.tile,
          });
        }
      }
    });
  });
}

export function loadLevel(name) {
  return Promise.all([
    loadBackgroundSprites(),
    fetch(`/levels/${name}.json`).then((r) => r.json()),
  ]).then(([backgroundSprite, levelSpec]) => {
    const level = new Level();
    createTiles(level, levelSpec.backgrounds);
    const backgroundLayer = createBackgroundLayer(level, backgroundSprite);
    level.comp.layers.push(backgroundLayer);
    const spriteLayer = createSpriteLayer(level.entities);
    level.comp.layers.push(spriteLayer);

    console.log(level);

    return level;
  });
}

export async function loadContext() {
  const canvas = await document.createElement("canvas");
  await document.body.appendChild(canvas);
  canvas.width = 640;
  canvas.height = 640;
  let context = canvas.getContext("2d");
  return context;
}

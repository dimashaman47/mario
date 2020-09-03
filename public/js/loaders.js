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

export function loadLevel(name) {
  return Promise.all([
    loadBackgroundSprites(),
    fetch(`/levels/${name}.json`).then((r) => r.json()),
  ]).then(([backgroundSprite, levelSpec]) => {
    const level = new Level();
    const backgroundLayer = createBackgroundLayer(
      levelSpec.backgrounds,
      backgroundSprite
    );
    level.comp.layers.push(backgroundLayer);
    const spriteLayer = createSpriteLayer(level.entities);
    level.comp.layers.push(spriteLayer);

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

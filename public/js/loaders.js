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
  return fetch(`/levels/${name}.json`).then((r) => r.json());
}

export async function loadCanvas() {
  const canvas = await document.createElement("canvas");
  await document.body.appendChild(canvas);
  canvas.width = 640;
  canvas.height = 640;
  let context = canvas.getContext("2d");
  return context;
}

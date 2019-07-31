let WIDTH;
let HEIGHT;
const NOISE_SCALE = 50;

function setup() {
  let canvasContainer = document.getElementById("canvas-container");
  createCanvas(canvasContainer.offsetWidth, canvasContainer.offsetHeight).parent('canvas-container');
  HEIGHT = canvasContainer.offsetHeight;
  WIDTH = canvasContainer.offsetWidth;
  strokeWeight(1);
  frameRate(60);
}

function draw() {
  for (let x = 0; x < WIDTH; x++) {
    for (let y = 0; y < HEIGHT; y++) {
      let p = [x / NOISE_SCALE, y / NOISE_SCALE];
      let q = [
        noise(p[0], p[1]),
        noise(p[0] + 5.2, p[1] + 1.3),
      ];
      let r = [
        noise(p[0] + 4 * q[0] + 1.7, p[1] + 4 * q[1] + 9.2),
        noise(p[0] + 4 * q[0] + 8.3, p[1] + 4 * q[1] + 2.8),
      ];

      let n = getColour(
        noise(
          p[0] + 4 * r[0],
          p[1] + 4 * r[1],
        )
      );

      stroke(n, getColour(q[0]), getColour(r[1]));
      point(x, y);
    }
  }
}

function getColour(n) {
  return map(n, 0, 1, 0, 255);
}

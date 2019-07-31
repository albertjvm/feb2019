let WIDTH;
let HEIGHT;
let X = 100;
let Y = 50;
let MARGIN = 25;
let NOISE_SCALE = 200;

let points;

COLOURS = [
  '#357edd',
  '#ffd700',
];

function setup() {
  let canvasContainer = document.getElementById("canvas-container");
  createCanvas(canvasContainer.offsetWidth, canvasContainer.offsetHeight).parent('canvas-container');
  HEIGHT = canvasContainer.offsetHeight;
  WIDTH = canvasContainer.offsetWidth;
  strokeWeight(3);
  frameRate(60);

  points = createGrid();
}

function draw() {
  background(COLOURS[0]);

  stroke(COLOURS[1]);
  fill(COLOURS[0]);

  points.forEach((row) => {
    beginShape();
    row.forEach(([u, v], i) => {
      let x = lerp(MARGIN, WIDTH - MARGIN, u);
      let y = lerp(MARGIN, HEIGHT - MARGIN, v);

      if (isInCircle(x, y)) {
        y -= map(noise(x/NOISE_SCALE, y/NOISE_SCALE, frameCount / 120), 0, 1, -50, 50);
      }

      curveVertex(x, y);
      // vertex(x, y);
    });
    endShape();
  });
}

function createGrid() {
  const points = [];
  for (let y = 0; y < Y; y++) {
    let row = [];
    for (let x = 0; x < X; x++) {
      const u = X <= 1 ? 0.5 : x / (X - 1);
      const v = Y <= 1 ? 0.5 : y / (Y - 1);

      row.push([ u, v ]);
    }
    points.push(row);
  }
  return points;
}

function isInCircle(x, y) {
  let dist = Math.sqrt(
    Math.pow(Math.abs(x - WIDTH / 2), 2) + 
    Math.pow(Math.abs(y - HEIGHT / 2), 2)
  );

  return dist < WIDTH * 1 / 3;
}
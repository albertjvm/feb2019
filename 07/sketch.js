let WIDTH;
let HEIGHT;
let points;
let DENSITY = 0.05;
let SCALE = 4;

function setup() {
  let canvasContainer = document.getElementById("canvas-container");
  createCanvas(canvasContainer.offsetWidth, canvasContainer.offsetHeight).parent('canvas-container');
  HEIGHT = canvasContainer.offsetHeight;
  WIDTH = canvasContainer.offsetWidth;
  noStroke();
  fill('black');
  frameRate(60);
  createGrid();
}

function createGrid() {
  points = new Set();
  while(points.size < WIDTH * HEIGHT * DENSITY / SCALE) {
    points.add([
      Math.floor(random() * WIDTH/SCALE) * SCALE,
      Math.floor(random() * HEIGHT/SCALE) * SCALE,
    ]);
  }
}

function draw() {
  background('peachpuff');

  translate(WIDTH / 2, HEIGHT / 2);
  drawGrid();
  rotate(Math.min(frameCount / 2, 10) * Math.PI / 400);
  // if (frameCount > 20 && frameCount < 40) {
    // let f = frameCount - 10;
    // translate(f, 0);
  // } else if (frameCount > 40) {
    let f = 60 - Math.abs((Math.max(frameCount /2, 30)) % 120 - 60);
    translate(
      30 - f, 0
    );
  // }
  drawGrid();
}

function drawGrid () {
  points.forEach(([x, y]) => {
    rect(x - WIDTH/2, y - HEIGHT/2, SCALE, SCALE);
  });
}

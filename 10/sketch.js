let WIDTH;
let HEIGHT;
const PI = Math.PI;
let N = 10;

let lines = [];

function setup() {
  let canvasContainer = document.getElementById("canvas-container");
  createCanvas(canvasContainer.offsetWidth, canvasContainer.offsetHeight).parent('canvas-container');
  HEIGHT = canvasContainer.offsetHeight;
  WIDTH = canvasContainer.offsetWidth;
  strokeWeight(1);
  background('silver');
  frameRate(60);

  for (let i = 0; i < N; i++) {
    lines.push({
      x: 0,
      y: 0,
      angle: PI * 1/4,
    });
  }

  for (let i = 0; i < N; i++) {
    lines.push({
      x: 0,
      y: HEIGHT,
      angle: PI * 3/4,
    });
  }

  for (let i = 0; i < N; i++) {
    lines.push({
      x: WIDTH,
      y: HEIGHT,
      angle: PI * 5/4,
    });
  }

  for (let i = 0; i < N; i++) {
    lines.push({
      x: WIDTH,
      y: 0,
      angle: PI * 7/4,
    });
  }
}

function draw() {
  drawLines();
  moveLines();
}

function drawLines() {
  noStroke();
  fill('black');
  lines.forEach(({x, y}) => {
    ellipse(x, y, 10, 10);
  });
}

function moveLines() {
  lines.forEach((l, i) => {
    noiseSeed(i);
    let angle = l.angle + map(noise(frameCount /  60), 0, 1, -0.6 * PI, 0.6 * PI);
    l.x += Math.sin(angle);
    l.y += Math.cos(angle);
  });
}

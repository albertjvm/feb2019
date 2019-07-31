let WIDTH;
let HEIGHT;
let SIZE;
let points = [];
const N = 2;
const W = 1;

function setup() {
  let canvasContainer = document.getElementById("canvas-container");
  createCanvas(canvasContainer.offsetWidth, canvasContainer.offsetHeight).parent('canvas-container');
  HEIGHT = canvasContainer.offsetHeight;
  WIDTH = canvasContainer.offsetWidth;
  SIZE = Math.min(HEIGHT, WIDTH);
  rectMode(CENTER);
  strokeWeight(1);
  frameRate(60);

  for (let i = 0; i < N; i++) {
    points.push([
      Math.floor(Math.random() * SIZE),
      Math.floor(Math.random() * SIZE),
    ]);
  }

  background('white');
  push();
  noStroke();
  fill('black');
  rect(0, 0, SIZE, SIZE);
  pop();

  noFill();
}

function draw() {
  background('white');
  push();
  noStroke();
  fill('black');
  rect(0, 0, 2*SIZE, 2*SIZE);
  pop();
  
  noFill();
  strokeWeight(W);

  points.forEach(drawPoint);
}

function drawPoint([x, y]) {
  let m = [
    dist(0, 0, x, y),
    dist(SIZE, 0, x, y),
    dist(0, SIZE, x, y),
    dist(SIZE, SIZE, x, y),
  ].reduce((a, i) => Math.max(a, i));
  m = min(m, frameCount * 3);

  for (let i = 0; i < m; i+=W) {
    stroke(255, map(sin(i / 25 - frameCount/10), -1, 1, 0, 150));
    rect(x, y, 2 * i, 2 * i);
  }
}
let WIDTH;
let HEIGHT;
let SIZE;
let N = 75;

let a = 30;
let b = 240;

function setup() {
  let canvasContainer = document.getElementById("canvas-container");
  createCanvas(canvasContainer.offsetWidth, canvasContainer.offsetHeight).parent('canvas-container');
  HEIGHT = canvasContainer.offsetHeight;
  WIDTH = canvasContainer.offsetWidth;
  SIZE = Math.min(WIDTH, HEIGHT);
  rectMode(CENTER);
  strokeWeight(1);
  frameRate(30);
}

function draw() {
  background('white');
  noStroke();

  push();
  fill('black');
  rect(0, 0, SIZE * 2, SIZE * 2);
  pop();

  fill('white');
  let w = SIZE / N;

  for (let i = 0; i < N; i+=2) {
    let n1 = map(noise(i / a, frameCount / b), 0, 1, 0, SIZE);
    let n2 = map(noise((i + 1) / a, frameCount / b), 0, 1, 0, SIZE);
    rect(
      i * w,
      n1,
      w + 1,
      abs(n2 - n1) * 5,
    );
  }
}


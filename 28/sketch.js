let WIDTH;
let HEIGHT;
let SIZE;
let N = 35;
let MARGIN = 50;
let H = 4;
let SPEED = 2;

function setup() {
  let canvasContainer = document.getElementById("canvas-container");
  createCanvas(canvasContainer.offsetWidth, canvasContainer.offsetHeight).parent('canvas-container');
  HEIGHT = canvasContainer.offsetHeight;
  WIDTH = canvasContainer.offsetWidth;
  SIZE = Math.min(WIDTH, HEIGHT);
  strokeWeight(1);
  frameRate(60);

  points = createGrid().filter(r => random() < 0.6);
}

function draw() {
  background('white');
  fill('black');
  rect(0, 0, SIZE, SIZE);

  points.forEach(({position, size, speed, colour}) => {
    const [ u, v ] = position;
    const x = lerp(MARGIN, SIZE - MARGIN, u);
    const y = lerp(MARGIN, SIZE - MARGIN, v);

    if (noise(x / 100, y / 100) < .5) {
      drawTree(x, y - (H * SIZE - 2 * MARGIN) + frameCount * SPEED, 50);
    }
  });

  fill('white');
  rect(0, SIZE, SIZE, HEIGHT - SIZE);
}

function drawTree(x, y, h) {
  fill(map(noise(x, y - frameCount * SPEED), 0, 1, 50, 255));
  // stroke('black');
  noStroke();

  beginShape();
  vertex(x - h/15, y);
  vertex(x + h/15, y);
  vertex(x + h/15, y - h/5);
  vertex(x + h/15 + h/5, y - h/5);
  vertex(x + h * 3/20, y - h * 2/5);
  vertex(x + h/15 + h/5, y - h * 2/5);
  vertex(x + h * 2/20, y - h * 13/20);
  vertex(x + h/5, y - h * 13/20);
  vertex(x, y - h);
  vertex(x - h/5, y - h * 13/20);
  vertex(x - h * 2/20, y - h * 13/20);
  vertex(x - h/15 - h/5, y - h * 2/5);
  vertex(x - h * 3/20, y - h * 2/5);
  vertex(x - h/15 - h/5, y - h/5);
  vertex(x - h/15, y - h/5);
  vertex(x - h/15, y);
  endShape();
}

function createGrid() {
  const points = [];
  for (let x = 0; x < N; x++) {
    for (let y = 0; y < (1 + H) * N; y++) {
      const u = N <= 1 ? 0.5 : x / (N - 1);
      const v = N <= 1 ? 0.5 : y / (N - 1);

      points.push({
        position: [ u, v ],
      });
    }
  }
  return points;
}
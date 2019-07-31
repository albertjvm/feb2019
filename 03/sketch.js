let WIDTH;
let HEIGHT;
let MARGIN = 50;
const PI = Math.PI;
const COLOURS = [
  'rgba(255, 225, 225, 0.75)',
  'rgba(225, 255, 225, 0.75)',
  'rgba(225, 225, 255, 0.75)',
  'rgba(255, 255, 255, 0.75)',
];
let points = [];
let N = 25;
let numStars = 0.05;

function setup() {
  let canvasContainer = document.getElementById("canvas-container");
  createCanvas(canvasContainer.offsetWidth, canvasContainer.offsetHeight).parent('canvas-container');
  HEIGHT = canvasContainer.offsetHeight;
  WIDTH = canvasContainer.offsetWidth;
  strokeWeight(3);
  frameRate(60);
  noStroke();
  points = createGrid().filter(() => random() > 1 - numStars);
}

function draw() {
  background('rgb(10, 10, 62)');
  // drawRotatingStar(300, 300, 150, 5, COLOURS[0]);

  points.forEach(({position, size, speed, colour}) => {
    const [ u, v ] = position;
    const x = lerp(MARGIN, WIDTH - MARGIN, u);
    const y = lerp(MARGIN, HEIGHT - MARGIN, v);

    drawRotatingStar(x, y, size, 5, colour, speed);
  });
}

function drawRotatingStar(x, y, r, n, colour, speed) {
  drawStar(x, y, r, r / 4, 2 * speed * frameCount / (PI * 40) + (PI / 2), 2 * n, colour);
  drawStar(x, y, r, r / 4, -3 * speed * frameCount / (PI * 40), n, colour);
  drawStar(x, y, r, r / 4, speed * frameCount / (PI * 40) + (PI / n), n, colour);
}

function drawStar(x, y, externalRadius, internalRadius, offset, n, colour) {
  let angle = 2 * PI / n;

  fill(colour);
  beginShape();
  for (let i = 0; i < n; i++) {
    vertex(
      externalRadius * Math.sin(angle * i + offset) + x,
      externalRadius * Math.cos(angle * i + offset) + y,
    );

    vertex(
      internalRadius * Math.sin(angle * i + angle / 2 + offset) + x,
      internalRadius * Math.cos(angle * i + angle / 2 + offset) + y,
    );
  }
  endShape();
}

function createGrid() {
  const points = [];
  for (let x = 0; x < N; x++) {
    for (let y = 0; y < N; y++) {
      const u = N <= 1 ? 0.5 : x / (N - 1);
      const v = N <= 1 ? 0.5 : y / (N - 1);

      points.push({
        position: [ u, v ],
        size: 0.2 + random() * WIDTH / (2 * N),
        speed: 0.25 + random() * 2,
        colour: COLOURS[floor(random() * COLOURS.length)]
      });
    }
  }
  return points;
}
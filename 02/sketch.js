let N = 7;
let MARGIN = -50;
let WIDTH;
let HEIGHT;
let us = [];
let vs = [];
const PI = Math.PI;
const COLOURS = 
[
  'white', //'#00449e',
  'black', //'#357edd',
  'white', //'#96ccff',
  'black', //'#cdecff',
];

function setup() {
  let canvasContainer = document.getElementById("canvas-container");
  createCanvas(canvasContainer.offsetWidth, canvasContainer.offsetHeight).parent('canvas-container');
  HEIGHT = canvasContainer.offsetHeight;
  WIDTH = canvasContainer.offsetWidth;
  strokeWeight(3);
  frameRate(60);

  createGrid();
}

function draw() {
  background(255);
  // noStroke();

  noiseSeed(0);
  let angle = map(noise(frameCount / 50), 0, 1, 0, PI / 2);
  noiseSeed(1);
  let length = map(noise(frameCount / 50), 0, 1, HEIGHT / N, 0);

  us.forEach((u, i) => {
    vs.forEach((v, j) => {
      const x = uToX(u);
      const y = vToY(v);

      if ((i * N + j) % 2 === 0) {
        let xPoints = getXPoints(x, y, angle, length);
        let yPoints;

          yPoints = getXPoints(uToX(us[i - 1]), vToY(vs[j - 1]), angle, length);
          fill(COLOURS[0]);
          beginShape();
          vertex(x, y);
          vertex(xPoints[3][0], xPoints[3][1]);
          vertex(uToX(us[i - 1]), vToY(vs[j]));
          vertex(yPoints[0][0], yPoints[0][1]);
          vertex(xPoints[2][0], xPoints[2][1]);
          vertex(x, y);
          endShape();

          yPoints = getXPoints(uToX(us[i + 1]), vToY(vs[j - 1]), angle, length);
          fill(COLOURS[1]);
          beginShape();
          vertex(x, y);
          vertex(xPoints[2][0], xPoints[2][1]);
          vertex(uToX(us[i]), vToY(vs[j - 1]));
          vertex(yPoints[3][0], yPoints[3][1]);
          vertex(xPoints[1][0], xPoints[1][1]);
          vertex(x, y);
          endShape();

          yPoints = getXPoints(uToX(us[i + 1]), vToY(vs[j + 1]), angle, length);
          fill(COLOURS[2]);
          beginShape();
          vertex(x, y);
          vertex(xPoints[1][0], xPoints[1][1]);
          vertex(uToX(us[i + 1]), vToY(vs[j]));
          vertex(yPoints[2][0], yPoints[2][1]);
          vertex(xPoints[0][0], xPoints[0][1]);
          vertex(x, y);
          endShape();

          yPoints = getXPoints(uToX(us[i - 1]), vToY(vs[j + 1]), angle, length);
          fill(COLOURS[3]);
          beginShape();
          vertex(x, y);
          vertex(xPoints[0][0], xPoints[0][1]);
          vertex(uToX(us[i]), vToY(vs[j + 1]));
          vertex(yPoints[1][0], yPoints[1][1]);
          vertex(xPoints[3][0], xPoints[3][1]);
          vertex(x, y);
          endShape();
      }

    });
  });
}

function uToX(u) {
  return lerp(MARGIN, WIDTH - MARGIN, u);
}

function vToY(v) {
  return lerp(MARGIN, HEIGHT - MARGIN, v);
}

function getXPoints(x, y, a, l) {
  let points = [];
  for (let i = 0; i < 4; i++) {
    points.push([
      l * Math.sin(a + i * (PI / 2)) + x,
      l * Math.cos(a + i * (PI / 2)) + y,
    ]);
  }
  return points;
}

function createGrid() {
  us = [];
  vs = [];

  for( let x = 0; x < N; x++) {
    const u = N <= 1 ? 0.5 : x / (N - 1);
    us.push(u);
    vs.push(u);
  }
}
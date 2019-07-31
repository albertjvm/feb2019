let WIDTH;
let HEIGHT;
let MARGIN = 25;
let N = 25;
let points = [];
let T = 2;

function setup() {
  let canvasContainer = document.getElementById("canvas-container");
  createCanvas(canvasContainer.offsetWidth, canvasContainer.offsetHeight).parent('canvas-container');
  HEIGHT = canvasContainer.offsetHeight;
  WIDTH = canvasContainer.offsetWidth;
  frameRate(60);
  rectMode(RADIUS);

  for (let i = 0; i < N; i++) {
    points.push([
      Math.random() * (WIDTH - MARGIN * 2) + MARGIN,
      Math.random() * (HEIGHT - MARGIN * 2) + MARGIN,
    ]);
  }

  points.forEach(p => {
    TweenLite.to(p, T, [
      Math.random() * (WIDTH - MARGIN * 2) + MARGIN,
      Math.random() * (HEIGHT - MARGIN * 2) + MARGIN,
    ]);
  });
}

function draw() {
  strokeWeight(3);
  colorMode(HSL, 360, 100, 100);

  let c1 = map(noise(frameCount / 720), 0, 1, 0, 720) % 360;
  let c2 = (c1 + 180) % 360;
  background(c1, 75, 50);
  fill(c2, 75, 50);
  stroke(c2, 75, 50);

  drawPoints();
  if (frameCount % 200 === 0) {
    tweenPoints();
  }

  drawLines();
}

function drawPoints() {
  points.forEach(([x, y]) => {
    ellipse(x, y, 10, 10);
  });
}

function tweenPoints() {
  points.forEach(p => {
    TweenLite.to(p, T, [
      Math.random() * (WIDTH - MARGIN * 2) + MARGIN,
      Math.random() * (HEIGHT - MARGIN * 2) + MARGIN,
    ]);
  });
}

function drawLines() {
  points.forEach(([x, y], i) => {
    let minDistance = Infinity;
    let min2Distance = Infinity;
    let minDistancePoint = [];
    let min2DistancePoint = [];

    points.forEach(([x2, y2], j) => {
      if (i == j) return;

      let d = Math.sqrt(Math.pow(x2 - x, 2) + Math.pow(y2 - y, 2));
      if (d < minDistance) {
        min2Distance = minDistance;
        minDistance = d;
        min2DistancePoint = minDistancePoint;
        minDistancePoint = [x2, y2];
      } else if (d < min2Distance) {
        min2Distance = d;
        min2DistancePoint = [x2, y2];
      }
    });

    line(x, y, minDistancePoint[0], minDistancePoint[1]);
    line(x, y, min2DistancePoint[0], min2DistancePoint[1]);
  });
}
let HEIGHT;
let WIDTH;
let PI = Math.PI;
const COLOURS = [
  '#357edd',
  '#ff6300',
  '#a463f2',
  '#ff4136',
  '#19a974',
  '#ffd700',
];
let shape1_points = [];
let shape2_points = [];
let c = 1;
const SPEED = 0.25;
const Y = 400;

function setup() {
  let canvasContainer = document.getElementById("canvas-container");
  createCanvas(canvasContainer.offsetWidth, canvasContainer.offsetHeight).parent('canvas-container');
  HEIGHT = canvasContainer.offsetHeight;
  WIDTH = canvasContainer.offsetWidth;
  strokeWeight(1);
  frameRate(60);
}

function draw() {
  background('black');
  drawCircle(130, Y, 100, SPEED, 0, frameCount, 'white');

  let p1 = pointOnCircle(130, Y, 100, SPEED, 0, frameCount);
  drawCircle(360, Y, p1.y - Y, SPEED * 2, 0, frameCount, 'white');
  stroke('white');
  line(0, p1.y, WIDTH, p1.y);
  fill('white');
  ellipse(360, p1.y, 10, 10);

  let p2 = pointOnCircle(360, Y, p1.y - Y, SPEED * 2, 0, frameCount);
  drawCircle(590, Y, p2.y - Y, SPEED * 2, 0, frameCount, 'white');
  stroke('white');
  line(0, p2.y, WIDTH, p2.y);
  fill('white');
  ellipse(590, p2.y, 10, 10);

  let p3 = pointOnCircle(590, Y, p2.y - Y, SPEED * 2, 0, frameCount);

  if (0.5 / 20 * (frameCount - 3) <= PI * 4 * c) {
    // c++;
    // shape1_points = [];
    // shape2_points = [];
  // }

  shape1_points.push({
    x: p2.x,
    y: p2.y,
  });
  shape2_points.push({
    x: p3.x,
    y: p3.y,
  });
  }

  drawShape(shape1_points);
  drawShape(shape2_points);
}

function drawShape(points) {
  push();
  stroke('white');
  strokeWeight(3);
  noFill();
  beginShape();
  points.forEach(p => curveVertex(Math.floor(p.x), Math.floor(p.y)));
  endShape();
  pop();
}

function drawCircle(x, y, r, s, o, t, colour) {
  push();
  fill(255, 0);
  stroke(colour);
  ellipse(x, y, r * 2, r * 2);
  let p = pointOnCircle(x, y, r, s, o, t);
  line(x, y, p.x, p.y);
  fill(colour);
  ellipse(p.x, p.y, 10, 10);
  pop();
}

function pointOnCircle(x, y, r, s, o, t) {
  let time = s / 20 * t + o;
  return {
    x: r * Math.sin(time) + x,
    y: r * Math.cos(time) + y,
  };
}
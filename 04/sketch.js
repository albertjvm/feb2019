let WIDTH;
let HEIGHT;
const MARGIN = 50;
const BUBBLE_RATE = 0.05;
const MIN_SPEED = 0.5;
const MAX_SPEED = 3;
const MIN_GROWTH_RATE = 1;
const MAX_GROWTH_RATE = 2;
const MAX_DRIFT = 500;

let bubbles = [];

function setup() {
  let canvasContainer = document.getElementById("canvas-container");
  createCanvas(canvasContainer.offsetWidth, canvasContainer.offsetHeight).parent('canvas-container');
  HEIGHT = canvasContainer.offsetHeight;
  WIDTH = canvasContainer.offsetWidth;
  strokeWeight(1);
  frameRate(60);
  stroke('white');
}

function draw() {
  background('lightseagreen');
  if (random() < BUBBLE_RATE) {
    newBubble();
  }
  moveBubbles();
  drawBubbles();
}

function drawBubbles() {
  bubbles.forEach(b => drawBubble(b));
}

function drawBubble(b) {
  noiseSeed(b.noiseSeed);
  let drift = map(noise(b.y / 2000), 0, 1, -1 * MAX_DRIFT, MAX_DRIFT);
  fill('lightseagreen');
  ellipse(b.x + drift, b.y, b.radius, b.radius);
  fill('white');
  rect(b.x + drift + b.radius / 10 - 1, b.y - b.radius / 3, b.radius / 5, b.radius / 5);
}

function moveBubbles() {
  bubbles.forEach(b => {
    b.y -= b.speed;
    b.radius = 10 + (b.growthRate * (HEIGHT - b.y)) / 40;
  });

  bubbles = bubbles.filter(b => b.y > 0 - b.radius / 2);
}

function newBubble() {
  let radius = 10;

  bubbles.push({
    radius: radius,
    speed: map(random(), 0, 1, MIN_SPEED, MAX_SPEED),
    growthRate: map(random(), 0, 1, MIN_GROWTH_RATE, MAX_GROWTH_RATE),
    x: map(random(), 0, 1, MARGIN, WIDTH - MARGIN),
    y: HEIGHT + radius / 2,
    noiseSeed: floor(random() * 10000),
  });
}
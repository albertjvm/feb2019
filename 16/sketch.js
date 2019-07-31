let WIDTH;
let HEIGHT;
let circles = [];
let static_circles = [];
let bg = 'black';
let st = 'white';
let noiseSeeds =[];
const PI = Math.PI;
const wavePeriod = 250;
const inSpeed = 2;
const outSpeed = 5;
let currentReflectedRd = 0;

function setup() {
  let canvasContainer = document.getElementById("canvas-container");
  createCanvas(canvasContainer.offsetWidth, canvasContainer.offsetHeight).parent('canvas-container');
  HEIGHT = canvasContainer.offsetHeight;
  WIDTH = canvasContainer.offsetWidth;
  strokeWeight(1);
  frameRate(60);

  noiseSeeds.push(floor(random() * 10000000));
  noiseSeeds.push(floor(random() * 10000000));
}

function draw() {
  background(bg);
  stroke(st);
  noFill();

  if (frameCount % wavePeriod === 1) {
    newCircle();
  }

  push();
  fill(bg);
  static_circles.forEach(({x, y, r, age}) => {
    stroke(255, 255 - (frameCount - age) / 16);
    drawCircle(x, y, r, age / 240);
  });
  pop();

  circles.forEach(circle => {
    if (circle.done) return;
    let {x, y, r, rd} = circle;

    fill(255, 122);
    drawCircle(x, y, r, frameCount / 240);

    if (r === rd) {
      static_circles.push({x: x, y: y, r: r, age: frameCount});
      TweenLite.to(circle, outSpeed, {r: 0, ease: Power1.easeIn});
    } else if (circle.reflected && circle.reflected > 4) {
      circle.done = true;
    } else if (r < 400 && (circle.reflected || circle.rd > currentReflectedRd)) {
      currentReflectedRd = circle.rd;
      circle.reflected = circle.reflected ? circle.reflected + 1 : 1;
      circle.rd *= Math.pow(0.98, circle.reflected * 2);
      TweenLite.to(circle, inSpeed, {r: circle.rd});
    } else if (r < 400) {
      circle.done = true;
    }
  });
}

function newCircle() {
  circles.push({
    x: floor(random() * WIDTH * 1.5) - WIDTH / 4,
    y: -400,
    r: 400,
    rd: 600 + floor(random() * (HEIGHT - 200)),
  });

  TweenLite.to(circles[circles.length - 1], inSpeed, {r: circles[circles.length - 1].rd});
}

function drawCircle(x, y, r, noiseParam) {
  beginShape();

  for (let i = 0; i <= 2 * PI; i+=PI/256) {
    let noiseVal = map(noise(noiseParam, i * 4), 0, 1, -50, 50);
    let px = x + (r + noiseVal) * sin(i + PI);
    let py = y + (r + noiseVal) * cos(i + PI);

    vertex(px, py);
  }

  endShape();
}
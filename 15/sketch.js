let WIDTH;
let HEIGHT;
let H = 25;
let buffer;
let p;
let a = 0;
let trail = [];
let down = true;

const PI = Math.PI;
const DIR = Array.apply(null, {length: 16}).map(Number.call, Number).map(a => PI * a/8);
const STEP = 1;

function setup() {
  let canvasContainer = document.getElementById("canvas-container");
  createCanvas(canvasContainer.offsetWidth, canvasContainer.offsetHeight).parent('canvas-container');
  HEIGHT = canvasContainer.offsetHeight;
  WIDTH = canvasContainer.offsetWidth;

  frameRate(30);

  buffer = createGraphics(WIDTH, HEIGHT);
  for(let y = 0; y < HEIGHT; y++) {
    for(let x = 0; x< WIDTH; x++) {
      buffer.stroke(colour(x, y));
      buffer.point(x, y);
    }
  }

  p = [WIDTH / 2, HEIGHT / 2];

  // let xd = Math.floor(Math.random() * RANGE * 2) - RANGE;
  // let yd = Math.floor(Math.random() * RANGE * 2) - RANGE;

  // TweenLite.to(p, 5, [p[0] + xd, p[1] + yd]);
}

function draw() {
  let [x, y] = p;
  translate(x, y);
  scale(4);
  translate(-x, -y);

  image(buffer, 0, 0);

  if (frameCount === 1) {
    push();
    strokeWeight(1);
    stroke('white');
    line(x - 2, y - 2, x + 2, y + 2);
    line(x + 2, y - 2, x - 2, y + 2);
    pop();
  }

  move();
  drawTrail();
}

function colour(x, y) {
  let n = value(x, y);
  let nH = floor(map(n, -1, 5, 0, H));
  let s = floor(map(nH, 0, H, 0, 255)).toString(16);
  return `#${s}${s}${s}`;
}



function move() {
  let [x, y] = p;
  trail.push(p);


  let angle = a + 2 * PI * noise(frameCount / 30);
  p = [x + sin(angle) / 2, y + cos(angle) / 2];


  // if (frameCount % (60 * 5) === 0) {
  //   let xd = Math.floor(Math.random() * RANGE * 2) - RANGE;
  //   let yd = Math.floor(Math.random() * RANGE * 2) - RANGE;

  //   TweenLite.to(p, 5, [p[0] + xd, p[1] + yd]);
  // }

  // let [x, y] = p;
  // let min = down ? Infinity : -Infinity;
  // let mxd;
  // let myd;

  // DIR.forEach(a => {
  //   let xd = x + STEP * sin(a);
  //   let yd = x + STEP * cos(a);
  //   let v = value(x + xd, y + yd);
  //   if ((down && v < min) || (!down && v > min)) {
  //     min = v;
  //     mxd = xd;
  //     myd = yd;
  //   }
  // });

  // trail.push(p);
  // p = [x + mxd, y+ myd];




  // if(mxd === 0 && myd === 0) {
  //   down = !down;
  // } else {
  //   trail.push(p);

  //   if (random() < 0.1) {
  //     mxd *= -1;
  //     myd *= -1;
  //   }
  //   p = [x + mxd, y+ myd];
  // }
}

function drawTrail() {
  stroke('white');
  noFill();
  strokeWeight(1);
  trail.forEach(([px, py], i) => {
    if (floor(i / 11) % 2 === 0) {
      ellipse(px, py, .5, .5);
    }
  });
}

function value(x, y) {
  let nf = 50;
  return Math.sin(x / nf) / 2 + Math.cos(y / nf) / 2 + 4 * noise(x / (2 * nf), y / (2 * nf));
}
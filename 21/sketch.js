let WIDTH;
let HEIGHT;
let l = 225;
let n = 7;

let circles;

function setup() {
  let canvasContainer = document.getElementById("canvas-container");
  createCanvas(canvasContainer.offsetWidth, canvasContainer.offsetHeight).parent('canvas-container');
  HEIGHT = canvasContainer.offsetHeight;
  WIDTH = canvasContainer.offsetWidth;
  strokeWeight(1);
  frameRate(30);
}

function draw() {
  background('black');
  stroke('white');

  circles = getCircles();

  let shape = [];
  let p1, p2;
  circles.forEach(({x, y, r, s, o, a}) => {
    p1 = drawCircle(x, y, r, s, o, frameCount);
    p2 = {
      x: p1.x + l * sin(a),
      y: p1.y + l * cos(a),
    };
    shape.push(p2);
    line(p1.x, p1.y, p2.x, p2.y);
  });

  drawShape(shape);
}

function drawCircle(x, y, r, s, o, t) {
  push();
  fill(255, 0);
  stroke('white');
  ellipse(x, y, r * 2, r * 2);
  let p = pointOnCircle(x, y, r, s, o, t);
  line(x, y, p.x, p.y);
  fill('white');
  ellipse(p.x, p.y, 10, 10);
  pop();
  return p;
}

function pointOnCircle(x, y, r, s, o, t) {
  let time = s / 20 * t + o;
  return {
    x: r * Math.sin(time) + x,
    y: r * Math.cos(time) + y,
  };
}

function drawShape(points) {
  push();
  noStroke();
  fill('white');
  beginShape();

  points.forEach(p => {
    vertex(p.x, p.y);
  });

  endShape();
  pop();
}

function getCircles() {
  let a = map(frameCount % 600, 1, 600, 0, 2 * PI);
  let l = Math.min(WIDTH, HEIGHT) / 2 - 100;
  let x = WIDTH / 2;
  let y = HEIGHT / 2;

  let circles = [];
  for (let i = 0; i < n; i ++) {
    circles.push({
      x: x + l * sin(a + i * PI/(n/2)),
      y: y + l * cos(a + i * PI/(n/2)),
      r: 50,
      s: ((i % (n/2)) + 1),
      o: i * PI/(n/2),
      a: a + PI + i * PI/(n/2),
    });
  }
  return circles;
}
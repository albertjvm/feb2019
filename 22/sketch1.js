let WIDTH;
let HEIGHT;
const PERIOD = 300;

let shapes = [];

let xShapes = Array(6).fill().map((_, i) => {
  return {sides: 7, speed: i + 1};
});
let yShapes = Array(6).fill().map((_, i) => {
  return {sides: 7, speed: i + 1};
});

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
  let point;
  let xs = [];
  let ys = [];
  push();
  stroke(255, 100);
  
  xShapes.forEach(({sides, speed}, i) => {
    point = drawRegularPolygon(300 + i * 100, 100, 40, sides, ((frameCount * speed) % PERIOD) / PERIOD);
    line(point[0], 0, point[0], HEIGHT);
    xs.push(point[0]);
  });
  yShapes.forEach(({sides, speed}, i) => {
    point = drawRegularPolygon(100, 300 + i * 100, 40, sides, ((frameCount * speed) % PERIOD) / PERIOD);
    line(0, point[1], WIDTH, point[1]);
    ys.push(point[1]);
  });
  pop();

  xs.forEach((x, i) => {
    ys.forEach((y, j) => {
      let index = i * xs.length + j;
      if(!shapes[index]) {
        shapes[index] = [];
      }

      shapes[index].push([x, y]);
    });
  });
  
  if (frameCount % (PERIOD * 2) === 0) {
    shapes = [];
  }

  drawShapes();
}

function drawShapes() {
  push();
  stroke('white');
  fill(255, 0);
  strokeWeight(2);
  shapes.forEach(shape => {
    beginShape();
    shape.forEach(([x, y]) => {
      vertex(x, y);
    });
    endShape();
  });
  pop();
}

function drawRegularPolygon(x, y, r, sides, pct) {
  let points = [];
  let angle = 2 * PI / sides;
  for (let i = 0; i < sides; i++) {
    points.push([
      x + r * sin(PI + angle * i),
      y + r * cos(PI + angle * i),
    ]);
  }

  points.push([
    x,
    y - r,
  ]);

  let pos = pointOnShape(points, pct);

  push();
  fill(255, 0);
  stroke('white');
  beginShape();
  points.forEach(p => {
    vertex(p[0], p[1]);
  });
  endShape();
  line(x, y, pos[0], pos[1]);
  fill('white');
  ellipse(pos[0], pos[1], 10, 10);
  pop();

  return pos;
}

function pointOnShape(points, p) {
  let lengths = [];
  let angles = [];
  
  if(points.length === 0) return null;
  if(points.length === 1) return points[0];

  for(let i = 1; i < points.length; i++) {
    let p1 = points[i - 1];
    let p2 = points[i];
    let adjLength = p2[1] - p1[1];
    let oppLength = p2[0] - p1[0];

    lengths.push(sqrt(sq(oppLength) + sq(adjLength)));
    angles.push(atan(oppLength / adjLength) + (i > (points.length / 2) ? PI : 0));
  }

  let totalLength = lengths.reduce((sum, l) => sum + l);
  let pLength = p * totalLength;
  let point = null;

  lengths.forEach((l, i) => {
    if (point != null) return;

    if (pLength < l) {
      point = [
        points[i][0] + pLength * sin(angles[i]),
        points[i][1] + pLength * cos(angles[i]),
      ];
    } else {
      pLength -= l;
    }
  });

  return point;
}
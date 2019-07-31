let WIDTH;
let HEIGHT;
let SIZE;
const PERIOD = 400;
let N = 5;
let R = 25;

function setup() {
  let canvasContainer = document.getElementById("canvas-container");
  createCanvas(canvasContainer.offsetWidth, canvasContainer.offsetHeight).parent('canvas-container');
  HEIGHT = canvasContainer.offsetHeight;
  WIDTH = canvasContainer.offsetWidth;
  SIZE = Math.min(WIDTH, HEIGHT);
  strokeWeight(1);
  frameRate(60);
}

function draw() {
  background('white');
  fill('black');
  rect(0, 0, SIZE, SIZE);
  let x = SIZE / 2;
  let y = SIZE / 2;

  // drawDashedHex(75, 75, 50);

  for (let j = N - 1; j >= 0; j--) {
    drawHex(x, y, (j + 1) * 3 * R);
  }

  drawHex(x, y, R);
  for (let j = 0; j < N; j++) {
    let points = hexPoints(
      x,
      y,
      (j + 1) * 3 * R
    );

    for (let i = 0; i < 6; i++) {
      let n = ((frameCount + i * floor(PERIOD / 6)) % PERIOD) / PERIOD;
      let p = pointOnShape(
        points, 
        (j % 2 == 0) ? n : 1 - n, 
      );
      drawHex(p[0], p[1], R);
    }
  }
}

function hexPoints(x, y, r) {
  let points = [];

  for(let i = 0; i < 6; i++) {
    points.push([
      x + r * sin(PI + i * PI/3),
      y + r * cos(PI + i * PI/3),
    ]);
  }

  points.push([x, y - r]);

  return points;
}

function drawHex(x, y, r) {
  push();
  fill('black');
  stroke('white');
  beginShape();
  for(let i = 0; i < 6; i++) {
    vertex(
      x + r * sin(i * PI/3),
      y + r * cos(i * PI/3),
    );
  }
  vertex(x, y + r);
  endShape();
  pop();
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

function drawDashedHex(x, y, r) {
  let points = hexPoints(x, y, r);
  for (let i = 0; i < points.length - 1; i++) {
    drawDashedLine(points[i][0], points[i][1], points[i + 1][0], points[i + 1][1]);
  }
}

function drawDashedLine(x1, y1, x2, y2) {
  let angle = atan((x2 - x1) / (y2 - y1));
  let length = sqrt(sq(y2 - y1) + sq(x2 - x1));
  let D = 10;
  let N = length / D;

  push();
  stroke('white');
  for (let i = 0; i < N; i+=2) {
    line(
      x1 + D * i * sin(angle),
      y1 + D * i * cos(angle),
      x1 + D * (i + 1) * sin(angle),
      y1 + D * (i + 1) * cos(angle),
    );
  }
  pop();
}
let WIDTH;
let HEIGHT;
let SIZE;

let CIRCLE;
let TRIANGLE;

let NF = 300;

function setup() {
  let canvasContainer = document.getElementById("canvas-container");
  createCanvas(canvasContainer.offsetWidth, canvasContainer.offsetHeight).parent('canvas-container');
  HEIGHT = canvasContainer.offsetHeight;
  WIDTH = canvasContainer.offsetWidth;
  SIZE = Math.min(HEIGHT, WIDTH);
  strokeWeight(1);
  frameRate(60);
  noiseSeed(floor(random() * 10000000));
  noiseDetail(2, 0.5);

  CIRCLE = {
    x: SIZE/4,
    y: SIZE/4,
    r: SIZE/6,
  };

  TRIANGLE = {
    x: SIZE * 3/4,
    y: SIZE/4,
    r: SIZE/6,
  };

  background('white');
  push();
  noStroke();
  fill('black');
  rect(0, 0, SIZE, SIZE);
  pop();

  stroke('white');
  noFill();
}

function draw() {
  drawCircleChord(CIRCLE.x, CIRCLE.y, CIRCLE.r, 1);
  drawCircleChord(TRIANGLE.x, TRIANGLE.y, TRIANGLE.r, 2);
  drawCircleChord(SIZE/4, SIZE * 3/4, SIZE/6, 3);
  drawCircleChord(SIZE* 3/4, SIZE * 3/4, SIZE/6, 4);

  // drawPolygonChord(TRIANGLE.x, TRIANGLE.y, TRIANGLE.r, 3);
  // drawPolygonChord(SIZE/4, SIZE * 3/4, SIZE/6, 4);
  // drawPolygonChord(SIZE* 3/4, SIZE * 3/4, SIZE/6, 5);
}

function drawCircleChord(x, y, r, i) {
  let a1 = map(noise(frameCount / NF, i), 0, 1, -PI, PI);
  let a2 = map(noise(frameCount / NF, 100 + i), 0, 1, 0, 2 * PI);

  push();
  stroke(255, 25);
  line(
    x + r * sin(a1),
    y + r * cos(a1),
    x + r * sin(a2),
    y + r * cos(a2),
  );
  pop();
}

function drawPolygonChord(x, y, r, sides) {
  let points = getPolygonPoints(x, y, r, sides);
  let pct1 = map(noise(frameCount / NF, sides), 0, 1, 0, 1);
  let pct2 = map(noise(frameCount / NF, sides * 2), 0, 1, 0, 1);
  let p1 = pointOnShape(points, pct1);
  let p2 = pointOnShape(points, pct2);

  push();
  stroke(255, 15);
  line(
    p1[0],
    p1[1],
    p2[0],
    p2[1],
  );
  pop();
}

function getPolygonPoints(x, y, r, sides) {
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

  return points;
}

function drawRegularPolygon(x, y, r, sides) {
  let points = getPolygonPoints(x, y, r, sides);

  beginShape();
  points.forEach(p => {
    vertex(p[0], p[1]);
  });
  endShape();
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
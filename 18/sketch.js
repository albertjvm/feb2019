let WIDTH;
let HEIGHT;
let points = [];

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

  newPoint();
  newPoint();
  newPoint();
  newPoint();
  newPoint();
  newPoint();

  drawPoints();
  movePoints();
}

function newPoint() {
  points.push({
    position: [
      floor(random() * WIDTH),
      floor(random() * HEIGHT),
    ],
    down: random() < 0.5,
  });
}

function drawPoints() {
  stroke(255);
  points.forEach(({position}) => {
    let [x, y] = position;
    point(x, y);
  });
}

function movePoints() {
  points.forEach(p => {
    let [x, y] = p.position;
    p.position[0] += map(getNoise(x, y, frameCount), 0, 1, -5, 5);
    p.position[1] += p.down ? 1 : -1;
  });

  points = points.filter(({position}) => {
    let [x, y] = position;
    return x >= 0 & x<= WIDTH && y >=0 && y <= HEIGHT;
  });
}

function getNoise(x, y, z) {
  let p = [x / 150, y / 150, z / 720];
  let q = [
    noise(p[0], p[1], p[2]),
    noise(p[0] + 5.2, p[1] + 1.3, p[2] + 0.4),
    noise(p[0] + 8.4, p[1] + 2.9, p[2] + 1.4),
  ];
  let r = [
    noise(p[0] + 4 * q[0] + 1.7, p[1] + 4 * q[1] + 9.2),
    noise(p[0] + 4 * q[0] + 8.3, p[1] + 4 * q[1] + 2.8),
    noise(p[0] + 4 * q[0] + 12.6, p[1] + 4 * q[1] + 4.6),
  ];
  return noise(
    p[0] + 4 * q[0],
    p[1] + 4 * q[1],
    p[2] + 4 * q[2],
  );
}
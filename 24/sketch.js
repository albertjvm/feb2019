let WIDTH;
let HEIGHT;
let SIZE;
let N = 5;
let MARGIN = 100;
let points;
let PERIOD = 300;
let i = 0;

function setup() {
  let canvasContainer = document.getElementById("canvas-container");
  createCanvas(canvasContainer.offsetWidth, canvasContainer.offsetHeight).parent('canvas-container');
  HEIGHT = canvasContainer.offsetHeight;
  WIDTH = canvasContainer.offsetWidth;
  SIZE = Math.min(HEIGHT, WIDTH);
  strokeWeight(1);
  frameRate(60);
  background('black');

  points = createGrid();
}

function draw() {
  // background('white');
  // fill('black');
  // rect(0, 0, SIZE, SIZE);

  if (frameCount % floor(PERIOD / 2) === 0){
    i++;
  }

  stroke(i % 2 == 0 ? 'white' : 'black');

  points.forEach(({position}) => {
    const [ u, v ] = position;
    const x = lerp(MARGIN, SIZE - MARGIN, u);
    const y = lerp(MARGIN, SIZE - MARGIN, v);

    drawRegularPolygon(
      x, y, 
      ((SIZE - MARGIN * 2) / N) * 1/2 + (i % 2 == 0 ? 0 : 1),
      floor(map(noise(x / 100, y / 100, i), 0, 1, 3, 8)),
      map((frameCount % PERIOD) / PERIOD, 0, 1, 0, 2 * PI)
    );
  });
}

function createGrid() {
  const points = [];
  for (let x = 0; x < N; x++) {
    for (let y = 0; y < N; y++) {
      const u = N <= 1 ? 0.5 : x / (N - 1);
      const v = N <= 1 ? 0.5 : y / (N - 1);

      points.push({
        position: [ u, v ],
      });
    }
  }
  return points;
}

function drawRegularPolygon(x, y, r, sides, offset) {
  let points = [];
  let angle = 2 * PI / sides;
  for (let i = 0; i < sides; i++) {
    points.push([
      x + r * sin(PI + angle * i + offset),
      y + r * cos(PI + angle * i + offset),
    ]);
  }

  points.push([
    x + r * sin(PI + offset),
      y + r * cos(PI + offset),
  ]);


  fill(255, 0);
  beginShape();
  points.forEach(p => {
    vertex(p[0], p[1]);
  });
  endShape();
}
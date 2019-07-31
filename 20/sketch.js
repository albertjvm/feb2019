let WIDTH;
let HEIGHT;
let N;
let MARGIN = -53;
let points;

function setup() {
  let canvasContainer = document.getElementById("canvas-container");
  createCanvas(canvasContainer.offsetWidth, canvasContainer.offsetHeight).parent('canvas-container');
  HEIGHT = canvasContainer.offsetHeight;
  WIDTH = canvasContainer.offsetWidth;
  N = Math.min(WIDTH, HEIGHT);
  strokeWeight(2);
  frameRate(60);
  points = createGrid().filter(() => random() < 0.0015);
}

function draw() {
  background('black');
  stroke('white');

  points.forEach(({position}, i) => {
    const [ u, v ] = position;
    let x = lerp(0, WIDTH, u);
    let y = lerp(MARGIN, HEIGHT - MARGIN, v);

    y += (60 * sin(v * -20 + (frameCount / 60)));

    let dx = noise(u * 5, v * 5, frameCount / 120) * 75;
    line(x - dx/2, y, x + dx/2, y);
  });
}

function createGrid() {
  const points = [];
  for (let y = 0; y < N; y++) {
    for (let x = 0; x < N; x++) {
      const u = N <= 1 ? 0.5 : x / (N - 1);
      const v = N <= 1 ? 0.5 : y / (N - 1);

      points.push({
        position: [ u, v ],
      });
    }
  }
  return points;
}
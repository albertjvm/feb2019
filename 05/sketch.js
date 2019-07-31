let WIDTH;
let HEIGHT;
let N = 35;
let MARGIN = 50;
let points = [];
let COLOURS = [
  '#ff4136',
  // '#ff6300',
  '#ffd700',
  // '#b3c661',
  '#19a974',
  // '#1899a8',
  '#357edd',
];
let r;

function setup() {
  let canvasContainer = document.getElementById("canvas-container");
  createCanvas(canvasContainer.offsetWidth, canvasContainer.offsetHeight).parent('canvas-container');
  HEIGHT = canvasContainer.offsetHeight;
  WIDTH = canvasContainer.offsetWidth;
  r = (WIDTH - MARGIN / 2) / N - 7;
  strokeWeight(7);
  frameRate(60);
  points = createGrid();
  noiseDetail(4);
}

function draw() {
  background('white');

  points.forEach(({ position }) => {
    const [ u, v ] = position;
    const x = lerp(MARGIN, WIDTH - MARGIN, u);
    const y = lerp(MARGIN, HEIGHT - MARGIN, v);

    let noiseVal1 = noise(x / 400, y / 400, frameCount / 100);
    let noiseVal2 = noise(y / 600, x / 600, frameCount / 100);

    // stroke(COLOURS[floor(noiseVal1 * COLOURS.length)]);
    // fill(COLOURS[floor(noiseVal1 * COLOURS.length)]);
    let a = map(noiseVal1, 0, 1, 0, Math.PI * 2);
    // strokeWeight(map(noiseVal2, 0, 1, 0, 10));
    let l = 10;
    push();
    translate(x, y);
    rotate(a);
    line(-l, -l, l, l);
    // rect(-r/2, -r/2, r, r);
    pop();
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
let WIDTH;
let HEIGHT;
let NX;
let NY;
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

function setup() {
  let canvasContainer = document.getElementById("canvas-container");
  createCanvas(canvasContainer.offsetWidth, canvasContainer.offsetHeight).parent('canvas-container');
  HEIGHT = canvasContainer.offsetHeight;
  WIDTH = canvasContainer.offsetWidth;
  NY = HEIGHT / 30;
  NX = WIDTH / 30;
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
    pop();
  });
}

function createGrid() {
  const points = [];
  for (let x = 0; x < NX; x++) {
    for (let y = 0; y < NY; y++) {
      const u = NX <= 1 ? 0.5 : x / (NX - 1);
      const v = NY <= 1 ? 0.5 : y / (NY - 1);

      points.push({
        position: [ u, v ],
      });
    }
  }
  return points;
}
let WIDTH;
let HEIGHT;
let PALLETTE = [
  '#eee',
  '#ccc',
  '#999',
  '#555',
  '#ff725c',
  '#e7040f',
];
let COLOURS = [];
let _prevColour;

function setup() {
  let canvasContainer = document.getElementById("canvas-container");
  createCanvas(canvasContainer.offsetWidth, canvasContainer.offsetHeight).parent('canvas-container');
  HEIGHT = canvasContainer.offsetHeight;
  WIDTH = canvasContainer.offsetWidth;
  noStroke();
  frameRate(60);
}

function draw() {
  background('white');

  let n = 0;
  let y = 0;

  while(y < HEIGHT) {
    fill(colour(n));

    let h = noise(n / 10, frameCount / 120) * 100;

    let m = 0;
    let x = 0;
    while(x < WIDTH) {
      let w = noise(n / 10, m / 10, frameCount / 120) * 100;
      fill(m % 2 === 0 ? colour(n) : colour(n + 1));
      rect(x, y, w, h);
      x += w;
      m++;
    }

    y += h;
    n++;
  }
}

function colour(n) {
  if (!COLOURS[n]) {
    let c = PALLETTE[Math.floor(Math.random() * PALLETTE.length)];

    while(c === _prevColour) {
      c = PALLETTE[Math.floor(Math.random() * PALLETTE.length)];
    }

    _prevColour = c;
    COLOURS[n] = c;
  }
  
  return COLOURS[n];
}
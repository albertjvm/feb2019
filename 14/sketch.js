let WIDTH;
let HEIGHT;
let SIZE;
let N = 50;
let MARGIN = 50;
let VARIANCE = 0;
let NOISE_SEEDS = [
  Math.floor(Math.random() * 1000000),
  Math.floor(Math.random() * 1000000),
  Math.floor(Math.random() * 1000000),
  Math.floor(Math.random() * 1000000),
];

function setup() {
  let canvasContainer = document.getElementById("canvas-container");
  createCanvas(canvasContainer.offsetWidth, canvasContainer.offsetHeight).parent('canvas-container');
  HEIGHT = canvasContainer.offsetHeight;
  WIDTH = canvasContainer.offsetWidth;
  SIZE = Math.min(WIDTH, HEIGHT);
  strokeWeight(1);
  stroke('white');
  frameRate(60);
}

function draw() {
  background('black');
  VARIANCE = Math.pow(frameCount, 2/3) * Math.sin(frameCount / 60);

  for (let i = 0; i <= N; i++) {
    let n = lerp(0, SIZE / 2 - MARGIN, i / N);
    let [n1, n2, n3, n4] = noise2(n / 50, frameCount / 60).map(x => lerp(-VARIANCE, VARIANCE, x));

    line(
      SIZE/2, contain(MARGIN + n + n1, MARGIN, SIZE / 2), 
      contain(SIZE/2 + n + n2, SIZE / 2, SIZE - MARGIN), SIZE/2,
    );
    line(
      contain(SIZE/2 + n + n2, SIZE / 2, SIZE - MARGIN), SIZE/2,
      SIZE/2, contain(SIZE - MARGIN - n + n3, SIZE/2, SIZE - MARGIN),
    );
    line(
      SIZE/2, contain(SIZE - MARGIN - n + n3, SIZE/2, SIZE - MARGIN),
      contain(SIZE/2 - n + n4, MARGIN, SIZE/2), SIZE/2,
    );
    line(
      contain(SIZE/2 - n + n4, MARGIN, SIZE/2), SIZE/2,
      SIZE/2, contain(MARGIN + n + n1, MARGIN, SIZE / 2), 
    );

  }
}

function contain(n, min = MARGIN, max = SIZE - MARGIN) {
  if (n < min) return min;
  if (n > max) return max;
  return n;
}

function noise2(n, m) {
  let vals = [];

  for (let i = 0; i < NOISE_SEEDS.length; i ++) {
    noiseSeed(NOISE_SEEDS[i]);
    vals.push(noise(n, m));
  }

  return vals;
}


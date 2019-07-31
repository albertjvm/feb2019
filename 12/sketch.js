let WIDTH;
let HEIGHT;
const PI = Math.PI;
let N = 1;
let randomSeed = Math.floor(Math.random() * 10000);
let COLOURS = [
  'white',
  '#19a974',
  '#ff4136',
];

let SPEED = 1;

let lines = [];
let _prevColour = -1;
let START_X;

function setup() {
  let canvasContainer = document.getElementById("canvas-container");
  createCanvas(canvasContainer.offsetWidth, canvasContainer.offsetHeight).parent('canvas-container');
  HEIGHT = canvasContainer.offsetHeight;
  WIDTH = canvasContainer.offsetWidth;
  START_X = WIDTH / 2;
  strokeWeight(1);
  rectMode(CENTER);
  background('black');
  frameRate(60);

  for (let i = 0; i < N; i++) {
    lines.push({
      x: START_X,
      y: HEIGHT,
      angle: PI * 4/4,
      width: 64,
      age: 0,
      done: false,
      generation: 0,
      colour: randomColour(),
    });
  }
}

function draw() {
  drawLines();
  moveLines();
  splitLines();
}

function randomColour() {
  _prevColour = (_prevColour + 1) % COLOURS.length;
  return COLOURS[_prevColour];
}

function splitLines() {
  let newLines = [];
  lines.forEach(line => {
    if (line.done) return;

    if (line.age === 150 / SPEED) {
      line.done = true;

      for (let i = 0; i < 2; i++) {
        newLines.push({
          x: line.x,
          y: line.y,
          angle: line.angle,
          width: Math.max(2, line.width / 2),
          age: 0,
          done: false,
          generation: line.generation + 1,
          colour: line.colour,
        });
      }
    }
  });

  newLines.forEach(n => lines.push(n));
}

function drawLines() {
  noStroke();
  lines.forEach((line) => {
    if (line.done) return;
    fill(line.colour);
    let { x, y, width } = line;
    ellipse(x, y, width, width);
    line.age++;
  });
}

function moveLines() {
  lines.forEach((line, i) => {
    if (line.done) return;
    noiseSeed(randomSeed + i);
    let maxNoiseAngle = (0.6 + (0.1 * line.generation)) * PI;
    let angle = line.angle + map(noise(frameCount /  60), 0, 1, -1 * maxNoiseAngle, maxNoiseAngle);
    line.x += SPEED * Math.sin(angle);
    line.y += SPEED * Math.cos(angle);

    if (line.generation > 8 || line.x < 0 || line.x > WIDTH || line.y < 0 || line.y > HEIGHT) {
      line.done = true;
    }
  });

  // if(lines.filter(l => !l.done).length === 0) {
  //   START_X = (START_X + WIDTH * 0.6) % WIDTH;
  //   lines.push({
  //     x: START_X,
  //     y: HEIGHT,
  //     angle: PI * 4/4,
  //     width: 64,
  //     age: 0,
  //     done: false,
  //     generation: 0,
  //     colour: randomColour(),
  //   });
  // }
}

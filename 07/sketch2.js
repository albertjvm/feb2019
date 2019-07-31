let WIDTH;
let HEIGHT;
let N;
let lines = [];
let SPEED = 2;

function setup() {
  let canvasContainer = document.getElementById("canvas-container");
  createCanvas(canvasContainer.offsetWidth, canvasContainer.offsetHeight).parent('canvas-container');
  HEIGHT = canvasContainer.offsetHeight;
  WIDTH = canvasContainer.offsetWidth;
  N = Math.min(WIDTH, HEIGHT);
  strokeWeight(5);
  frameRate(60);

  lines.push({
    x1: 100,
    y1: 0,
    x2: 100,
    y2: 0,
    xd: 1,
    yd: 1,
    done: false,
  });

  lines.push({
    x1: 0,
    y1: N,
    x2: 0,
    y2: N,
    xd: 1,
    yd: -1,
    done: false,
  });
}

function draw() {
  background('silver');
  drawLines();
  growLines();
  checkForCollisions();
  checkForEdges();
}

function drawLines() {
  lines.forEach(l => {
    line(l.x1, l.y1, l.x2, l.y2);
  });
}

function checkForEdges() {
  let newLines = [];

  lines.forEach(l => {
    if(l.xd > 0 && l.yd == 0 && l.x2 >= N) {
      if (l.done) return;

      newLines.push({
        x1: l.x2,
        y1: l.y2,
        x2: l.x2,
        y2: l.y2,
        xd: -1,
        yd: -1,
      });
      newLines.push({
        x1: l.x2,
        y1: l.y2,
        x2: l.x2,
        y2: l.y2,
        xd: -1,
        yd: 1,
      });

      l.xd = 0;
      l.done = true;
    } else if ((l.yd < 0 && l.y2 <= 0) || (l.yd > 0 && l.y2 >= N)) {
      if (l.done) return;

      newLines.push({
        x1: l.x2,
        y1: l.y2,
        x2: l.x2,
        y2: l.y2,
        xd: l.xd,
        yd: l.yd * -1,
      });

      l.yd = 0;
      l.xd = 0;
      l.done = true;
    }
  });

  newLines.forEach(l => lines.push(l));
}

function checkForCollisions() {
  let newLines = [];
  for ( let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines.length; j++) {
      if (i === j) continue;
      let l1 = lines[i];
      let l2 = lines[j];

      if (l1.x2 == l2.x2 && l1.y2 == l2.y2) {
        if (!l1.done || !l2.done) {
          console.log(l1.x2);
          newLines.push({
            x1: l1.x2,
            y1: l1.y2,
            x2: l1.x2,
            y2: l1.y2,
            xd: normalize(l1.xd + l2.xd),
            yd: normalize(l1.yd + l2.yd),
            done: false,
          });
          l1.done = true;
          l2.done = true;
        }

        l1.xd = 0;
        l1.yd = 0;
        l2.xd = 0;
        l2.yd = 0;
      }
    }
  }

  newLines.forEach(l => lines.push(l));
}

function growLines() {
  lines.forEach(l => {
    l.x2 += l.xd * SPEED;
    l.y2 += l.yd * SPEED;
  });
}

function normalize(n) {
  if (n > 0) return 1;
  if (n < 0) return -1;
  return 0;
}
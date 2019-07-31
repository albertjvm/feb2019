let WIDTH;
let HEIGHT;
let SIZE;
let MARGIN = 25;
let n = [];
let T = 5;
let F = 10;
let done = false;

function setup() {
  let canvasContainer = document.getElementById("canvas-container");
  createCanvas(canvasContainer.offsetWidth, canvasContainer.offsetHeight).parent('canvas-container');
  HEIGHT = canvasContainer.offsetHeight;
  WIDTH = canvasContainer.offsetWidth;
  SIZE = 900;
  strokeWeight(2);
  frameRate(60);
}

function draw() {
  background('black');

  if (!done && frameCount % F === 0) {
    n.push({x: 0, i: 0, color: getColour()});
    TweenLite.to(n[n.length - 1], T, {x: SIZE, ease: Power1.easeInOut});
  }

  n.forEach(o => {
    let { x, i, color } = o;

    stroke(255, color);
    if (i === 0) {
      line(MARGIN, MARGIN + x, MARGIN + x, MARGIN + SIZE);
    } else if (i === 1) {
      line(MARGIN + SIZE - x, MARGIN + SIZE, MARGIN + SIZE, MARGIN + x);
    } else if (i === 2) {
      line(MARGIN + SIZE - x, MARGIN, MARGIN + SIZE, MARGIN + SIZE - x);
    } else if (i === 3) {
      line(MARGIN, MARGIN + SIZE - x, MARGIN + x, MARGIN);
    }


    if (x === SIZE && (i === 0 || i === 2)) {
      TweenLite.to(o, T, {x: 0, ease: Power1.easeInOut});
      o.i = (o.i + 1) % 4;
    } else if (x === 0 && (i === 1 || i === 3)) {
      if ( i === 3 ) done = true;
      TweenLite.to(o, T, {x: SIZE, ease: Power1.easeInOut});
      o.i = (o.i + 1) % 4;
    }
  });
}

function getColour() {
  let maxN = SIZE / 3;
  return 255 - map(frameCount % maxN, 0, maxN, 0, 255);
}
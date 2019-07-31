let WIDTH;
let HEIGHT;
let SIZE;
const PI = Math.PI;
const GEN_TIME = 100;

function setup() {
  let canvasContainer = document.getElementById("canvas-container");
  createCanvas(canvasContainer.offsetWidth, canvasContainer.offsetHeight).parent('canvas-container');
  HEIGHT = canvasContainer.offsetHeight;
  WIDTH = canvasContainer.offsetWidth;
  SIZE = Math.min(WIDTH, HEIGHT) - 1;
  strokeWeight(1);
  frameRate(60);
}

function draw() {
  background('black');
  noStroke();
  fill('white');

  let tx = SIZE/3 + (hypLength(SIZE, SIZE) / 6) * Math.sin(PI/4 + PI/3);
  let ty = SIZE/3 + (hypLength(SIZE, SIZE) / 6) * Math.cos(PI/4 + PI/3);
  let finalScale = hypLength(SIZE, SIZE) / (SIZE/3);

  if (frameCount > (GEN_TIME * 6)) {
    let f = Math.min((frameCount - GEN_TIME * 6) / GEN_TIME, 1);
    translate(SIZE/3, SIZE/3);
    rotate(f * (PI/3));
    translate(-SIZE/3, -SIZE/3);

    translate(tx, ty);
    scale(map(f, 0, 1, 1, 3));
    translate(-tx, -ty);
  }

  triangle(0, 0, 0, SIZE, SIZE, SIZE);

  let x = SIZE/2;
  let y = SIZE/2;
  let baseLength = hypLength(SIZE, SIZE) / 3;
  let baseHeight = Math.min(baseLength/2 * Math.tan(PI/3), baseLength/2 * Math.tan(PI/3) * frameCount/GEN_TIME);
  growTriangle(x, y, baseLength, baseHeight, PI * 3/4);

  let triangles = newTriangles(x, y, baseLength, baseHeight, PI * 3/4, GEN_TIME);

  triangles.forEach(({x, y, base, height, angle}) => {
    let t = newTriangles(x, y, base, height, angle, GEN_TIME*2);

    t.forEach(({x, y, base, height, angle}) => {
      let t = newTriangles(x, y, base, height, angle, GEN_TIME*3);

      t.forEach(({x, y, base, height, angle}) => {
        let t = newTriangles(x, y, base, height, angle, GEN_TIME*4);

        t.forEach(({x, y, base, height, angle}) => {
          let t = newTriangles(x, y, base, height, angle, GEN_TIME*5);

          t.forEach(({x, y, base, height, angle}) => {
            let t = newTriangles(x, y, base, height, angle, GEN_TIME*6);
          });
        });
      });
    });
  });
  
  // strokeWeight(3);
  // stroke('red');
  // line(SIZE/3, SIZE/3, tx, ty);
  // noStroke();
}

function newTriangles(x, y, base, height, angle, frameOffset) {
  let newBase = base/3;
  let newHeight = Math.min(newBase/2 * Math.tan(PI/3), newBase/2 * Math.tan(PI/3) * (frameCount - frameOffset)/GEN_TIME);
  let result = [];

  result.push({
    x: x + base * Math.sin(angle + PI/2), 
    y: y + base * Math.cos(angle + PI/2), 
    base: newBase,
    height: newHeight,
    angle: angle,
  });

  result.push({
    x: x + base * Math.sin(angle - PI/2), 
    y: y + base * Math.cos(angle - PI/2), 
    base: newBase,
    height: newHeight,
    angle: angle,
  });

  result.push({
    x: (x + base/2 * Math.sin(angle + PI/2)) + base/2 * Math.sin(angle - PI/6), 
    y: (y + base/2 * Math.cos(angle + PI/2)) + base/2 * Math.cos(angle - PI/6), 
    base: newBase,
    height: newHeight,
    angle: angle + PI/3,
  });

  result.push({
    x: (x + base/2 * Math.sin(angle - PI/2)) + base/2 * Math.sin(angle + PI/6), 
    y: (y + base/2 * Math.cos(angle - PI/2)) + base/2 * Math.cos(angle + PI/6), 
    base: newBase,
    height: newHeight,
    angle: angle - PI/3,
  });

  let oldX = x;
  let oldY = y;
  result.forEach(({x, y, base, height, angle}) => {
    growTriangle(x, y, base, height, angle);

    // strokeWeight(3);
    // stroke('red');
    // line(oldX, oldY, x, y);
    // noStroke();
  });

  return result;
}

function growTriangle(x, y, base, height, angle) {
  if (height < 0) return;
  triangle(
    x + (base / 2) * Math.sin(angle + PI/2),
    y + (base / 2) * Math.cos(angle + PI/2),
    x + (base / 2) * Math.sin(angle - PI/2),
    y + (base / 2) * Math.cos(angle - PI/2),
    x + height * Math.sin(angle),
    y + height * Math.cos(angle),
  );
}

function hypLength(side1, side2) {
  return Math.sqrt(Math.pow(side1, 2) + Math.pow(side2, 2));
}
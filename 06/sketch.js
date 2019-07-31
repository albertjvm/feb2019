let WIDTH;
let HEIGHT;
let PI = Math.PI;
const COLOURS = [
  '#357edd',
  '#19a974',
  '#ff4136',
  '#a463f2',
];

let circle1 = {
  x: 300,
  y: 100,
  radius: 50,
  speed: 1/2,
  colour: COLOURS[0],
};

let circle2 = {
  x: 100,
  y: 500,
  radius: 50,
  speed: 3/2,
  colour: COLOURS[2],
};

let square1 = {
  x: 100,
  y: 300,
  radius: 50,
  speed: 1/2,
  colour: COLOURS[1],
};

let square2 = {
  x: 500,
  y: 100,
  radius: 50,
  speed: 3/2,
  colour: COLOURS[3],
};

let shapes = [];

function setup() {
  let canvasContainer = document.getElementById("canvas-container");
  createCanvas(canvasContainer.offsetWidth, canvasContainer.offsetHeight).parent('canvas-container');
  HEIGHT = canvasContainer.offsetHeight;
  WIDTH = canvasContainer.offsetWidth;
  rectMode(RADIUS);
  strokeWeight(3);
  frameRate(60);
}

function draw() {
  background('#fffceb');
  let c1 = drawCircle(circle1, frameCount);
  let s1 = drawSquare(square1, frameCount);
  let c2 = drawCircle(circle2, frameCount);
  let s2 = drawSquare(square2, frameCount);

  stroke(circle1.colour);
  line(c1.x, 0, c1.x, HEIGHT);

  stroke(square1.colour);
  line(0, s1.y, WIDTH, s1.y);

  stroke(circle2.colour);
  line(0, c2.y, WIDTH, c2.y);

  stroke(square2.colour);
  line(s2.x, 0, s2.x, HEIGHT);

  for (let i = 0; i < 4; i++) {
    if (!shapes[i]) {
      shapes[i] = [];
    }
  }

  shapes[0].push({
    x: c1.x,
    y: s1.y,
  });
  shapes[1].push({
    x: c1.x,
    y: c2.y,
  });
  shapes[2].push({
    x: s2.x,
    y: s1.y,
  });
  shapes[3].push({
    x: s2.x,
    y: c2.y,
  });

  drawShapes();
}

function drawShapes() {
  stroke('black');
  fill(255, 0);
  shapes.forEach(s => {
    beginShape();
    s.forEach(v => {
      curveVertex(v.x, v.y);
    })
    endShape();
  });
}

function drawSquare({x, y, radius, speed, colour}, t) {
  push();
  fill(255, 0);
  stroke(colour);
  rect(x, y, radius, radius);
  let p = pointOnSquare(x, y, radius, speed, t);
  line(x, y, p.x, p.y);
  fill(colour);
  ellipse(p.x, p.y, 10, 10);
  pop();

  return p;
}

function pointOnSquare(x, y, radius, speed, t) {
  let d = (t * speed * 3) % (radius * 8);
  if (d < radius) {
    return {
      x: x + d,
      y: y + radius,
    };
  } else if (d < radius * 3) {
    return {
      x: x + radius,
      y: y + radius - (d - radius),
    };
  } else if (d < radius * 5) {
    return {
      x: x + radius - (d - radius * 3),
      y: y - radius,
    };
  } else if (d < radius * 7) {
    return {
      x: x - radius,
      y: y - radius + (d - radius * 5),
    };
  } else {
    return {
      x: x - radius + (d - radius * 7),
      y: y + radius,
    };
  }
}

function drawCircle({x, y, radius, speed, colour}, t) {
  push();
  fill(255, 0);
  stroke(colour);
  ellipse(x, y, radius * 2, radius * 2);
  let p = pointOnCircle(x, y, radius, speed, t);
  line(x, y, p.x, p.y);
  fill(colour);
  ellipse(p.x, p.y, 10, 10);
  pop();

  return p;
}

function pointOnCircle(x, y, radius, speed, t) {
  let time = speed / 20 * t;
  return {
    x: radius * Math.sin(time) + x,
    y: radius * Math.cos(time) + y,
  };
}
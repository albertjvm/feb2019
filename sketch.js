let WIDTH;
let HEIGHT;
// let N = 10;
// let MARGIN = 50;

function setup() {
  let canvasContainer = document.getElementById("canvas-container");
  createCanvas(canvasContainer.offsetWidth, canvasContainer.offsetHeight).parent('canvas-container');
  HEIGHT = canvasContainer.offsetHeight;
  WIDTH = canvasContainer.offsetWidth;
  strokeWeight(1);
  frameRate(60);
}

function draw() {
  background('white');
}

// function createGrid() {
//   const points = [];
//   for (let x = 0; x < N; x++) {
//     for (let y = 0; y < N; y++) {
//       const u = N <= 1 ? 0.5 : x / (N - 1);
//       const v = N <= 1 ? 0.5 : y / (N - 1);

//       points.push({
//         position: [ u, v ],
//       });
//     }
//   }
//   return points;
// }
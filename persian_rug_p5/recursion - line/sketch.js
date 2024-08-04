// https://supercolorpalette.com/?scp=G0-hsl-FFDA1F-FFC71F-FFB41F-1F4DFF-1F60FF-1F75FF-1F87FF-1F9AFF

// let palette = {
//   colors: {
//     0: "#FFDA1F",
//     1: "#FFC71F",
//     2: "#FFB41F",
//     3: "#FFA21F",
//     4: "#1F4DFF",
//     5: "#1F60FF",
//     6: "#1F75FF",
//     7: "#1F87FF",
//     8: "#1F9AFF",
//   },
// };

//https:supercolorpalette.com/?scp=G0-hsl-FFAD1F-FFCB1F-FFE91F-F8FF1F-DAFF1F-BCFF1F-1FFFC1-1FFFDF-1FFFFD-1FE4FF-1FC6FF-B71FFF-D51FFF-F31FFF-FF1FEE-FF1FD0

let palette = {
  colors: {
    0: "#FFDA1F",
    1: "#FFCB1F",
    2: "#FFE91F",
    3: "#F8FF1F",
    4: "#DAFF1F",
    5: "#BCFF1F",
    6: "#1FFFC1",
    7: "#1FFFDF",
    8: "#1FFFFD",
    9: "#1FE4FF",
    10: "#1FC6FF",
    11: "#B71FFF",
    12: "#D51FFF",
    13: "F31FFF",
    14: "#FF1FEE",
    15: "#FF1FD0",
  },
};

function make2DArray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows).fill(0); // Initialize with 11 directly
  }
  return arr;
}

let grid;
let w;
let resolution = 100;

let n = 2;
let rows;
let ncol = 16;
let shiftArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let shift;
let graphics = [];

function setup() {
  // With n = 3, get 9x9 grid
  rows = pow(2, n) + 1;
  w = rows * resolution;
  shift = int(random(shiftArray));
  createCanvas(w, w);
  // pg = createGraphics(w, w);

  grid = make2DArray(rows, rows);
  //fillBorder(grid);

  noStroke();
  // let col = getHexColorByKey(0, palette);
  // drawBorders(col);

  //image(pg, 0, 0);
  drawSquare(0, 0, w);
  noLoop();
}

function drawSquare(i, j, squareS, rows) {
  drawRug(i, j, squareS, rows);
  let newS = floor(squareS / 2) + 1;
  let newRow = floor(rows / 2) + 1;
  if (newRow > 1) {
    drawSquare(i, j, newS, newRow);
    drawSquare(i + (newRow - 1), y, newS, newRow);
    drawSquare(i, j + (newRow - 1), newS, newRow);
    drawSquare(i + (newRow - 1), j + (newRow - 1), newS, newRow);
  }
}
function drawRug(i, j, squareS, rows) {
  let buffer = createGraphics(squareS, squareS);
  let rug = new PersianRug(
    i,
    j,
    shift,
    resolution,
    grid,
    squareS,
    rows,
    ncol,
    buffer
  );
  rug.calculateColor();
  rug.show();
  graphics.push({
    buffer: buffer,
    i: i,
    j: j,
    squareS: squareS,
  });
}

function draw() {
  for (let g of graphics) {
    image(g.buffer, g.x, g.y, g.w, g.h);
  }
}

function fillBorder(grid) {
  for (let i = 0; i < rows; i++) {
    grid[i][0] = 0;
    grid[i][rows - 1] = 0;
    grid[0][i] = 0;
    grid[rows - 1][i] = 0;
  }
}

function drawBorders(col) {
  for (let i = 0; i < rows; i++) {
    let x = i * resolution;
    fill(col);
    rect(x, 0, resolution, resolution);
    rect(x, (rows - 1) * resolution, resolution, resolution);
    rect(0, i * resolution, resolution, resolution);
    rect((rows - 1) * resolution, i * resolution, resolution, resolution);
  }
}

function getHexColorByKey(key, palette) {
  return palette.colors[key] || null;
}

function getKeyByHexColor(hexColor, palette) {
  for (let key in palette.colors) {
    if (palette.colors[key].toLowerCase() === hexColor.toLowerCase()) {
      return key;
    }
  }
  return null;
}

function mousePressed() {
  save("rug.jpg");
}

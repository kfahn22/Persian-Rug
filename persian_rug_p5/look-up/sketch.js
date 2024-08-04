// TODO: Add more efficient search algorithm!!!

//https://supercolorpalette.com/?scp=G0-hsl-2E1FFF-1F22FF-FF9A1F-FF871F-84FF1F-96FF1F
// https://editor.p5js.org/kfahn/sketches/eOAk3ygZB

let palette = {
  colors: {
    0: "#2E1FFF",
    1: "#1F22FF",
    2: "#FF9A1F",
    3: "#FF871F",
    4: "#84FF1F",
    5: "#96FF1F",
  },
};

function make2DArray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows).fill(0); // Initialize with 11 directly
  }
  return arr;
}

function preload() {
  lookupTable = loadJSON("newKeys.json");
}

let grid;
let w;
let resolution = 2;

let n = 6;
let rows;
// TODO edit code to determine ncol automatically
// Number of colors in palette
// Used to calculate next color
let ncol = 6;
let shift = [1, 2, 3, 4, 5];
let pg, buffer;
let lookupTable = {};

function setup() {
  rows = pow(2, n) + 1;
  w = rows * resolution;
  let sh = int(random(shift));
  createCanvas(w, w);
  pg = createGraphics(w, w);

  // Precalculate new values
  // for (let n1 = 0; n1 < ncol; n1++) {
  //   for (let n2 = 0; n2 < ncol; n2++) {
  //     for (let n3 = 0; n3 < ncol; n3++) {
  //       for (let n4 = 0; n4 < ncol; n4++) {
  //         for (let s of shift) {
  //           let key = `${n1},${n2},${n3},${n4},${s}`;
  //           let value = (n1 + n2 + n3 + n4 + s) % 6;
  //           lookupTable[key] = value;
  //         }
  //       }
  //     }
  //   }
  // }
  // // Save the JSON file.
  // saveJSON(lookupTable, "newKeys.json");

  grid = make2DArray(rows, rows);
  fillBorder(grid);

  pg.noStroke();
  let col = getHexColorByKey(0, palette);
  drawBorders(col);
  let stack = [{ x: 0, y: 0, squareS: rows, lookupTable }];

  while (stack.length > 0) {
    let current = stack.pop();
    let x = current.x;
    let y = current.y;
    let squareS = current.squareS;

    if (squareS > resolution) {
      let rug = new PersianRug(
        x,
        y,
        sh,
        resolution,
        grid,
        squareS,
        rows,
        ncol,
        lookupTable
      );
      rug.calculateColor();
      rug.show();

      let newSize = floor(squareS / 2) + 1;

      stack.push({ x: x, y: y, squareS: newSize });
      stack.push({ x: x + (newSize - 1) * resolution, y: y, squareS: newSize });
      stack.push({ x: x, y: y + (newSize - 1) * resolution, squareS: newSize });
      stack.push({
        x: x + (newSize - 1) * resolution,
        y: y + (newSize - 1) * resolution,
        squareS: newSize,
      });
    }
  }

  //pg.image(buffer, 0, 0);
  image(pg, 0, 0);
  let d = deltaTime;
  //text(`${d} seconds`, width + 50, 50);
}

function draw() {}

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
    pg.fill(col);
    pg.rect(x, 0, resolution, resolution);
    pg.rect(x, (rows - 1) * resolution, resolution, resolution);
    pg.rect(0, i * resolution, resolution, resolution);
    pg.rect((rows - 1) * resolution, i * resolution, resolution, resolution);
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

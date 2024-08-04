let palette = {
  colors: {
    0: "#FFDA1F",
    1: "#FFC71F",
    2: "#FFB41F",
    3: "#FFA21F",
    4: "#1FB4FF",
    5: "#1FC7FF",
    6: "#1FDAFF",
    7: "#1FECFF",
    8: "#691FFF",
    9: "#571FFF",
    10: "#441FFF",
    11: "#311FFF",
  },
};

function make2DArray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows).fill(11); // Initialize with 11 directly
  }
  return arr;
}

let grid;
let w;
let resolution = 2;

let n = 9;
let rows;
let ncol = 12;
let shift = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let pg;

function setup() {
  rows = pow(2, n) + 1;
  w = rows * resolution;
  let sh = int(random(shift));
  createCanvas(w, w);
  pg = createGraphics(w, w);
  pg.background(255);

  grid = make2DArray(rows, rows);
  fillBorder(grid);

  pg.noStroke();
  let col = getHexColorByKey(0, palette);
  drawBorders(col);

  let stack = [{ x: 0, y: 0, size: rows }];

  while (stack.length > 0) {
    let current = stack.pop();
    let x = current.x;
    let y = current.y;
    let size = current.size;

    if (size > resolution) {
      let rug = new PersianRug(
        x,
        y,
        sh,
        resolution,
        grid,
        size,
        rows,
        ncol,
        pg
      );
      rug.getCorners();
      rug.calculateColor();
      rug.show();

      let newSize = floor(size / 2) + 1;

      stack.push({ x: x, y: y, size: newSize });
      stack.push({ x: x + (newSize - 1) * resolution, y: y, size: newSize });
      stack.push({ x: x, y: y + (newSize - 1) * resolution, size: newSize });
      stack.push({
        x: x + (newSize - 1) * resolution,
        y: y + (newSize - 1) * resolution,
        size: newSize,
      });
    }
  }

  image(pg, 0, 0);
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

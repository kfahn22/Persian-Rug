class PersianRug {
  constructor(x, y, shift, res, grid, size, rows, ncol, lookup) {
    // this.buffer = buffer;
    this.x = x;
    this.y = y;
    this.shift = shift;
    this.res = res;
    this.grid = grid;
    this.i = this.x / this.res;
    this.j = this.y / this.res;
    this.size = size;
    this.rows = rows;
    this.ncol = ncol;
    this.mid = floor(this.size / 2);
    this.keys = [];
    this.lookup = lookup;
  }

  getHexColorByKey(key, palette) {
    return palette.colors[key] || null;
  }

  newColor(n1, n2, n3, n4, shift) {
    return (n1 + n2 + n3 + n4 + shift) % this.ncol;
  }

  calculateColor() {
    let n1 = this.grid[this.i][this.j];
    let n2 = this.grid[this.i + this.size - 1][this.j];
    let n3 = this.grid[this.i][this.j + this.size - 1];
    let n4 = this.grid[this.i + this.size - 1][this.j + this.size - 1];
    // Retrieve new key from lookup table
    let newKey = this.lookup[`${n1},${n2},${n3},${n4},${this.shift}`];

    let start = this.i + 1;
    let n = this.i + this.size - 1;
    let j = this.j + this.mid;
    for (let i = start; i < n; i++) {
      this.grid[i][j] = newKey;
    }
    start = this.j + 1;
    let i = this.i + this.mid;
    n = this.j + this.size - 1;
    for (let j = start; j < n; j++) {
      this.grid[i][j] = newKey;
    }
  }

  fillSquare(x, y, i, j) {
    noStroke();
    let key = this.grid[i][j];
    if (key !== null) {
      fill(this.getHexColorByKey(key, palette));
      rect(x, y, this.res, this.res);
    }
  }

  show() {
    for (let i = 1; i < this.rows - 1; i++) {
      for (let j = 0; j < this.rows - 1; j++) {
        let x = i * this.res;
        let y = j * this.res;
        this.fillSquare(x, y, i, j);
      }
    }
  }
}

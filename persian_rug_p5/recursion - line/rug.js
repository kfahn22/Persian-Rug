class PersianRug {
  constructor(i, j, shift, res, grid, size, rows, ncol, buffer) {
    this.i = i;
    this.j = j;
    this.shift = shift;
    this.res = res;
    this.grid = grid;
    this.x = this.i * this.res;
    this.y = this.j * this.res;
    this.size = size;
    this.rows = rows;
    this.ncol = ncol;
    this.buffer = buffer;
    this.mid = floor(this.rows / 2);
    this.shapes = [];
    this.keys = [];
  }

  getHexColorByKey(key, palette) {
    return palette.colors[key] || null;
  }

  newColor(n1, n2, n3, n4, shift) {
    return (n1 + n2 + n3 + n4 + shift) % this.ncol;
  }

  calculateColor() {
    //console.log(this.grid)
    let newKey = this.newColor(
      this.grid[this.i][this.j],
      this.grid[this.i + this.rows - 1][this.j],
      this.grid[this.i][this.j + this.rows - 1],
      this.grid[this.i + this.rows - 1][this.j + this.rows - 1],
      this.shift
    );
    console.log(newKey);

    let start = this.i + 1;
    let n = this.i + this.rows - 1;
    let j = this.j + this.mid;
    for (let i = start; i < n; i++) {
      this.grid[i][j] = newKey;
    }
    start = this.j + 1;
    let i = this.i + this.mid;
    n = this.j + this.rows - 1;
    for (let j = start; j < n; j++) {
      this.grid[i][j] = newKey;
    }
  }

  fillSquare(x, y, i, j) {
    this.buffer.noStroke();
    let key = this.grid[i][j];
    if (key !== null) {
      this.buffer.fill(this.getHexColorByKey(key, palette));
      this.buffer.rect(x, y, this.res, this.res);
      this.shapes.push(new Supershape(x, y, this.res, 1, 1, key));
    }
  }

  show() {
    this.fillSquare(this.x, this.y, this.i, this.j);
    push();
    this.buffer.stroke(255);
    for (let s of this.shapes) {
      s.show();
    }
    pop();
  }
}

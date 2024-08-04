class PersianRug {
  constructor(x, y, shift, res, grid, rows, gridR, ncol, pg) {
    this.x = x;
    this.y = y;
    this.shift = shift;
    this.res = res;
    this.grid = grid;
    this.i = this.x / this.res;
    this.j = this.y / this.res;
    this.rows = rows;
    this.gridR = gridR;
    this.ncol = ncol;
    this.pg = pg;
    this.mid = floor(this.rows / 2);
    this.corners = [];
    this.keys = [];
  }

  getCorners() {
    this.corners = [
      createVector(this.x, this.y),
      createVector(this.x + (this.rows - 1) * this.res, this.y),
      createVector(this.x, this.y + (this.rows - 1) * this.res),
      createVector(
        this.x + (this.rows - 1) * this.res,
        this.y + (this.rows - 1) * this.res
      ),
    ];
  }

  getHexColorByKey(key, palette) {
    return palette.colors[key] || null;
  }

  getKeyByHexColor(hexColor, palette) {
    for (let key in palette.colors) {
      if (palette.colors[key].toLowerCase() === hexColor.toLowerCase()) {
        return key;
      }
    }
    return null;
  }

  componentToHex(c) {
    let hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }

  // newColor(n1, n2, n3, n4, shift) {
  //   let a = 1;
  //   let b = 1;
  //   let c = 1;
  //   let d = 1;
  //   let e = 1;
  //   return (a * n1 + b * n2 + c * n3 + d * n4 + e * shift) % this.ncol;
  // }

  newColor(n1, n2, n3, n4, shift) {
    return (n1 + n2 + n3 + n4 + shift) % this.ncol;
  }

  rgbToHex(r, g, b) {
    return (
      "#" +
      this.componentToHex(r) +
      this.componentToHex(g) +
      this.componentToHex(b)
    );
  }

  calculateColor() {
    this.keys = this.corners.map((corner) => {
      let c = this.pg.get(corner.x, corner.y);
      return this.getKeyByHexColor(this.rgbToHex(c[0], c[1], c[2]), palette);
    });

    if (this.keys.length === 4) {
      let newKey = this.newColor(
        parseInt(this.keys[0]),
        parseInt(this.keys[1]),
        parseInt(this.keys[2]),
        parseInt(this.keys[3]),
        this.shift
      );

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
  }

  fillSquare(x, y, i, j) {
    this.pg.noStroke();
    let key = this.grid[i][j];
    if (key !== null) {
      this.pg.fill(this.getHexColorByKey(key, palette));
      this.pg.rect(x, y, this.res, this.res);
    }
  }

  show() {
    for (let i = 1; i < this.gridR - 1; i++) {
      for (let j = 0; j < this.gridR - 1; j++) {
        let x = i * this.res;
        let y = j * this.res;
        this.fillSquare(x, y, i, j);
      }
    }
  }
}

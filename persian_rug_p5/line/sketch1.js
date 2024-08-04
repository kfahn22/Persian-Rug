// I used this implementation in java as a reference:  https://stackoverflow.com/questions/26226531/persian-rug-recursion
// Algorithm to determine new color from https://www.youtube.com/watch?v=0wfPlzPvZiQ

// https://editor.p5js.org/kfahn/sketches/eOAk3ygZB

let n = 8;
let sqLeft, sqTop, sqRight, sqBot;
let resolution = 2;

// I  am getting the color palette from https://supercolorpalette.com
// https://supercolorpalette.com/?scp=G0-hsl-FFDA1F-FFC71F-FFB41F-1F4DFF-1F60FF-1F75FF
//https://supercolorpalette.com/?scp=G0-hsl-3A3AF8-733AF8-AC3AF8-F8F53A-C2F83A-89F83A

let palette = {
  colors: {
    0: "#3A3AF8",
    1: "#733AF8",
    2: "#AC3AF8",
    3: "#F8F53A",
    4: "#C2F83A",
    5: "#89F83A",
  },
};
// let palette = {
//   colors: {
//     0: "#FFDA1F",
//     1: "#FFC71F",
//     2: "#FFB41F",
//     3: "#1F4DFF",
//     4: "#1F60FF",
//     5: "#1F75FF",
//   },
// };
let ncol = 6; // number of colors in palette

function setup() {
  let rows = pow(2, n) + 1;
  let w = rows * resolution;
  createCanvas(w + 1, w + 1);
  sqLeft = 1;
  sqTop = 1;
  sqRight = w;
  sqBot = w;

  let c0 = getHexColorByKey(0, palette);
  let c1 = getHexColorByKey(1, palette);
  background(c0);
  strokeWeight(2);
  // I am getting a slight discrepency in RGB values for (right, bot)--The red value is off by 2.
  // I have dealt with this by adding an extra 1 pixel border
  //   console.log(get(left, top));
  //   console.log(get(right, top));
  //   console.log(get(left, bot));
  //   console.log(get(right, bot));
  stroke(c1);

  // Draw border
  line(sqLeft, sqTop, sqRight, sqTop);
  line(sqLeft, sqBot, sqRight, sqBot);
  line(sqLeft, sqTop, sqLeft, sqBot);
  line(sqRight, sqTop, sqRight, sqBot);
  // shift
  let shift = int(random(1, ncol));
  chooseColor(sqLeft, sqRight, sqTop, sqBot, shift);
}

function draw() {}

function chooseColor(left, right, top, bot, shift) {
  let midcol, midrow;

  if (left < right - 1) {
    newKey = floor(
      (getIndexbyRGB(get(left, top)) +
        getIndexbyRGB(get(right, top)) +
        getIndexbyRGB(get(left, bot)) +
        getIndexbyRGB(get(right, bot)) +
        shift) %
        ncol
    );
    //console.log(newKey);
    let col = getHexColorByKey(newKey, palette);
    //console.log(col)
    midcol = int((left + right) / 2);
    midrow = int((top + bot) / 2);

    // Add lines in middle row and column
    push();
    strokeWeight(1);
    stroke(col);
    line(left + 1, midrow, right - 1, midrow);
    line(midcol, top + 1, midcol, bot - 1);
    pop();

    chooseColor(left, midcol, top, midrow, shift);
    chooseColor(midcol, right, top, midrow, shift);
    chooseColor(left, midcol, midrow, bot, shift);
    chooseColor(midcol, right, midrow, bot, shift);
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

// Function that takes in RGB array retrieved by get() and returns an index into the palette array
function getIndexbyRGB(col) {
  let hex = rgbToHex(col[0], col[1], col[2]);
  return getKeyByHexColor(hex, palette);
}
function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function componentToHex(c) {
  let hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function keyPressed() {
  setup();
}

function mousePressed() {
  save("rug.jpg");
}

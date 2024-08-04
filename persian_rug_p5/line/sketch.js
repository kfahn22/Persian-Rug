// https://stackoverflow.com/questions/26226531/persian-rug-recursion
// Persian Rugs https://www.youtube.com/watch?v=0wfPlzPvZiQ
//let a = 1.0;

// Render speed gets progressively slower as n increases
// TODO:  try to improve speed

let n = 6;
let sqLeft, sqTop, sqRight, sqBot;
let resolution = 2;

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
  // I am getting a slight discrepency in RGB values for (right, bot)--The red value is off by 2.
  // I have dealt with this by adding an extra 1 pixel border
  strokeWeight(2);
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
    console.log(newKey);
    let col = getHexColorByKey(newKey, palette);
    midcol = int((left + right) / 2);
    midrow = int((top + bot) / 2);

    // Add lines in middle row and column
    push();
    strokeWeight(1);
    stroke(col);
    line(left + 1, midrow, right - 1, midrow);
    line(midcol, top + 1, midcol, bot - 1);
    // pop();

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

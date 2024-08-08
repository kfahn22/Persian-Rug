// p5.js implementation of Persian rug algorithm described in https://archive.bridgesmathart.org/2005/bridges2005-9.pdf

// I used this implementation in java as a reference:  https://stackoverflow.com/questions/26226531/persian-rug-recursion
// Algorithm to determine new color from https://www.youtube.com/watch?v=0wfPlzPvZiQ

// Two Important Notes:
// 1. n > 6 the render is a bit slow
// Reducing n or increasing value for resolution will speed up render
// 2. It is possible to randomly choose the same color as the border for the second color.  If this happens, the result is a square with just the original color

let n = 5;
let sqLeft, sqTop, sqRight, sqBot;
let resolution = 2;

// I am getting the palette from supercoloraplette in HEX form and then converting to RGB
let  url = "https://supercolorpalette.com/?scp=G0-hsl-B67702-B66802-B65902-B64A02-02A0B6-02AFB6-02B6AE-02B69F-1302B6-0402B6-020FB6";
let palette = [];

function extractHexCodes(url) {
  let startIndex = url.indexOf("=");
  let hexPart = url.substring(startIndex + 1);
  let parts = split(hexPart, '-');

  // Filter out parts that are not valid hex codes
  let hexCodes = [];
  for (let part of parts) {
    if (part.matches("[0-9A-Fa-f]{6}")) {
      hexCodes.push(part);
    }
  }
  return hexCodes;
  //return hexCodes.toArray(new String[hexCodes.size()]);
}

function hexToColor(hex) {
  let r = unhex(hex.substring(0, 2));
  let g = unhex(hex.substring(2, 4));
  let b = unhex(hex.substring(4, 6));
  return color(r, g, b);
}

function generatePaletteArray(url) {
  let hexCodes = extractHexCodes(url);
  palette = new color[hexCodes.length];

  for (let i = 0; i < hexCodes.length; i++) {
    palette[i] = hexToColor(hexCodes[i]);
  }
}

// ncol is the the number of colors in the palette
let ncol = 11;

function setup() {
  let rows = pow(2, n) + 1;
  let w = rows * resolution;
  createCanvas(w + 1, w + 1);
  sqLeft = 1;
  sqTop = 1;
  sqRight = w;
  sqBot = w;

  let c = getHexColorByKey(0, palette);
  strokeWeight(2);
  // I am getting a slight discrepency in RGB values for (right, bot)--The red value is off by 2.
  // I have dealt with this by changing strokeWeight to 2 for the initial border.
  //   console.log(get(left, top));
  //   console.log(get(right, top));
  //   console.log(get(left, bot));
  //   console.log(get(right, bot));
  stroke(c);

  // Draw border
  line(sqLeft, sqTop, sqRight, sqTop);
  line(sqLeft, sqBot, sqRight, sqBot);
  line(sqLeft, sqTop, sqLeft, sqBot);
  line(sqRight, sqTop, sqRight, sqBot);
  // shift
  let shift = int(random(1, ncol - 1));
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

function mousePressed() {
  save("rug.jpg");
}

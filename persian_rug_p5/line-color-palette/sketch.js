// p5.js implementation of Persian rug algorithm described in https://archive.bridgesmathart.org/2005/bridges2005-9.pdf

// I used this implementation in java as a reference:  https://stackoverflow.com/questions/26226531/persian-rug-recursion
// Algorithm to determine new color from https://www.youtube.com/watch?v=0wfPlzPvZiQ

// Two Important Notes:
// 1. n > 6 the render is a bit slow
// Reducing n or increasing value for resolution will speed up render
// 2. It is possible to randomly choose the same color as the border for the second color.  If this happens, the result is a square with just the original color

// https://editor.p5js.org/kfahn/sketches/2KJqdr_MC

let n = 8;
let sqLeft, sqTop, sqRight, sqBot;
let resolution = 2;

// I  am getting the color palette from https://supercolorpalette.com

// purples
//https://supercolorpalette.com/?scp=G0-hsl-A11FFF-8F1FFF-7C1FFF-691FFF-571FFF-441FFF-80FF1F-93FF1F-A5FF1F-B8FF1F-CBFF1F-DDFF1F
// let palette = {
//   colors: {
//     0: "#A11FFF",
//     1: "#8F1FFF",
//     2: "#7C1FFF",
//     3: "#691FFF",
//     4: "#571FFF",
//     5: "#441FFF",
//     6: "#80FF1F",
//     7: "#93FF1F",
//     8: "#A5FF1F",
//     9: "#B8FF1F",
//     10: "#CBFF1F",
//     11: "#DDFF1F",
//   },
// };

// Blue-yellow palette
//https://supercolorpalette.com/?scp=G0-hsl-FFDA1F-FFC71F-FFB41F-FFA21F-FF8F1F-FF7C1F-1F44FF-1F57FF-1F69FF-1F7CFF-1F8FFF-1FA2FF

// let palette = {
//   colors: {
//     0: "#1F44FF",
//     1: "#1F57FF",
//     2: "#1F69FF",
//     3: "#1F7CFF",
//     4: "#1F8FFF",
//     5: "#1FA2FF",
//     6: "#FFDA1F",
//     7: "#FFC71F",
//     8: "#FFB41F",
//     9: "#FFA21F",
//     10: "#FF8F1F",
//     11: "#FF7C1F",
//   },
// };

// https://supercolorpalette.com/?scp=G0-hsl-370E5D-29197B-273B96-3777AE-51B0BD-76C1B0-97C8AC-B6D2B8-D6DFD2-EEEFEB
let palette = {
  colors: {
    0: "#370E5D",
    1: "#29197B",
    2: "#273B96",
    3: "#3777AE",
    4: "#51B0BD",
    5: "#76C1B0",
    6: "#97C8AC",
    7: "#B6D2B8",
    8: "#D6DFD2",
    9: "#EEEFEB",
  },
};

// ncol is the the number of colors in the palette
let ncol = 8;

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
  let shift = int(random(1, ncol-1));
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

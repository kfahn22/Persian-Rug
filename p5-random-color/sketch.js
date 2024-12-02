// This code ia a p5 implementation of the Persian Rug algorithm and generates a random Persian Rug
// Note that it is possible to randomly get a boring rug. Just press play again until you get a nice one!

// Read about the Persian rug algorithm; https://archive.bridgesmathart.org/2005/bridges2005-9.pdf

// Learn more here: https://github.com/kfahn22/Persian-Rug

// To learn more about recursion, watch Daniel Shiffman's Recursion Coding Challenge
// https://thecodingtrain.com/challenges/77-recursion

// Based on this Processing sketch (https://github.com/kfahn22/Persian-Rug/blob/main/sketch.pdez), which is adapted from https://stackoverflow.com/questions/26226531/persian-rug-recursion

// I am using the method for choosing colors from Dr. Eric Gossett https://www.youtube.com/watch?v=0wfPlzPvZiQ1

let n = 10;
let sw = 2;
let palette = [];
let colorIndexArray = [];

function setup() {
  let canvasSize = Math.pow(2, n) + 1;
  createCanvas(canvasSize, canvasSize);
  noLoop();
  colorMode(HSB);

  //let s = floor(random(0, 255));
  // Initialize the color index array
  colorIndexArray = Array(canvasSize)
    .fill()
    .map(() => Array(canvasSize).fill(0));

  // Draw border
  let w = canvasSize - 1;
  drawBorder(1, 1, w, w, 0);

  // Choose colors for the internal grid
  let shift = floor(random(1, 255));
  chooseColor(1, w, 1, w, shift);

  // Save the result
  // saveCanvas("persian_rug", "jpg");
}

function drawBorder(left, top, right, bottom, hueVal) {
  stroke(hueVal, 100, 100);
  strokeWeight(sw);
  line(left, top, right, top); // Top
  line(left, bottom, right, bottom); // Bottom
  line(left, top, left, bottom); // Left
  line(right, top, right, bottom); // Right
}

function chooseColor(left, right, top, bottom, shift) {
  if (left < right - 1) {
    let newHue =
      (getIndex(colorIndexArray[left][top]) +
        getIndex(colorIndexArray[right][top]) +
        getIndex(colorIndexArray[left][bottom]) +
        getIndex(colorIndexArray[right][bottom]) +
        shift) %
      256;

    let midCol = floor((left + right) / 2);
    let midRow = floor((top + bottom) / 2);

    // Draw middle lines
    stroke(newHue, 100, 100);
    strokeWeight(sw);
    line(left + 1, midRow, right - 1, midRow); // Horizontal
    line(midCol, top + 1, midCol, bottom - 1); // Vertical

    // Update color index array
    colorIndexArray[midCol][midRow] = newHue;

    // Recursive calls
    chooseColor(left, midCol, top, midRow, shift);
    chooseColor(midCol, right, top, midRow, shift);
    chooseColor(left, midCol, midRow, bottom, shift);
    chooseColor(midCol, right, midRow, bottom, shift);
  }
}

function getIndex(colorIndex) {
  // Directly use the color index from the array
  return colorIndex;
}

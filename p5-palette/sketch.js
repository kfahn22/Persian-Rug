let n = 10; // Grid size: 257 x 257
let sw = 2;
let palette = [];
let colorIndexArray = [];
// let url =
//   "https://supercolorpalette.com/?scp=G0-hsl-6A2962-70367D-69438E-60519E-666FA9-7D94B0-94AFB8-A9C1BF-BDCBC6-D0D7D2-E2E4E2-F2F2F2";

let url =
  "https://supercolorpalette.com/?scp=G0-hsl-FFDA1F-FBAC23-F68128-F25A2C-1FB4FF-23DEFB-28F6E8-2CF2BD-691FFF-4023FB-2835F6-2C61F2";

function extractHexCodes(url) {
  let startIndex = url.indexOf("=");
  let hexPart = url.substring(startIndex + 1);
  let parts = hexPart.split("-");

  // Filter valid hex codes
  return parts.filter((part) => /^[0-9A-Fa-f]{6}$/.test(part));
}

function hexToColor(hex) {
  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);
  return color(r, g, b);
}

function generatePaletteArray(url) {
  let hexCodes = extractHexCodes(url);
  return hexCodes.map((hex) => hexToColor(hex));
}

function setup() {
  let canvasSize = Math.pow(2, n) + 1; // 257 x 257 for n = 8
  createCanvas(canvasSize, canvasSize);
  noLoop();
  palette = generatePaletteArray(url);

  // Initialize the color index array
  colorIndexArray = Array(canvasSize)
    .fill()
    .map(() => Array(canvasSize).fill(0));

  // Draw border
  let w = canvasSize - 1;
  drawBorder(1, 1, w, w, 0);

  // Choose colors for the internal grid
  let shift = floor(random(1, palette.length));
  chooseColor(1, w, 1, w, shift);

  // Save the result
  // saveCanvas("persian_rug", "jpg");
}

function drawBorder(left, top, right, bottom, colorIndex) {
  let c = palette[colorIndex];
  stroke(c);
  strokeWeight(sw);
  line(left, top, right, top); // Top
  line(left, bottom, right, bottom); // Bottom
  line(left, top, left, bottom); // Left
  line(right, top, right, bottom); // Right
}

function chooseColor(left, right, top, bottom, shift) {
  if (left < right - 1) {
    let newIndex =
      (getIndex(colorIndexArray[left][top]) +
        getIndex(colorIndexArray[right][top]) +
        getIndex(colorIndexArray[left][bottom]) +
        getIndex(colorIndexArray[right][bottom]) +
        shift) %
      palette.length;

    let col = palette[newIndex];
    let midCol = floor((left + right) / 2);
    let midRow = floor((top + bottom) / 2);

    // Draw middle lines
    stroke(col);
    strokeWeight(sw);
    line(left + 1, midRow, right - 1, midRow); // Horizontal
    line(midCol, top + 1, midCol, bottom - 1); // Vertical

    // Update color index array
    colorIndexArray[midCol][midRow] = newIndex;

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

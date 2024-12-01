// Reference for canvas sizes based on n
// n = 8, size = 257 x 257
// n = 9, size = 513 x 513
// n = 10, size 1025, 1025

int n = 9; // Grid size (set the desired value of n here)
int canvasSize = 513; // Adjust based on chosen value of n
int[][] colorIndexArray; // Array to store color indices
color[] palette; // Array for the color palette
//String url = "https://supercolorpalette.com/?scp=G0-hsl-6A2962-70367D-69438E-60519E-666FA9-7D94B0-94AFB8-A9C1BF-BDCBC6-D0D7D2-E2E4E2-F2F2F2";
String url =  "https://supercolorpalette.com/?scp=G0-hsl-4C0000-700106-930112-B70122-DA0137-FE0151-004C4C-017068-019380-01B792-01DAA0-01FEAA";

void setup() {
  size(513, 513);
  
  // Initialize the palette and color index array
  palette = generatePaletteArray(url);
  colorIndexArray = new int[canvasSize][canvasSize];

  // Draw the border
  int w = canvasSize - 1;
  drawBorder(1, 1, w, w, 0);

  // Choose colors recursively
  int shift = floor(random(1, palette.length));
  chooseColor(1, w, 1, w, shift);

  save("persian_rug.jpg");
  noLoop();
}

// Draws the border with a specific color index
void drawBorder(int left, int top, int right, int bottom, int colorIndex) {
  color c = palette[colorIndex];
  stroke(c);

  line(left, top, right, top); // Top
  line(left, bottom, right, bottom); // Bottom
  line(left, top, left, bottom); // Left
  line(right, top, right, bottom); // Right

  // Update color index array for borders
  for (int i = left; i <= right; i++) {
    colorIndexArray[i][top] = colorIndex;
    colorIndexArray[i][bottom] = colorIndex;
  }
  for (int i = top; i <= bottom; i++) {
    colorIndexArray[left][i] = colorIndex;
    colorIndexArray[right][i] = colorIndex;
  }
}

// Recursive function to choose colors and draw middle lines
void chooseColor(int left, int right, int top, int bottom, int shift) {
  if (left < right - 1) {
    int newIndex = (colorIndexArray[left][top] +
                    colorIndexArray[right][top] +
                    colorIndexArray[left][bottom] +
                    colorIndexArray[right][bottom] +
                    shift) % palette.length;

    color col = palette[newIndex];
    int midCol = (left + right) / 2;
    int midRow = (top + bottom) / 2;

    // Draw middle lines
    stroke(col);
    line(left + 1, midRow, right - 1, midRow); // Horizontal
    line(midCol, top + 1, midCol, bottom - 1); // Vertical

    // Update the color index array
    for (int i = left + 1; i < right; i++) {
      colorIndexArray[i][midRow] = newIndex;
    }
    for (int i = top + 1; i < bottom; i++) {
      colorIndexArray[midCol][i] = newIndex;
    }

    // Recursive calls
    chooseColor(left, midCol, top, midRow, shift);
    chooseColor(midCol, right, top, midRow, shift);
    chooseColor(left, midCol, midRow, bottom, shift);
    chooseColor(midCol, right, midRow, bottom, shift);
  }
}

// Converts the palette URL into an array of colors
color[] generatePaletteArray(String url) {
  String[] hexCodes = extractHexCodes(url);
  color[] result = new color[hexCodes.length];
  for (int i = 0; i < hexCodes.length; i++) {
    result[i] = hexToColor(hexCodes[i]);
  }
  return result;
}

// Extracts valid hex codes from the URL
String[] extractHexCodes(String url) {
  int startIndex = url.indexOf("=");
  String hexPart = url.substring(startIndex + 1);
  String[] parts = split(hexPart, '-');

  ArrayList<String> hexCodes = new ArrayList<String>();
  for (String part : parts) {
    if (part.matches("[0-9A-Fa-f]{6}")) {
      hexCodes.add(part);
    }
  }
  return hexCodes.toArray(new String[hexCodes.size()]);
}

// Converts a hex string to a Processing color
color hexToColor(String hex) {
  int r = unhex(hex.substring(0, 2));
  int g = unhex(hex.substring(2, 4));
  int b = unhex(hex.substring(4, 6));
  return color(r, g, b);
}

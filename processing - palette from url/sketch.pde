// Canvas size pow(2, n) + 1 where n = 9
int n = 9;
int sqLeft, sqTop, sqRight, sqBot;
int ncol = 11;
color c;

String url = "https://supercolorpalette.com/?scp=G0-hsl-FFDA1F-FFC71F-FFB41F-FFA21F-FF8F1F-FF7C1F-1F44FF-1F57FF-1F69FF-1F7CFF-1F8FFF-1FA2FF";
color[] palette;

String[] extractHexCodes(String url) {
  int startIndex = url.indexOf("=");
  String hexPart = url.substring(startIndex + 1);
  String[] parts = split(hexPart, '-');

  // Filter out parts that are not valid hex codes
  ArrayList<String> hexCodes = new ArrayList<String>();
  for (String part : parts) {
    if (part.matches("[0-9A-Fa-f]{6}")) {
      hexCodes.add(part);
    }
  }

  return hexCodes.toArray(new String[hexCodes.size()]);
}

color hexToColor(String hex) {
  int r = unhex(hex.substring(0, 2));
  int g = unhex(hex.substring(2, 4));
  int b = unhex(hex.substring(4, 6));
  return color(r, g, b);
}

void generatePaletteArray(String url) {
  String[] hexCodes = extractHexCodes(url);
  palette = new color[hexCodes.length];

  for (int i = 0; i < hexCodes.length; i++) {
    palette[i] = hexToColor(hexCodes[i]);
  }
}

void setup() {
  size(513, 513);
  int w = int(pow(2, n));
  generatePaletteArray(url);

  sqLeft = 1;
  sqTop = 1;
  sqRight = w;
  sqBot = w;

  c = palette[0];
  stroke(c);

  // Draw border
  line(sqLeft, sqTop, sqRight, sqTop);
  line(sqLeft, sqBot, sqRight, sqBot);
  line(sqLeft, sqTop, sqLeft, sqBot);
  line(sqRight, sqTop, sqRight, sqBot);

  int shift = floor(random(1, palette.length));
  chooseColor(sqLeft, sqRight, sqTop, sqBot, shift);
  save("rug8.jpg");
}

void draw() {
  noLoop();
}

void chooseColor(int left, int right, int top, int bot, int shift) {
  if (left < right - 1) {
    int newIndex = abs((getIndex(get(left, top), palette) +
      getIndex(get(right, top), palette) +
      getIndex(get(left, bot), palette) +
      getIndex(get(right, bot), palette) + shift) % (palette.length));

    color col = palette[newIndex];
    int midcol = int((left + right) / 2);
    int midrow = int((top + bot) / 2);

    // Add lines in middle row and column
    pushStyle();
    strokeWeight(1);

    stroke(col);
    line(left + 1, midrow, right - 1, midrow);
    line(midcol, top + 1, midcol, bot - 1);
    popStyle();

    chooseColor(left, midcol, top, midrow, shift);
    chooseColor(midcol, right, top, midrow, shift);
    chooseColor(left, midcol, midrow, bot, shift);
    chooseColor(midcol, right, midrow, bot, shift);
  }
}

// The get() is not returning the exact r,g,b values from the palette array
// I have accounted for this by comparing the difference of the corresponding r,g,b values
int getIndex(color targetColor, color[] palette) {
  for (int i = 0; i < palette.length; i++) {
    //println("rp is " + red(palette[0]));
    //println("rt is " + red(targetColor));
    //println("gp is " + green(palette[0]));
    //println("gt is " + green(targetColor));
    //println("bp is " + blue(palette[0]));
    //println("bt is " + blue(targetColor));

    if ((abs(red(targetColor) - red(palette[i]))< 5) &&
      (abs(green(targetColor) - green(palette[i]))< 5) &&
      (abs(blue(targetColor) - blue(palette[i]))< 5)) {
      return i;
    }
  }
  return -1; // Return -1 if the color is not found
}
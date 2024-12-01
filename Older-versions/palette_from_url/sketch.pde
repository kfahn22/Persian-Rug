// Canvas size pow(2, n) + 1 where n = 9

int n = 9; // (513, 513)

int sqLeft, sqTop, sqRight, sqBot;

color c;

// I am getting the palette from supercoloraplette in HEX form and then converting to RGB
//String url = "//https://supercolorpalette.com/?scp=G0-hsl-A11FFF-8F1FFF-7C1FFF-691FFF-571FFF-441FFF-80FF1F-93FF1F-A5FF1F-B8FF1F-CBFF1F-DDFF1F";
//String url = "https://supercolorpalette.com/?scp=G0-hsl-014B6B-01647F-018093-019FA7-01BCB6-01D0B8-01E4B7-01F9B3-10FEA7-25FE9C";
//String url = "https://supercolorpalette.com/?scp=G0-hsl-014B6B-013C8E-0118B2-2101D5-6C01F9-BF20FE-FE43FE-FE67D3-FE8ABD-FFAEBA";
//String url = "https://supercolorpalette.com/?scp=G0-hsl-0E00AD-2600D1-4500F5-711AFF-9B3DFF-BD61FF-D885FF-ECA8FF-F9CCFF-FFF0FF";
//String url = "https://supercolorpalette.com/?scp=G0-hsl-005E66-00638A-005AAD-0042D1-001DF5-2D1AFF-743DFF-AD61FF-D885FF-F5A8FF-FFCCFB-FFF0FB";
//String url = "https://supercolorpalette.com/?scp=G0-hsl-02003D-170061-390085-6B00A8-AA00CC-F000E8-FF14C8-FF38A9-FF5C98-FF8095-FFA5A3-FFD3C7";
String url = "https://supercolorpalette.com/?scp=G0-hsl-4C0000-700106-930112-B70122-DA0137-FE0151-004C4C-017068-019380-01B792-01DAA0-01FEAA";

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
  //size(257, 257);
  int w = int(pow(2, n));
  generatePaletteArray(url);

  sqLeft = 0;
  sqTop = 0;
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
  save("rug.jpg");
}

void draw() {
  noLoop();
}

void chooseColor(int left, int right, int top, int bot, int shift) {
  if (left < right - 1) {
    //int newIndex = abs((getIndex(get(left, top), palette) +
    //  getIndex(get(right, top), palette) +
    //  getIndex(get(left, bot), palette) +
    //  getIndex(get(right, bot), palette) + shift) % (palette.length));
    
    int i1 = getIndex(get(left, top), palette);
    int i2 = getIndex(get(right, top), palette);
    int i3 = getIndex(get(left, bot), palette);
    int i4 = getIndex(get(right, bot), palette);
    int p = 3;
    int newIndex = abs(int(pow(i1, p) + int(pow(i2, p)) + int(pow(i3, p))+ int(pow(i4, p)) + shift) % palette.length);

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

// the get() is not returning the exact r,g,b values from the palette array
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
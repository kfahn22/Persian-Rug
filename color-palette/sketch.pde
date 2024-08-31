// Canvas size pow(2, n) + 1 where n = 9

int n = 9; // (513, 513)
int sqLeft, sqTop, sqRight, sqBot;

color c;

void setup() {
  size(513, 513);
  int w = int(pow(2, n));

  sqLeft = 0;
  sqTop = 0;
  sqRight = w;
  sqBot = w;

  c = palette[2];
  stroke(c);

  // Draw border
  line(sqLeft, sqTop, sqRight, sqTop);
  line(sqLeft, sqBot, sqRight, sqBot);
  line(sqLeft, sqTop, sqLeft, sqBot);
  line(sqRight, sqTop, sqRight, sqBot);

  int shift = floor(random(1, 2*palette.length));
  chooseColor(sqLeft, sqRight, sqTop, sqBot, shift);
  save("rug.jpg");
}

void draw() {
  noLoop();
}

void chooseColor(int left, int right, int top, int bot, int shift) {
  if (left < right - 1) {
    
    int i1 = getIndex(get(left, top), palette);
    int i2 = getIndex(get(right, top), palette);
    int i3 = getIndex(get(left, bot), palette);
    int i4 = getIndex(get(right, bot), palette);
    int p = 1;
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

// The get() does not appear to return the exact r,g,b values from the palette array
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
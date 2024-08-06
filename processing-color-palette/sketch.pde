// Canvas size pow(2, n) + 1 where n = 9
int n = 9;
int sqLeft, sqTop, sqRight, sqBot;
int ncol = 11;
color c1;

void setup() {
  size(513, 513);
  int w = int(pow(2, n));
  //int w = rows * resolution;

  sqLeft = 1;
  sqTop = 1;
  sqRight = w;
  sqBot = w;

  c1 = palette[0];
  stroke(c1);

  // Draw border
  line(sqLeft, sqTop, sqRight, sqTop);
  line(sqLeft, sqBot, sqRight, sqBot);
  line(sqLeft, sqTop, sqLeft, sqBot);
  line(sqRight, sqTop, sqRight, sqBot);

  int shift = floor(random(palette.length));
  chooseColor(sqLeft, sqRight, sqTop, sqBot, shift);
  save("rug.jpg");
}

void draw() {
  noLoop();
}

void chooseColor(int left, int right, int top, int bot, int shift) {
  if (left < right - 1) {
    int newIndex = (getIndex(get(left, top), palette) +
      getIndex(get(right, top), palette) +
      getIndex(get(left, bot), palette) +
      getIndex(get(right, bot), palette) + shift) % (palette.length);

    //println("i1 is" + getIndex(get(left, top), palette));
    //println("i2 is" + getIndex(get(right, top), palette));
    //println("i3 is" + getIndex(get(left, bot), palette));
    //println("i3 is" + getIndex(get(right, bot), palette));
    //println("shift is" + shift);
    //println("newIndex is" + newIndex);
    //print(newIndex);
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
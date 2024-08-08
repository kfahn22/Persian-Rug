// p5.js implementation of Persian rug algorithm described in https://archive.bridgesmathart.org/2005/bridges2005-9.pdf

// I used this implementation in java as a reference:  https://stackoverflow.com/questions/26226531/persian-rug-recursion

// n > 6 the render is slow
// Reducing n or resolution will speed up render

//let n = 6;
let n = 4;
let sqLeft, sqTop, sqRight, sqBot;
let resolution = 10;
let w;
let iterations = 0;

function setup() {
  let rows = pow(2, n) + 1;
  let w = rows * resolution;
  createCanvas(w + 1, w + 1);
  colorMode(HSB);

  sqLeft = 1;
  sqTop = 1;
  sqRight = w;
  sqBot = w;

  let r = floor(random(1, 360));
  //fill(r);
  //strokeWeight(resolution);
  // I am getting a slight discrepency in RGB values for (right, bot)--The red value is off by 2.
  // I have dealt with this by changing strokeWeight to 2 for the initial border.
  //   console.log(get(left, top));
  //   console.log(get(right, top));
  //   console.log(get(left, bot));
  //   console.log(get(right, bot));
  noStroke();
  fill(r, 255, 255, 255);

  // Draw border
  // line(sqLeft, sqTop, sqRight, sqTop);
  // line(sqLeft, sqBot, sqRight, sqBot);
  // line(sqLeft, sqTop, sqLeft, sqBot);
  // line(sqRight, sqTop, sqRight, sqBot);
  //rect(0, 0, w, resolution)
  rect(resolution, 0, w - iterations * resolution, resolution);
  rect(w - resolution, 0, resolution, w);
  rect(0, 0, resolution, w);
  rect(resolution, w - resolution, w - iterations * resolution, resolution);
  
 chooseColor(sqLeft, sqRight, sqTop, sqBot, w, iterations);
}

function draw() {}

function chooseColor(left, right, top, bot, w, iterations) {
  let midcol, midrow;
  iterations += 1;
  if (left < right - 1) {
    midcol = int((left + right) / 2);
    midrow = int((top + bot) / 2);

    // Add lines in middle row and column
    push();
    //strokeWeight(1);
    let r = getRandomColor(left, right, top, bot, w);
    noStroke();
    fill(r, 255, 255, 255);
    rect(midrow - 0.5 * resolution, resolution, resolution, w - 2 * resolution);
    rect(resolution, midcol - 0.5 * resolution, w - 2 * resolution, resolution);
    // line(left + 1, midrow, right - 1, midrow);
    // line(midcol, top + 1, midcol, bot - 1);
    
    pop();

  //  if (iterations < floor(rows / 2)) {
      w = w / 2;
    chooseColor(left, midcol, top, midrow, w, iterations);
  //}

    // chooseColor(midcol, right, top, midrow, w);
    //chooseColor(left, midcol, midrow, bot, w);
    //chooseColor(midcol, right, midrow, bot, w);
  }
  
}

// When r = 300 get an boring pattern
// c0[0]=c1[0]=c2[0]=c3[0]=255
function getRandomColor(left, right, top, bot, w) {
  let r;

  let c0 = get(left, top);
  let c1 = get(right, top);
  let c2 = get(left, bot);
  let c3 = get(right, bot);
  //console.log(c0[0], c1[0], c2[0], c3[0]);
  let a = int(random(1, 12));
  // Take % 360 b/c we want values to stay in range of (0,360)
  r = floor((c0[0] + c1[0] + c2[0] + c3[0]) % 360);

  // I added a hack to exclude the case where r = 300 because it was consistently yielding a boring pattern.
  if (r != 300) {
    return r;
  } else {
    return r - 2;
  }
}

function mousePressed() {
  save("rug.jpg");
}

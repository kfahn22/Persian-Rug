// p5.js implementation of Persian rug algorithm described in https://archive.bridgesmathart.org/2005/bridges2005-9.pdf

// I used this implementation in java as a reference:  https://stackoverflow.com/questions/26226531/persian-rug-recursion

// n > 6 the render is slow
// Reducing n or resolution will speed up render

//let n = 6;
let n = 3;
let sqLeft, sqTop, sqRight, sqBot;
let size = 16;
let iterations  = 0;
let w, rows;

function setup() {
  rows = pow(2, n) + 1;
  w = rows*size;
 // let rows = ((w-1)/size) + 1;
  console.log(rows)
  createCanvas(w + 1, w + 1);
  colorMode(HSB);
  sqLeft = 1;
  sqTop = 1;
  sqRight = w;
  sqBot = w;

  let r = floor(random(1, 360));
  //stroke(r);
  // strokeWeight(2);
  noStroke();
  fill(r, 255, 255, 255);

  // Draw border
  rect(size, 0, w - iterations * size, size);
  rect(w - size, 0, size, w);
  rect(0, 0, size, w);
  rect(size, w - size, w - iterations * size, size);
  // // Draw border
  // line(sqLeft, sqTop, sqRight, sqTop);
  // line(sqLeft, sqBot, sqRight, sqBot);
  // line(sqLeft, sqTop, sqLeft, sqBot);
  // line(sqRight, sqTop, sqRight, sqBot);
  // shift
  // let shift = int(random(1, ncol));
  chooseColor(sqLeft, sqRight, sqTop, sqBot);
}

function draw() {}

function chooseColor(left, right, top, bot) {
  let midcol, midrow;
  
  if (left < right - 1) {
    midcol = int((left + right) / 2);
    midrow = int((top + bot) / 2);

    // Add lines in middle row and column
    push();
    //strokeWeight(1);
    let r = getRandomColor(left, right, top, bot);
    fill(r, 255, 255, 255);
    rect(midrow - 0.5 * size, size, size, (rows - 2) * size);
    rect(size, midcol - 0.5 * size, (rows-1) * size, size);
    
    // line(left + 1, midrow, right - 1, midrow);
    // line(midcol, top + 1, midcol, bot - 1);
    pop();
    
      rows = floor(rows/2);
      chooseColor(left, midcol, top, midrow);
    // chooseColor(midcol, right, top, midrow);
    // chooseColor(left, midcol, midrow, bot);
    // chooseColor(midcol, right, midrow, bot);
  }
}

// When r = 300 get an boring pattern
// c0[0]=c1[0]=c2[0]=c3[0]=255
function getRandomColor(left, right, top, bot) {
  let r;

  let c0 = get(left, top);
  let c1 = get(right, top);
  let c2 = get(left, bot);
  let c3 = get(right, bot);
  //console.log(c0[0], c1[0], c2[0], c3[0]);
  let a = int(random(1,12));
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

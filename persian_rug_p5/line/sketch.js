// https://stackoverflow.com/questions/26226531/persian-rug-recursion

let a = 1.0;
let n = 3;
let sqLeft, sqTop, sqRight, sqBot;
//let sqLeft = 0;
// pow(2, n)
//let sqRight = 340;
//let sqRight = 64
//let sqTop = 0;
//let sqBot = 64;
// let sqBot = 340;
let r, g, b;
let firstColor;
let backC;
let resolution = 40;

//color backC = color(35,95,28);

function setup() {
  let rows = pow(2, n) + 1;
  let w = rows * resolution;
  createCanvas(w, w);
  sqLeft = 0;
  sqTop = 0;
  sqRight = w - 1;
  sqBot = w - 1;

  //createCanvas(341, 341);
  r = floor(random(1, 255));
  g = floor(random(1, 255));
  b = floor(random(1, 255));
  firstColor = color(g);
  backC = color(255, 0, 0);
  background(backC);
  stroke(0, 0, 255);
  // Draw border
  line(sqLeft, sqTop, sqRight, sqTop);
  line(sqLeft, sqBot, sqRight, sqBot);
  line(sqLeft, sqTop, sqLeft, sqBot);
  line(sqRight, sqTop, sqRight, sqBot);
  a = int(random(1, 6));
  chooseColor(sqLeft, sqRight, sqTop, sqBot, a);
}

function draw() {}

function chooseColor(left, right, top, bot, a) {
  let midcol, midrow;
  let col;
  if (left < right - 1) {
    // col = floor(
    //   (get(left, top) + get(right, top) + get(left, bot) + get(right, bot)) / a
    // );
     col = floor(
       (get(left, top) + get(right, top) + get(left, bot) + get(right, bot) + shift) % ncol)
    ;
    //console.log(col)
    midcol = int((left + right) / 2);
    midrow = int((top + bot) / 2);
    //stroke(col);
    line(left + 1, midrow, right - 1, midrow);
    line(midcol, top + 1, midcol, bot - 1);

    chooseColor(left, midcol, top, midrow, a);
    chooseColor(midcol, right, top, midrow, a);
    chooseColor(left, midcol, midrow, bot, a);
    chooseColor(midcol, right, midrow, bot, a);
  }
}

function keyPressed() {
  setup();
}

function mousePressed() {
  save("rug.jpg");
}

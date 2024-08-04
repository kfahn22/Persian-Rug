// https://stackoverflow.com/questions/26226531/persian-rug-recursion

let a = 1.0;
let sqLeft = 0;
let sqRight = 340;
let sqTop = 0;
let sqBot = 340;
let r, g, b;
let firstColor;
let backC;

//color backC = color(35,95,28);

function setup() {
  //size(700, 700);
  createCanvas(341, 341);
  r = floor(random(1, 255));
  g = floor(random(1, 255));
  b = floor(random(1, 255));
  firstColor = color(g);
  backC = color(r, g, b);
  background(backC);
  stroke(firstColor);
  line(sqLeft, sqTop, sqRight, sqTop);
  line(sqLeft, sqBot, sqRight, sqBot);
  line(sqLeft, sqTop, sqLeft, sqBot);
  line(sqRight, sqTop, sqRight, sqBot);
  a = random(1, 6);
  chooseColor(sqLeft, sqRight, sqTop, sqBot, a);
}

function draw() {}

function chooseColor(sqLeft, sqRight, sqTop, sqBot, a) {
  let midcol, midrow;
  let col;
  //   left = int(left);
  //   right = int(right);
  //   top = int(top);
  //   bot = int(bot);
  //console.log(left);
  if (sqLeft < sqRight - 1) {
    col = floor(
      (get(sqLeft, sqTop) +
        get(sqRight, sqTop) +
        get(sqLeft, sqBot) +
        get(sqRight, sqBot)) /
        a
    );
    //console.log(col)
    midcol = int((sqLeft + sqRight) / 2);
    midrow = int((sqTop + sqBot) / 2);
    //stroke(col);
    line(sqLeft + 1, midrow, sqRight - 1, midrow);
    line(midcol, sqTop + 1, midcol, sqBot - 1);
    chooseColor(sqLeft, midcol, sqTop, midrow, a);
    chooseColor(midcol, sqRight, sqTop, midrow, a);
    chooseColor(sqLeft, midcol, midrow, sqBot, a);
    chooseColor(midcol, sqRight, midrow, sqBot, a);
  }
}

function keyPressed() {
  setup();
}

function mousePressed() {
  save("rug.jpg");
}

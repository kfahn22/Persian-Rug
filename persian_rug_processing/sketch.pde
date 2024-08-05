// Adapted from https://stackoverflow.com/questions/26226531/persian-rug-recursion

float a = 1.0;
int left = 0;
int right = 512;
int top = 0;
int bot = 512;
int r;

void setup()
{
  size(513, 513);
  colorMode(HSB, 255);
  r = floor(random(1,255));
  stroke(r, 255, 255); 
  line(left,top,right,top);
  line(left,bot,right,bot);
  line(left,top,left,bot);
  line(right,top,right,bot);
  float a = random(1,6);
  nextColor(left, right, top, bot, a);
  save("processing4.jpg");
}
 
void draw()
{}
 
void nextColor(int left, int right, int top, int bot, float a)
{
  int midcol, midrow;
  color col;
   
  if (left < (right-1))
     {
       col = floor((get(left, top) + get(right, top) + get(left, bot) + get(right, bot))/a);
       midcol = (left + right) / 2;
       midrow = (top + bot) / 2;
       stroke(col);
       line(left+1, midrow, right-1, midrow);
       line(midcol, top+1, midcol, bot-1);
       nextColor(left, midcol, top, midrow, a);
       nextColor(midcol, right, top, midrow, a);
       nextColor(left, midcol, midrow, bot, a);
       nextColor(midcol, right, midrow, bot, a);
     }
}

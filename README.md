# Persian Rug using Recursion

From [Wikipedia](https://en.wikipedia.org/wiki/Recursion):

> "Recursion is the process a procedure goes through when one of the steps of the procedure involves invoking the procedure itself."

To learn more about recusion, I highly recommend Daniel Shiffman's newly updated [The Nature of Code](https://natureofcode.com) book or his [Recursion Coding Challenge](https://thecodingtrain.com/challenges/77-recursion).

In [Recursion in Nature, Mathematics and Art](https://archive.bridgesmathart.org/2005/bridges2005-9.pdf), Anne Burns discusses using the mid-point algorithm to generate patterns that resemble Persian rugs. The essential idea is to draw a border around a square, and then draw lines connecting the midpoints of the opposite border in a new color which is a function of the colors, $x_i$, in the four corners of the square. This process was illustrated in Figure 10 of the paper.

<p align="center"><img src="assets/figure10.jpg" alt="Midpoint algorithm" width="800px"></p>

Figure 10 from _Recursion in Nature, Mathematics and Art_

The sketch is an adapted version of this [code](https://stackoverflow.com/questions/26226531/persian-rug-recursion). I have used a method suggested by Dr. Eric Gossett in [Persian Rugs](https://www.youtube.com/watch?v=0wfPlzPvZiQ) to compute the next color. In this approach, we select colors from a palette based on the index. We first initialize an empty array to hold the indexes.

```JavaScript
 colorIndexArray = Array(canvasSize)
    .fill()
    .map(() => Array(canvasSize).fill(0));
```

We draw a border using palette[0]. We then retrieve the palette index from the colorIndexArry and calculate then new index using the following formula, where shift is an integer to add more variation to the rug generation.

$f(x_1 + x_2 + x_3 + x_4) = (i_1 + i_2+ i_3 + i_4$ + shift) % palette.length

We use the newIndex to pick the color from the palette for the new middle lines.

```JavaScript
let col = palette[newIndex];
let midCol = floor((left + right) / 2);
let midRow = floor((top + bottom) / 2);

// Draw middle lines
stroke(col);
line(left + 1, midRow, right - 1, midRow); // Horizontal
line(midCol, top + 1, midCol, bottom - 1); // Vertical
```

We also pass the newIndex to the colorIndexArray and continue this process recursively.

```JavaScript
  colorIndexArray[midCol][midRow] = newIndex;
```

I have found that the best images are created from a palette with a large number of colors. Luckily, I found a really nice [website](https://supercolorpalette.com) where you can obtain palettes with 12 and more different colors.

You can play with the p5 sketch [here](https://editor.p5js.org/kfahn/sketches/sL1BsexS-). I also have a version that chooses colors randomly [here](https://editor.p5js.org/kfahn/sketches/RShw897BV). Assuming you have Processing downloaded, you can open the Processing sketch by downloading from [here](Processing-palette/sketch.pdez).

## Gallery

<!-- IMAGE-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
      <tr>
      <td align="center"><a href=""> <img class="img" src="assets/pink-purple1.jpg" alt="Rug with color palette" style="vertical-align:top;" width="600" /><br /><sub><b><br/></b></sub></a></td>
     <td align="center"><a href=""> <img class="img" src="assets/teal_red.jpg" alt="Rug with color palette" style=" display: block;
    margin-left: auto;
    margin-right: auto;" width="600" /><br /><sub><b><br/></b></sub></a></td>
</tr>
  <tr>
      <td align="center"><a href=""> <img class="img" src="assets/raspberry2.jpg" alt="Rug with color palette" style="vertical-align:top;" width="600" /><br /><sub><b><br/></b></sub></a></td>
     <td align="center"><a href=""> <img class="img" src="assets/purple_green.jpg" alt="Rug with color palette" style=" display: block;
    margin-left: auto;
    margin-right: auto;" width="600" /><br /><sub><b><br/></b></sub></a></td>
</tr>

 </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- IMAGE-LIST:END -->

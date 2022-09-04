# myPixels (p5.js)
Measurement of image compositional balance.

![image](https://user-images.githubusercontent.com/38255514/188309331-79eb915b-ba3c-4589-bffd-95c365c8cbe2.png)

This program sums the pixels of an image and calculates the median values for **lightness, detail, saturation**. Depending on the distribution of these values in the image, the program suggests cropping options to balance the composition.

🚀 [Run at GitHub](https://hayabuzo.github.io/myPixels/)

🏓 [Run at OpenProcessing](https://openprocessing.org/sketch/1638284)

## Settings

**Lightness calculation mode** — different options for calculating lightness, which will lead to different total balance values of light spots and image details.

**Balance / Histogram / Crop** — turn on/off visualisation for each value on the preview.

**Resolution** — the higher the resolution of the calculations, the more accurate the result, and the longer the processing.

**Preview Mode** — the channel that will be displayed in the preview window.

**Value - Amount - Balance** — amount of value (% of a completely white image) and balance relative to the geometric middle of the image ("+" is deviation to the right, "-" is to the left, % of image width).

**Processing** — options for crop according to the values and for saving.

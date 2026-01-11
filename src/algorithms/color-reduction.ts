import findClosestPaletteColor from "../functions/find-closest-palette-color.ts";
import type { Colors } from "../types.ts";
import { getPixel, setPixel } from "../utilities.ts";

export const colorReduction = (
  image: ImageData,
  { colors }: { colors: Colors },
): void => {
  let currentPixelIndex, newPixel, oldPixel;

  for (
    currentPixelIndex = 0;
    currentPixelIndex <= image.data.length;
    currentPixelIndex += 4
  ) {
    oldPixel = getPixel(image, currentPixelIndex);

    newPixel = findClosestPaletteColor(oldPixel, colors);
    setPixel(image, currentPixelIndex, newPixel);
  }
};

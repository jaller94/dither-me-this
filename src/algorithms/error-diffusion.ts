import findClosestPaletteColor from "../functions/find-closest-palette-color.ts";
import type { Color, Colors } from "../types.ts";
import { getPixel, setPixel } from "../utilities.ts";

function getQuantError(
  oldPixel: Color,
  newPixel: Color,
): [number, number, number, number] {
  return [
    oldPixel[0] - newPixel[0],
    oldPixel[1] - newPixel[1],
    oldPixel[2] - newPixel[2],
    oldPixel[3] - newPixel[3],
  ];
}

function addQuantError(
  pixel: Color,
  quantError: [number, number, number, number],
  diffusionFactor: number,
): Color {
  return [
    pixel[0] + (quantError[0] * diffusionFactor),
    pixel[1] + (quantError[1] * diffusionFactor),
    pixel[2] + (quantError[2] * diffusionFactor),
    pixel[3] + (quantError[3] * diffusionFactor),
  ];
}

type Diffusion = {
  offset: [number, number];
  factor: number;
};

type Options = {
  colors: Colors;
  diffusionMap: Diffusion[];
};

export const errorDiffusion = (
  image: ImageData,
  { colors, diffusionMap }: Options,
): void => {
  let currentPixelIndex: number,
    newPixel: Color,
    oldPixel: Color,
    quantError: [number, number, number, number];

  for (
    currentPixelIndex = 0;
    currentPixelIndex <= image.data.length;
    currentPixelIndex += 4
  ) {
    oldPixel = getPixel(image, currentPixelIndex);
    newPixel = findClosestPaletteColor(oldPixel, colors);
    setPixel(image, currentPixelIndex, newPixel);
    quantError = getQuantError(oldPixel, newPixel);

    diffusionMap.forEach((diffusion) => {
      const pixelOffset = (diffusion.offset[0] * 4) +
        (diffusion.offset[1] * 4 * image.width);
      const pixelIndex = currentPixelIndex + pixelOffset;
      if (image.data[pixelIndex] === undefined) { // Check if pixel exists e.g. on the edges
        return;
      }
      const errorPixel = addQuantError(
        getPixel(image, pixelIndex),
        quantError,
        diffusion.factor,
      );
      setPixel(image, pixelIndex, errorPixel);
    });
  }
};

import bayerMatrix from "../functions/bayer-matrix.ts";
import findClosestPaletteColor from "../functions/find-closest-palette-color.ts";
import { getPixel, setPixel } from "../utilities.ts";
import type { Color, Colors } from "../types.ts";

const orderedDitherPixelValue = (
  pixel: Color,
  coordinates: [number, number],
  thresholdMap: Readonly<Readonly<number[]>[]>,
  threshold: number,
): Color => {
  const factor = thresholdMap[coordinates[1] % thresholdMap.length][
    coordinates[0] % thresholdMap[0].length
  ] / (thresholdMap.length * thresholdMap[0].length);
  return [
    pixel[0] + (factor * threshold),
    pixel[1] + (factor * threshold),
    pixel[2] + (factor * threshold),
    pixel[3], // TODO Should alpha be considered?
  ];
};

const pixelXY = (index: number, width: number): [number, number] => {
  return [index % width, Math.floor(index / width)];
};

type Options = {
  colors: Colors;
  orderedDitheringMatrix?: [number, number];
};

export const ordered = (
  image: ImageData,
  { colors, orderedDitheringMatrix }: Options,
): void => {
  const thresholdMap = bayerMatrix([
    orderedDitheringMatrix?.[0] ?? 4,
    orderedDitheringMatrix?.[1] ?? 4,
  ]);

  let currentPixelIndex, newPixel, oldPixel;

  const orderedDitherThreshold = 256 / 4;

  for (
    currentPixelIndex = 0;
    currentPixelIndex <= image.data.length;
    currentPixelIndex += 4
  ) {
    oldPixel = getPixel(image, currentPixelIndex);
    newPixel = orderedDitherPixelValue(
      oldPixel,
      pixelXY(currentPixelIndex / 4, image.width),
      thresholdMap,
      orderedDitherThreshold,
    );
    newPixel = findClosestPaletteColor(newPixel, colors);
    setPixel(image, currentPixelIndex, newPixel);
  }
};

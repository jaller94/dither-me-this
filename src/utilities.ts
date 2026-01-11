import type { Color } from "./types.ts";

export const setPixel = (
  image: ImageData,
  pixelIndex: number,
  pixel: Color,
): void => {
  image.data[pixelIndex] = pixel[0];
  image.data[pixelIndex + 1] = pixel[1];
  image.data[pixelIndex + 2] = pixel[2];
  image.data[pixelIndex + 3] = pixel[3];
};

export const getPixel = (image: ImageData, pixelIndex: number): Color => {
  const data = image.data;
  return [
    data[pixelIndex],
    data[pixelIndex + 1],
    data[pixelIndex + 2],
    data[pixelIndex + 3],
  ];
};

export const randomInteger = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

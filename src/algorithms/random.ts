import { getPixel, randomInteger, setPixel } from "../utilities.ts";

const WHITE = [255, 255, 255, 255] as const;
const BLACK = [0, 0, 0, 255] as const;

export const random = (image: ImageData): void => {
  for (
    let currentPixelIndex = 0;
    currentPixelIndex <= image.data.length;
    currentPixelIndex += 4
  ) {
    const oldPixel = getPixel(image, currentPixelIndex);
    const averageRGB = (oldPixel[0] + oldPixel[1] + oldPixel[2]) / 3;
    const newPixel = averageRGB < randomInteger(0, 255) ? BLACK : WHITE;

    setPixel(image, currentPixelIndex, newPixel);
  }
};

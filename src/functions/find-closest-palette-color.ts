import type { Color, Colors } from "../types.ts";

const findClosestPaletteColor = (pixel: Color, colorPalette: Colors): Color => {
  let closestColor = colorPalette[0];
  let closestDistance = distanceInColorSpace(closestColor, pixel);

  for (const color of colorPalette.slice(1)) {
    const distance = distanceInColorSpace(color, pixel);
    if (distance < closestDistance) {
      closestColor = color;
      closestDistance = distance;
    }
  }

  return closestColor;
};

// Currently ignores alpha
const distanceInColorSpace = (color1: Color, color2: Color): number => {
  // Luminosity needs to be accounted for, for better results.
  // var lumR = .2126,
  //     lumG = .7152,
  //     lumB = .0722

  // const max = 255

  // const averageMax = Math.sqrt(lumR * max * max + lumG * max * max + lumB * max * max) // I Dont understand this

  const r = color1[0] - color2[0];
  const g = color1[1] - color2[1];
  const b = color1[2] - color2[2];

  const distance = Math.sqrt(r * r + g * g + b * b);
  return distance;
};

export default findClosestPaletteColor;

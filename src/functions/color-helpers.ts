import type { Color } from "../types.ts";

export const hexToRgb = (hex: string): Color | null => {
  if (typeof hex !== "string") return hex;

  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])([a-f\d])?$/i;
  hex = hex.replace(shorthandRegex, (_m, r, g, b, a) => {
    return r + r + g + g + b + b + (a ? a + a : "ff");
  });

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i.exec(
    hex,
  );
  return result
    ? [
      parseInt(result[1], 16),
      parseInt(result[2], 16),
      parseInt(result[3], 16),
      result[4] ? parseInt(result[4], 16) : 255,
    ]
    : null;
};

import { assertEquals } from "@std/assert";
import { hexToRgb } from "./color-helpers.ts";

Deno.test("hexToRgb - 3 characters", () => {
  assertEquals(hexToRgb("#000"), [0, 0, 0, 255]);
  assertEquals(hexToRgb("#f00"), [255, 0, 0, 255]);
  assertEquals(hexToRgb("#567"), [85, 102, 119, 255]);
  assertEquals(hexToRgb("#888"), [136, 136, 136, 255]);
});

Deno.test("hexToRgb - 4 characters", () => {
  assertEquals(hexToRgb("#0000"), [0, 0, 0, 0]);
  assertEquals(hexToRgb("#f00f"), [255, 0, 0, 255]);
  assertEquals(hexToRgb("#8888"), [136, 136, 136, 136]);
});

Deno.test("hexToRgb - 6 characters", () => {
  assertEquals(hexToRgb("#000000"), [0, 0, 0, 255]);
  assertEquals(hexToRgb("#ff0000"), [255, 0, 0, 255]);
  assertEquals(hexToRgb("#888888"), [136, 136, 136, 255]);
});

Deno.test("hexToRgb - 8 characters", () => {
  assertEquals(hexToRgb("#000000ff"), [0, 0, 0, 255]);
  assertEquals(hexToRgb("#ff0000ff"), [255, 0, 0, 255]);
  assertEquals(hexToRgb("#88888888"), [136, 136, 136, 136]);
});

Deno.test("hexToRgb - invalid", () => {
  assertEquals(hexToRgb("#f0"), null);
  assertEquals(hexToRgb("#00000"), null);
  assertEquals(hexToRgb("#888888888"), null);
  assertEquals(hexToRgb("#zzz"), null);
  assertEquals(hexToRgb("#ggg"), null);
  assertEquals(hexToRgb("zzzzzzz"), null);
});

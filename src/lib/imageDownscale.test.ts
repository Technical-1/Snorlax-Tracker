import { describe, it, expect, vi } from "vitest";
import { fitDimensions, downscaleImage } from "./imageDownscale";

describe("fitDimensions", () => {
  it("clamps the long edge, preserves aspect ratio, rounds", () => {
    expect(fitDimensions(1200, 600, 600)).toEqual({ w: 600, h: 300 });
    expect(fitDimensions(600, 1200, 600)).toEqual({ w: 300, h: 600 });
  });
  it("never upscales", () => {
    expect(fitDimensions(100, 50, 600)).toEqual({ w: 100, h: 50 });
  });
});

describe("downscaleImage", () => {
  it("loads the file, fits to maxEdge, returns the encoder's data URL", async () => {
    const render = vi.fn(async (_file: File, w: number, h: number) => `data:image/webp;base64,WxH=${w}x${h}`);
    const file = new File([new Uint8Array([1])], "x.png", { type: "image/png" });
    const loadSize = async () => ({ width: 1200, height: 300 });
    const out = await downscaleImage(file, { maxEdge: 600, quality: 0.8, loadSize, render });
    expect(loadSize).toBeDefined();
    expect(render).toHaveBeenCalledWith(file, 600, 150);
    expect(out).toBe("data:image/webp;base64,WxH=600x150");
  });
  it("rejects a non-image file", async () => {
    const file = new File([new Uint8Array([1])], "x.txt", { type: "text/plain" });
    await expect(downscaleImage(file, {})).rejects.toThrow(/not an image/i);
  });
});

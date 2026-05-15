export function fitDimensions(
  w: number,
  h: number,
  maxEdge: number
): { w: number; h: number } {
  const long = Math.max(w, h);
  if (long <= maxEdge) return { w, h };
  const scale = maxEdge / long;
  return { w: Math.round(w * scale), h: Math.round(h * scale) };
}

export type DownscaleOpts = {
  maxEdge?: number;
  quality?: number;
  loadSize?: (file: File) => Promise<{ width: number; height: number }>;
  render?: (file: File, w: number, h: number) => Promise<string>;
};

function defaultLoadSize(file: File): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("could not decode image"));
    };
    img.src = url;
  });
}

function defaultRender(file: File, w: number, h: number): Promise<string> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");
      if (!ctx) return reject(new Error("no canvas context"));
      ctx.drawImage(img, 0, 0, w, h);
      resolve(canvas.toDataURL("image/webp", 0.8));
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("could not decode image"));
    };
    img.src = url;
  });
}

export async function downscaleImage(
  file: File,
  opts: DownscaleOpts
): Promise<string> {
  if (!file.type.startsWith("image/")) {
    throw new Error("file is not an image");
  }
  const maxEdge = opts.maxEdge ?? 600;
  const loadSize = opts.loadSize ?? defaultLoadSize;
  const render = opts.render ?? defaultRender;
  const { width, height } = await loadSize(file);
  const { w, h } = fitDimensions(width, height, maxEdge);
  return render(file, w, h);
}

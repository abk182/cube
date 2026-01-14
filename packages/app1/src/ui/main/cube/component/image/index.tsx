import React, { useEffect, useRef } from "react";

export const Image = ({
  height,
  width,
  data,
  transparentWhite = true,
}: {
  height: number;
  width: number;
  data: Uint8Array;
  transparentWhite?: boolean;
}) => {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (canvas) {
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");

      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let img = ctx.getImageData(0, 0, width, height);
        let pixels = img.data;
        let imageIndex = 0;

        for (var i = 0; i < data.length; i += 3) {
          const r = +data[i];
          const g = +data[i + 1];
          const b = +data[i + 2];
          const a =
            transparentWhite && r === 255 && g === 255 && b === 255 ? 0 : 255;

          pixels[imageIndex++] = r;
          pixels[imageIndex++] = g;
          pixels[imageIndex++] = b;
          pixels[imageIndex++] = a;
        }
        ctx.putImageData(img, 0, 0);
      }
    }
  }, [height, width, data]);

  return <canvas ref={ref} />;
};

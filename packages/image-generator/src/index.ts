import { useEffect, useRef, useState } from "react";

export const loadWasmModule: () => Promise<
  typeof import("wasm")
> = async () => {
  console.log("Loading wasm module...");
  const wasm = await import("wasm");
  console.log("Wasm module loaded!");
  return wasm;
};

export const useImageAsUnit8Array = (
  width: number,
  height: number,
  x: number,
  y: number,
  z: number,
) => {
  const [state, setState] = useState<Uint8Array>();
  const wasmRef = useRef<Awaited<ReturnType<typeof loadWasmModule>> | null>(
    null,
  );

  useEffect(() => {
    loadWasmModule().then((m) => {
      wasmRef.current = m;
      setState(wasmRef.current.draw_cube(width, height, x, y, z));
    });
  }, []);

  useEffect(() => {
    if (wasmRef.current != null) {
      setState(wasmRef.current.draw_cube(width, height, x, y, z));
    }
  }, [width, height, x, y, z]);

  return state;
};

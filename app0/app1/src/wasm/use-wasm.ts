import { useEffect, useRef, useState } from "react";
import { sleep } from "../utils/sleep";

export const useWasm = () => {
  const [wasmReady, setWasmReady] = useState(false);
  const wasmRef = useRef<typeof import("wasm") | null>(null);
  useEffect(() => {
    sleep().then(() =>
      import("wasm").then((m) => {
        wasmRef.current = m;
        setWasmReady(true);
      })
    );
  }, []);

  if (wasmReady) {
    return wasmRef.current;
  }

  return null;
};

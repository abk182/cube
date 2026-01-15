import { useEffect, useRef, useState } from "react";
import { sleep } from "../utils/sleep";
import { imageGenerator } from '@cube/image-generator';

export const useWasm = () => {
  const [wasmReady, setWasmReady] = useState(false);
  const wasmRef = useRef<Awaited<ReturnType<typeof imageGenerator>> | null>(null);
  useEffect(() => {
    sleep().then(() =>
      imageGenerator().then((m) => {
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

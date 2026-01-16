export const loadWasmModule: () => Promise<
  typeof import("wasm")
> = async () => {
  console.log("Loading wasm module...");
  const wasm = await import("wasm");
  console.log("Wasm module loaded!");
  return wasm;
};

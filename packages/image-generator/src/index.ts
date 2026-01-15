export const loadWasmModule = async () => {
  console.log("Loading wasm module...");
  const wasm = await import("wasm");
  console.log("Wasm module loaded!");
  return wasm;
};

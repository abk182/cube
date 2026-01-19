/**
 * Loader for server build: if file contains `"use client"`, replace it with
 * re-exports from a stub component, preventing client-only code from entering
 * the Node bundle.
 */
module.exports = function useClientServerStubLoader(source) {
  const options = this.getOptions();
  const stubPath = options.stubPath;

  // Do not touch the stub itself.
  if (this.resourcePath && this.resourcePath === stubPath) {
    return source;
  }

  if (!/['"]use client['"]/.test(source)) {
    return source;
  }

  const importPath = stubPath.replace(/\.(tsx?|jsx?)$/, "");

  // Keep module shape simple: forward default and star exports to stub.
  return `
    export { default } from ${JSON.stringify(importPath)};
    export * from ${JSON.stringify(importPath)};
  `;
};



const fs = require("fs");
const path = require("path");

/**
 * If a module contains `"use client"` directive, replace it with a server stub.
 * Works even when the import is extension-less (e.g., `import("../component")`).
 */
class UseClientServerStubPlugin {
  constructor(options) {
    this.stubPath = options.stubPath;
  }

  apply(compiler) {
    const stubPath = this.stubPath;
    compiler.hooks.normalModuleFactory.tap(
      "UseClientServerStubPlugin",
      (nmf) => {
        nmf.hooks.afterResolve.tap(
          "UseClientServerStubPlugin",
          (resolveData) => {
            if (!resolveData || !resolveData.resource) return;

            const filePath = resolveData.resource.split("?")[0];
            if (
              !filePath.endsWith(".ts") &&
              !filePath.endsWith(".tsx") &&
              !filePath.endsWith(".js") &&
              !filePath.endsWith(".jsx")
            ) {
              return;
            }
            if (filePath.includes("node_modules")) return;
            if (!fs.existsSync(filePath)) return;
            if (path.resolve(filePath) === path.resolve(stubPath)) return;

            const src = fs.readFileSync(filePath, "utf8");
            if (/['"]use client['"]/.test(src)) {
              // Swap to the stub for server build.
              resolveData.request = stubPath;
              resolveData.resource = stubPath;
            }
          },
        );
      },
    );
  }
}

module.exports = { UseClientServerStubPlugin };



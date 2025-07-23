import { defineConfig } from "@rsbuild/core";
import { clientBundleName, rootDomNodeId, staticFilesFolderName } from "./config";

export default defineConfig({
  plugins: [],
  environments: {
    // Configure the web environment for browsers
    web: {
      source: {
        entry: {
          index: "./src/client/index.tsx",
        },
      },
      output: {
        // Use 'web' target for the browser outputs
        target: "web",
        filename: {
          js: `${clientBundleName}.js`,
          css: `${clientBundleName}.css`,
        },
        distPath: {
          root: "dist",
          js: `${staticFilesFolderName}`,
          css: `${staticFilesFolderName}`,
        },
        manifest: true
      },
      html: {
        mountId: rootDomNodeId,
      },
      performance: { chunkSplit: { strategy: "all-in-one" } },
    },
    // Configure the node environment for SSR
    node: {
      source: {
        entry: {
          index: "./src/server/index.ts",
        },
      },
      output: {
        // Use 'node' target for the Node.js outputs
        target: "node",
      },
    },
  },
});

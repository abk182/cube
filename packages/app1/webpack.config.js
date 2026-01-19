const path = require("path");
const { ModuleFederationPlugin } = require("@module-federation/enhanced/webpack");
const useClientServerStubLoader = path.resolve(
  __dirname,
  "webpack.use-client-stub-loader.js",
);
const mfConfig = require("./module-federation.config");

const baseConfig = {
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: "ts-loader",
        include: path.resolve(__dirname, "src"),
      },
      {
        test: /\.css$/,
        exclude: /\.global\.css$/,
        use: [
          { loader: "style-loader" },
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[name]_[local]_[hash:base64]",
              },
            },
          },
          { loader: "postcss-loader" },
        ],
        include: path.resolve(__dirname, "src"),
      },
      {
        test: /\.global\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
        include: path.resolve(__dirname, "src"),
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  experiments: {
    asyncWebAssembly: true,
  },
};

const serverConfig = {
  ...baseConfig,
  target: "node",
  entry: "./src/server/index.tsx",
  output: {
    filename: "server.js",
    path: path.resolve(__dirname, "dist"),
  },
  optimization: {
    // Ensure server build stays a single file even if the UI contains `import()`
    splitChunks: false,
    runtimeChunk: false,
  },
  module: {
    ...baseConfig.module,
    rules: [
      {
        // Strip client-only modules from SSR based on "use client" directive
        test: /\.(ts|tsx|js|jsx)$/,
        enforce: "pre",
        exclude: /node_modules/,
        use: [
          {
            loader: useClientServerStubLoader,
            options: {
              stubPath: path.resolve(
                __dirname,
                "src/utils/lazy-load-on-client/useClientServerStub.tsx",
              ),
            },
          },
        ],
      },
      ...(baseConfig.module?.rules || []),
    ],
    parser: {
      javascript: {
        // Bundle dynamic imports into the same chunk for Node build
        dynamicImportMode: "eager",
      },
    },
  },
};

const clientConfig = {
  ...baseConfig,
  target: "web",
  entry: "./src/client/index.tsx",
  output: {
    filename: "client.js",
    path: path.resolve(__dirname, "dist"),
  },
};

const remoteUiConfig = {
  ...baseConfig,
  target: "web",
  entry: "./src/ui/index.tsx",
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist/ui"),
  },
  plugins: [new ModuleFederationPlugin(mfConfig)],
};

module.exports = [serverConfig, clientConfig, remoteUiConfig];

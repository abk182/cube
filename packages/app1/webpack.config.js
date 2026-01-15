const path = require("path");
const {
  ModuleFederationPlugin,
} = require("@module-federation/enhanced/webpack");
const mfConfig = require("./module-federation.config");

const config = {
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

const serverConfig = Object.assign(
  {
    target: "node",
    entry: "./src/server/index.tsx",
    output: {
      filename: "server.js",
      path: path.resolve(__dirname, "dist"),
    },
  },
  config
);

const clientConfig = Object.assign(
  {
    target: "web",
    entry: "./src/client/index.tsx",
    output: {
      filename: "client.js",
      path: path.resolve(__dirname, "dist"),
    },
  },
  config
);

const remoteUiConfig = Object.assign(
  {
    target: "web",
    entry: "./src/ui/index.tsx",
    output: {
      filename: "[name].js",
      path: path.resolve(__dirname, "dist/ui"),
    },
    plugins: [new ModuleFederationPlugin(mfConfig)],
  },
  config
);

module.exports = [
  serverConfig,
  clientConfig,
  remoteUiConfig,
];

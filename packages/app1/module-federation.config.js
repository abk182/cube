module.exports = {
  name: 'remote',
  exposes: {
    "./Ui": "./src/ui/index.tsx",
  },
  filename: 'remoteEntry.js',
  shared: {
    react: {
      singleton: true,
    },
    "react-dom": {
      singleton: true,
    },
  },
};

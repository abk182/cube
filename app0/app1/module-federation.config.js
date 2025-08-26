module.exports = {
  name: 'remote',
  exposes: {
    "./Button": "./src/ui/Button/index.tsx",
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

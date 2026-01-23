module.exports = function useClientServerStubLoader(source) {
  if (!/['"]use client['"]/.test(source)) {
    return source;
  }

  return `
    export default () => null
  `;
};



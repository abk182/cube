const getRandomArbitrary = (min: number, max: number) =>
  Math.random() * (max - min) + min;

export const sleep = (ms?: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms || getRandomArbitrary(1000, 3000));
  });
};

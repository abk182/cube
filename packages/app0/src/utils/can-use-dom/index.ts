export const canUseDom = () => {
  try {
    if (
      typeof window !== "undefined" &&
      window.document &&
      // @ts-ignore
      window.document.createElement
    ) {
      return true;
    }
    return false;
  } catch {
    return false;
  }
};

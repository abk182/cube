export const canUseDom = () => {
  try {
    if (
      typeof window !== "undefined" &&
      window.document &&
      window.document['createElement']
    ) {
      return true;
    }
    return false;
  } catch {
    return false;
  }
};

export function createTravelIterator(items: string[]) {
  let index = 0;
  return {
    next() {
      if (!items || items.length === 0) return { done: true, value: null };
      const value = items[index % items.length];
      index += 1;
      return { done: false, value };
    },
    reset() {
      index = 0;
    },
  };
}

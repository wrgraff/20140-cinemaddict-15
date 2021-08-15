export const splitToChunks = (items, size) => (
  items.reduce((result, item, i) => {
    if (i % size === 0) {
      return [...result, [item]];
    }

    return [...result.slice(0, -1), [...result.slice(-1)[0], item]];
  }, [])
);

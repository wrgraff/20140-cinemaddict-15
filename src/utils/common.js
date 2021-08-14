export const chunk = (input, size) => (
  input.reduce((result, item, i) => {
    if (i % size === 0) {
      return [...result, [item]];
    } else {
      return [...result.slice(0, -1), [...result.slice(-1)[0], item]];
    }
  }, [])
);

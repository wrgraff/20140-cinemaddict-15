export const sortByRating = (items) => (
  items.slice().sort((a, b) => b.rating - a.rating)
);

export const sortByComments = (items) => (
  items.slice().sort((a, b) => b.comments.length - a.comments.length)
);

export const sortByDate = (items) => (
  items.slice().sort((a, b) => b.release - a.release)
);

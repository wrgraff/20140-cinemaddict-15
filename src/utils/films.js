export const getFilmsByRating = ( items ) => (
  items.sort((a, b) => b.rating - a.rating)
);

export const getFilmsByComments = ( items ) => (
  items.sort((a, b) => b.comments.length - a.comments.length)
);

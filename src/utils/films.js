import dayjs from 'dayjs';

export const sortByRating = (items) => (
  items.sort((a, b) => b.rating - a.rating)
);

export const sortByComments = (items) => (
  items.sort((a, b) => b.comments.length - a.comments.length)
);

export const sortByDate = (items) => (
  items.sort((a, b) => dayjs(b.release).diff(dayjs(a.release)))
);

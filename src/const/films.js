export const SortingMethods = {
  BY_RATING: (a, b) => b.rating - a.rating,
  BY_COMMENT: (a, b) => b.comments.length - a.comments.length,
};

export const FILM_LIST_DATA = [
  {
    title: 'All movies. Upcoming',
    amount: 5,
    isExtra: false,
  },
  {
    title: 'Top rated',
    amount: 2,
    isExtra: true,
    sortingMethod: SortingMethods.BY_RATING,
  },
  {
    title: 'Most commented',
    amount: 2,
    isExtra: true,
    sortingMethod: SortingMethods.BY_COMMENT,
  },
];

export const MPA_VS_AGE = new Map([
  ['G', '0+'],
  ['PG', '0+'],
  ['PG-13', '14+'],
  ['R', '18+'],
  ['NC-17', '18+'],
]);

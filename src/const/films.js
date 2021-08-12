export const SortingMethod = {
  BY_RATING: (a, b) => b.rating - a.rating,
  BY_COMMENT: (a, b) => b.comments.length - a.comments.length,
};

export const FILM_LIST_DATA = [
  {
    title: 'All movies. Upcoming',
    isTitleHidden: true,
    amount: 5,
    isExtra: false,
  },
  {
    title: 'Top rated',
    isTitleHidden: false,
    amount: 2,
    isExtra: true,
    sortingMethod: SortingMethod.BY_RATING,
  },
  {
    title: 'Most commented',
    isTitleHidden: false,
    amount: 2,
    isExtra: true,
    sortingMethod: SortingMethod.BY_COMMENT,
  },
];

export const DESCRIPTION_MAX_LENGTH = 140;

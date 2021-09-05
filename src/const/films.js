export const FilmListType = {
  DEFAULT: 'default',
  RATING: 'rating',
  COMMENTS: 'comments',
};

const FilmListTitle = {
  DEFAULT: 'All movies. Upcoming',
  RATING: 'Top rated',
  COMMENTS: 'Most commented',
  EMPTY: 'There are no movies in our database',
  EMPTY_WATCH_LIST: 'There are no movies to watch now',
  EMPTY_HISTORY: 'There are no watched movies now',
  EMPTY_FAVORITES: 'There are no favorite movies now',
};

const FilmListStepAmount = {
  DEFAULT: 5,
  EXTRA: 2,
};

export const SortType = {
  DEFAULT: 'default',
  DATE: 'date',
  RATING: 'rating',
  COMMENTS: 'comments',
};

export const DESCRIPTION_MAX_LENGTH = 140;

export const DefaultListSetting = {
  TYPE: FilmListType.DEFAULT,
  TITLE: FilmListTitle.DEFAULT,
  SORT_TYPE: SortType.DEFAULT,
  STEP_AMOUNT: FilmListStepAmount.DEFAULT,
  MAX_COUNT: 0,
};

export const RatingListSetting = {
  TYPE: FilmListType.RATING,
  TITLE: FilmListTitle.RATING,
  SORT_TYPE: SortType.RATING,
  STEP_AMOUNT: FilmListStepAmount.EXTRA,
  MAX_COUNT: FilmListStepAmount.EXTRA,
};

export const CommentsListSetting = {
  TYPE: FilmListType.COMMENTS,
  TITLE: FilmListTitle.COMMENTS,
  SORT_TYPE: SortType.COMMENTS,
  STEP_AMOUNT: FilmListStepAmount.EXTRA,
  MAX_COUNT: FilmListStepAmount.EXTRA,
};

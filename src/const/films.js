export const Type = {
  DEFAULT: 'default',
  RATING: 'rating',
  COMMENTS: 'comments',
};

export const Title = {
  DEFAULT: 'All movies. Upcoming',
  RATING: 'Top rated',
  COMMENTS: 'Most commented',
  EMPTY: 'There are no movies in our database',
  EMPTY_WATCH_LIST: 'There are no movies to watch now',
  EMPTY_HISTORY: 'There are no watched movies now',
  EMPTY_FAVORITES: 'There are no favorite movies now',
};

export const StepAmount = {
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
  TYPE: Type.DEFAULT,
  TITLE: Title.DEFAULT,
  SORT_TYPE: SortType.DEFAULT,
  STEP_AMOUNT: StepAmount.DEFAULT,
  MAX_COUNT: 0,
};

export const RatingListSetting = {
  TYPE: Type.RATING,
  TITLE: Title.RATING,
  SORT_TYPE: SortType.RATING,
  STEP_AMOUNT: StepAmount.EXTRA,
  MAX_COUNT: StepAmount.EXTRA,
};

export const CommentsListSetting = {
  TYPE: Type.COMMENTS,
  TITLE: Title.COMMENTS,
  SORT_TYPE: SortType.COMMENTS,
  STEP_AMOUNT: StepAmount.EXTRA,
  MAX_COUNT: StepAmount.EXTRA,
};

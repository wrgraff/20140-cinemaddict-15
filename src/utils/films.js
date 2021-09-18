import { UserAction, FilterType } from '@const/common.js';

export const sortByRating = (items) => (
  items.slice().sort((a, b) => b.rating - a.rating)
);

export const sortByComments = (items) => (
  items.slice().sort((a, b) => b.comments.length - a.comments.length)
);

export const sortByDate = (items) => (
  items.slice().sort((a, b) => b.release - a.release)
);

export const getWatchedAmount = (films) => films.reduce( (amount, { isWatched }) => (isWatched ? amount++ : amount), 0);

export const filmsToData = (films) => (
  films.map((film) => (Object.assign(
    {},
    film,
    {
      rating: film.rating.toFixed(1),
      release: new Date(film.release),
      runtime: parseInt(film.runtime, 10),
      watchedDate: new Date(film.watchedDate),
    },
  )))
);

export const actionTypeToFilterType = {
  [UserAction.UPDATE_WATCHED]: FilterType.HISTORY,
  [UserAction.UPDATE_FAVORITE]: FilterType.FAVORITES,
  [UserAction.UPDATE_WATCHLIST]: FilterType.WATCHLIST,
};

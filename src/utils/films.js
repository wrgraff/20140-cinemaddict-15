import { UserAction, FilterType } from '@const/common.js';
import { FilmListTitle } from '@const/films.js';

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

export const parseFilmsToData = (films) => (
  films.map((film) => (Object.assign(
    {},
    film,
    {
      rating: film.rating.toFixed(1),
      release: new Date(film.release),
      watchedDate: new Date(film.watchedDate),
    },
  )))
);

export const actionTypeToFilterType = {
  [UserAction.UPDATE_WATCHED]: FilterType.HISTORY,
  [UserAction.UPDATE_FAVORITE]: FilterType.FAVORITES,
  [UserAction.UPDATE_WATCHLIST]: FilterType.WATCHLIST,
};

export const filterTypeToFilmListTitle = {
  [FilterType.HISTORY]: FilmListTitle.EMPTY_HISTORY,
  [FilterType.FAVORITES]: FilmListTitle.EMPTY_FAVORITES,
  [FilterType.WATCHLIST]: FilmListTitle.EMPTY_WATCHLIST,
};

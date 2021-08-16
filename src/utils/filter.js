const countFilters = (counter, film) => {
  counter.watchlist = film.isInWatchlist ? ++counter.watchlist : counter.watchlist;
  counter.history = film.isWatched ? ++counter.history : counter.history;
  counter.favorites = film.isFavorite ? ++counter.favorites : counter.favorites;
  return counter;
};

export const getFilters = (films) => (
  films.reduce(countFilters, {
    watchlist: 0,
    history: 0,
    favorites: 0,
  })
);

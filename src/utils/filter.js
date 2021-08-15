const countFilters = (accumulator, film) => ({
  watchlist: film.isInWatchlist ? ++accumulator.watchlist : accumulator.watchlist,
  history: film.isWatched ? ++accumulator.history : accumulator.history,
  favorites: film.isFavorite ? ++accumulator.favorites : accumulator.favorites,
});

export const getFilters = (films) => (
  films.reduce(countFilters, {
    watchlist: 0,
    history: 0,
    favorites: 0,
  })
);

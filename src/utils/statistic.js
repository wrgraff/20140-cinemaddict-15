const getWatchedFilms = (films) => (
  films.filter(({ isWatched }) => isWatched)
);

const getGenreAmounts = (films) => (
  films.reduce((genreAmounts, { genres }) => {
    genres.forEach((genre) => {
      if (genreAmounts[genre]) {
        genreAmounts[genre]++;
      } else {
        genreAmounts[genre] = 1;
      }
    });
    return genreAmounts;
  }, {})
);

const getTopGenre = (watchedFilms) => {
  if (!watchedFilms.length) {
    return;
  }

  const genreAmounts = getGenreAmounts(watchedFilms);

  return Object.entries(genreAmounts).reduce((currentGenre, genre) => (
    currentGenre[1] >= genre[1] ? currentGenre : genre
  ))[0];
};

const getTotalRuntime = (films) => (
  films.reduce((accumulator, { runtime }) => (
    accumulator += runtime
  ), 0)
);

export const getStatistic = (films) => {
  const watchedFilms = getWatchedFilms(films);

  return {
    amount: watchedFilms.length,
    runtime: getTotalRuntime(watchedFilms),
    topGenre: getTopGenre(watchedFilms),
  };
};

const getWatchedFilms = ( films ) => (
  films.filter(({ isWatched }) => isWatched)
);

const getGenreCounters = ( films ) => (
  films.reduce(( accumulator, { genres } ) => {
    genres.forEach(( genre ) => {
      if (accumulator[genre]) {
        accumulator[genre]++;
      } else {
        accumulator[genre] = 1;
      }
    });
    return accumulator;
  }, {})
);

const getTopGenre = ( watchedFilms ) => {
  const genreCounters = getGenreCounters( watchedFilms );

  const topGenre = {
    name: null,
    count: null,
  };

  for (const [key, value] of Object.entries(genreCounters)) {
    if (topGenre.count < value) {
      topGenre.name = key;
      topGenre.count = value;
    }
  }

  return topGenre.name;
};

const getTotalRuntime = ( films ) => (
  films.reduce(( accumulator, { runtime } ) => (
    accumulator += runtime
  ), 0)
);

export const getStatistic = ( films ) => {
  const watchedFilms = getWatchedFilms( films );

  return {
    amount: watchedFilms.length,
    runtime: getTotalRuntime( watchedFilms ),
    topGenre: getTopGenre( watchedFilms ),
  };
};

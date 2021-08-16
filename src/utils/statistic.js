import { RANKS } from '@const/statistic.js';

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

  return Object.entries(genreAmounts).reduce((currentGenres, genres) => (
    currentGenres[1] >= genres[1] ? currentGenres : genres
  ))[0];
};

const getTotalRuntime = (films) => (
  films.reduce((allRuntime, { runtime }) => {
    allRuntime += runtime;
    return allRuntime;
  }, 0)
);

const calcTextRank = (amount) => {
  let textRank = '';

  for (const [key, value] of Object.entries(RANKS)) {
    if (amount > key) {
      textRank = value;
    }
  }

  return textRank;
};

export const getStatistic = (films) => {
  const watchedFilms = getWatchedFilms(films);

  return {
    amount: watchedFilms.length,
    rank: calcTextRank(watchedFilms.length),
    runtime: getTotalRuntime(watchedFilms),
    topGenre: getTopGenre(watchedFilms),
  };
};

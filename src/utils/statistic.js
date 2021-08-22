import { RANKS } from '@const/statistic.js';

export const calcTextRank = (amount) => {
  let textRank = '';

  for (const [key, value] of Object.entries(RANKS)) {
    if (amount > key) {
      textRank = value;
    }
  }

  return textRank;
};

export const getStatistic = (films) => (
  films.reduce((statistic, film) => {
    if (film.isWatched) {
      statistic.watched += 1;
      statistic.runtime += film.runtime;
      film.genres.forEach((genre) => (
        statistic.genres[genre]
          ? statistic.genres[genre] += 1
          : statistic.genres[genre] = 1
      ));
    }
    return statistic;
  }, {
    watched: 0,
    runtime: 0,
    genres: {},
  })
);

export const sortGenres = (genres) => (
  Object.entries(genres).sort( (a, b) => a[1] < b[1] )
);

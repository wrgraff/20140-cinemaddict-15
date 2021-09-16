import { RANK_TITLES } from '@const/statistic.js';

export const getRatingTitle = (value) => RANK_TITLES
  .find(({ rating }) => rating >= value).title || '';

export const getStatistic = (films) => (
  films.reduce((statistic, film) => {
    if (film.isWatched) {
      statistic.watched++;
      statistic.runtime += film.runtime;
      statistic.genres = film.genres.reduce((statisticGenres, genre) => {
        if (!statisticGenres[genre]) {
          statisticGenres[genre] = 1;
        } else {
          statisticGenres[genre]++;
        }
        return statisticGenres;
      }, statistic.genres);
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

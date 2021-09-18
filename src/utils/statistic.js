import { isToday, isWeekAgo, isMonthAgo, isYearAgo } from '@utils/common.js';
import { RANK_TITLES, StatisticFilter } from '@const/statistic.js';

const getWatchedAmount = (films) => films.filter( (film) => film.isWatched ).length;

export const getRankTitle = ( (films) => {
  const amount = getWatchedAmount(films);
  return RANK_TITLES.find(({ rating }) => rating >= amount).title || '';
});

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

export const filterTypeToFilms = {
  [StatisticFilter.ALL_TIME]: (films) => films.slice(),
  [StatisticFilter.TODAY]: (films) => films.filter((film) => isToday(film.watchedDate)),
  [StatisticFilter.WEEK]: (films) => films.filter((film) => isWeekAgo(film.watchedDate)),
  [StatisticFilter.MONTH]: (films) => films.filter((film) => isMonthAgo(film.watchedDate)),
  [StatisticFilter.YEAR]: (films) => films.filter((film) => isYearAgo(film.watchedDate)),
};

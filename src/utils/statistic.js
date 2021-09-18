import { isTodayDate, isWeekAgoDate, isMonthAgoDate, isYearAgoDate } from '@utils/common.js';
import { RANK_TITLES, StatisticFilter } from '@const/statistic.js';

export const getRankTitle = ( (amount) => RANK_TITLES.find(({ rating }) => rating >= amount).title || '' );

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
  [StatisticFilter.TODAY]: (films) => films.filter((film) => isTodayDate(film.watchedDate)),
  [StatisticFilter.WEEK]: (films) => films.filter((film) => isWeekAgoDate(film.watchedDate)),
  [StatisticFilter.MONTH]: (films) => films.filter((film) => isMonthAgoDate(film.watchedDate)),
  [StatisticFilter.YEAR]: (films) => films.filter((film) => isYearAgoDate(film.watchedDate)),
};

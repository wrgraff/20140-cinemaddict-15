import AbstractView from '@view/abstract.js';
import { sortGenres, calcTextRank } from '@utils/statistic.js';
import StatisticRankView from '@view/statistic-rank.js';
import StatisticFiltersView from '@view/statistic-filters.js';
import StatisticListView from '@view/statistic-list.js';
import StatisticChartView from '@view/statistic-chart.js';

export const createStatisticTemplate = () => ('<section class="statistic"></section>');

export default class Statistic extends AbstractView {
  constructor({ watched, runtime, genres }) {
    super();
    this._watched = watched;
    this._sortedGenres = sortGenres(genres);
    this._runtime = runtime;
    this._rank = calcTextRank(watched);
  }

  getTemplate() {
    return createStatisticTemplate();
  }

  getElement() {
    super.getElement().append( new StatisticRankView(this._rank).getElement() );
    super.getElement().append( new StatisticFiltersView().getElement() );
    super.getElement().append( new StatisticListView(this._watched, this._runtime, this._sortedGenres[0][0]).getElement() );
    super.getElement().append( new StatisticChartView().getElement() );

    return this._element;
  }
}

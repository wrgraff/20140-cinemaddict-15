import { createElement } from '@utils/render.js';
import StatisticRankView from '@view/statistic-rank.js';
import StatisticFiltersView from '@view/statistic-filters.js';
import StatisticListView from '@view/statistic-list.js';
import StatisticChartView from '@view/statistic-chart.js';

export const createStatisticTemplate = () => ('<section class="statistic"></section>');

export default class Statistic {
  constructor({ amount, runtime, topGenre }) {
    this._amount = amount;
    this._runtime = runtime;
    this._topGenre = topGenre;
    this._element = null;
  }

  getTemplate() {
    return createStatisticTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement( this.getTemplate() );
      this._element.append( new StatisticRankView( this._amount ).getElement() );
      this._element.append( new StatisticFiltersView().getElement() );
      this._element.append( new StatisticListView( this._amount, this._runtime, this._topGenre ).getElement() );
      this._element.append( new StatisticChartView().getElement() );
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

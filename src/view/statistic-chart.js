import { createElement } from '@utils/render.js';

const createStatisticChartTemplate = () => (`
  <div class="statistic__chart-wrap">
    <canvas class="statistic__chart" width="1000"></canvas>
  </div>
`);

export default class StatisticChart {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createStatisticChartTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement( this.getTemplate() );
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

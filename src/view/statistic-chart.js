import AbstractView from '@view/abstract.js';

const createStatisticChartTemplate = () => (`
  <div class="statistic__chart-wrap">
    <canvas class="statistic__chart" width="1000"></canvas>
  </div>
`);

export default class StatisticChart extends AbstractView {
  getTemplate() {
    return createStatisticChartTemplate();
  }
}

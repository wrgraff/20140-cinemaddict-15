import AbstractView from '@view/abstract.js';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { sortGenres, getRatingTitle } from '@utils/statistic.js';
import StatisticRankView from '@view/statistic-rank.js';
import StatisticFiltersView from '@view/statistic-filters.js';
import StatisticListView from '@view/statistic-list.js';
import StatisticChartView from '@view/statistic-chart.js';

const createStatisticTemplate = () => '<section class="statistic"></section>';

const renderChart = (ctx, genres) => {
  const BAR_HEIGHT = 50;
  const height = BAR_HEIGHT * genres.length;
  const labels = genres.map((genre) => genre[0]);
  const data = genres.map((genre) => genre[1]);

  ctx.height = height;

  new Chart(ctx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: labels,
      datasets: [{
        data: data,
        backgroundColor: '#ffe800',
        hoverBackgroundColor: '#ffe800',
        anchor: 'start',
      }],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 20,
          },
          color: '#ffffff',
          anchor: 'start',
          align: 'start',
          offset: 40,
        },
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: '#ffffff',
            padding: 100,
            fontSize: 20,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          barThickness: 24,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};

export default class Statistic extends AbstractView {
  constructor({ watched, runtime, genres }) {
    super();
    this._watched = watched;
    this._sortedGenres = sortGenres(genres);
    this._runtime = runtime;
    this._rank = getRatingTitle(watched);
    this._chart = null;
  }

  getTemplate() {
    return createStatisticTemplate();
  }

  getElement() {
    const element = super.getElement();

    element.append( new StatisticRankView(this._rank).getElement() );
    element.append( new StatisticFiltersView().getElement() );
    element.append( new StatisticListView(this._watched, this._runtime, this._sortedGenres[0][0]).getElement() );
    element.append( new StatisticChartView().getElement() );

    const ctx = element.querySelector('.statistic__chart');
    this._chart = renderChart(ctx, this._sortedGenres);

    return this._element;
  }

  removeElement() {
    if (this._chart !== null) {
      this._chart = null;
    }

    super.removeElement();
  }
}

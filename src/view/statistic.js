import SmartView from '@view/smart.js';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { sortGenres, getRatingTitle } from '@utils/statistic.js';
import { formatRuntime } from '@utils/format.js';

const createTopGenreTemplate = (topGenreName) => (`
  <li class="statistic__text-item">
    <h4 class="statistic__item-title">Top genre</h4>
    <p class="statistic__item-text">${topGenreName}</p>
  </li>
`);

const createStatisticTemplate = ({ rankTitle, watched, runtime, topGenreName }) => (`
  <section class="statistic">
    <p class="statistic__rank">
      Your rank
      <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
      <span class="statistic__rank-label">${rankTitle}</span>
    </p>

    <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
      <p class="statistic__filters-description">Show stats:</p>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="all-time" checked>
      <label for="statistic-all-time" class="statistic__filters-label">All time</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="today">
      <label for="statistic-today" class="statistic__filters-label">Today</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="week">
      <label for="statistic-week" class="statistic__filters-label">Week</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="month">
      <label for="statistic-month" class="statistic__filters-label">Month</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="year">
      <label for="statistic-year" class="statistic__filters-label">Year</label>
    </form>

    <ul class="statistic__text-list">
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">You watched</h4>
        <p class="statistic__item-text">${watched} <span class="statistic__item-description">movies</span></p>
      </li>

      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Total duration</h4>
        <p class="statistic__item-text">
          ${formatRuntime( runtime, (hours, minutes) => (`
            ${hours} <span class="statistic__item-description">h</span>
            ${minutes} <span class="statistic__item-description">m</span>
          `) )}
        </p>
      </li>
      ${topGenreName ? createTopGenreTemplate(topGenreName) : ''}
    </ul>

    <div class="statistic__chart-wrap">
      <canvas class="statistic__chart" width="1000"></canvas>
    </div>
  </section>
`);

const renderChart = (ctx, genres) => {
  const BAR_HEIGHT = 50;
  const height = BAR_HEIGHT * genres.length;
  const labels = genres.map((genre) => genre[0]);
  const data = genres.map((genre) => genre[1]);

  ctx.height = height;

  return new Chart(ctx, {
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

export default class Statistic extends SmartView {
  constructor(statistic) {
    super();
    this._data = Statistic.parseStatisticToData(statistic);
    this._chart = null;
    this._renderChart();
  }

  getTemplate() {
    return createStatisticTemplate(this._data);
  }

  removeElement() {
    if (this._chart !== null) {
      this._chart = null;
    }

    super.removeElement();
  }

  _renderChart() {
    if (this._chart !== null) {
      this._chart = null;
    }

    const ctx = this.getElement().querySelector('.statistic__chart');
    this._chart = renderChart(ctx, this._data.genres);
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.changeFilterType = callback;
    this.getElement().querySelector('.statistic__filters').addEventListener('change', this._changeFilterType);
  }

  restoreHandlers() {
    this.setFilterTypeChangeHandler(this._callback.changeFilterType);
  }

  _changeFilterType(evt) {
    this._callback.changeFilterType(evt.target.value);
  }

  static parseStatisticToData(statistic) {
    const sortedGenres = sortGenres(statistic.genres);

    return Object.assign(
      {},
      statistic,
      {
        genres: sortedGenres,
        topGenreName: sortedGenres[0][0],
        rankTitle: getRatingTitle(statistic.watched),
      },
    );
  }
}

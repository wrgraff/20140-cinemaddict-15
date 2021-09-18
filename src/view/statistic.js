import SmartView from '@view/smart.js';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { StatisticFilter } from '@const/statistic.js';
import { sortGenres, getStatistic, filterTypeToFilms } from '@utils/statistic.js';
import { formatRuntime } from '@utils/format.js';

const BAR_HEIGHT = 50;

const createTopGenreTemplate = (topGenreName) => (`
  <li class="statistic__text-item">
    <h4 class="statistic__item-title">Top genre</h4>
    <p class="statistic__item-text">${topGenreName}</p>
  </li>
`);

const createStatisticChartTemplate = () => '<div class="statistic__chart-wrap"><canvas class="statistic__chart" width="1000"></canvas></div>';

const createStatisticTemplate = ({ rankTitle, watched, runtime, topGenreName, activeFilterType }) => (`
  <section class="statistic">
    <p class="statistic__rank">
      Your rank
      <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
      <span class="statistic__rank-label">${rankTitle}</span>
    </p>

    <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
      <p class="statistic__filters-description">Show stats:</p>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="${StatisticFilter.ALL_TIME}" ${ activeFilterType === StatisticFilter.ALL_TIME ? 'checked' : ''}>
      <label for="statistic-all-time" class="statistic__filters-label">All time</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="${StatisticFilter.TODAY}" ${ activeFilterType === StatisticFilter.TODAY ? 'checked' : ''}>
      <label for="statistic-today" class="statistic__filters-label">Today</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="${StatisticFilter.WEEK}" ${ activeFilterType === StatisticFilter.WEEK ? 'checked' : ''}>
      <label for="statistic-week" class="statistic__filters-label">Week</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="${StatisticFilter.MONTH}" ${ activeFilterType === StatisticFilter.MONTH ? 'checked' : ''}>
      <label for="statistic-month" class="statistic__filters-label">Month</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="${StatisticFilter.YEAR}" ${ activeFilterType === StatisticFilter.YEAR ? 'checked' : ''}>
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
      ${topGenreName !== '' ? createTopGenreTemplate(topGenreName) : ''}
    </ul>

    ${watched !== 0 ? createStatisticChartTemplate() : ''}
  </section>
`);

const renderChart = (ctx, genres) => {
  const height = BAR_HEIGHT * genres.length;
  const labels = genres.map(([label]) => label);
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
      dataset: {
        barThickness: 24,
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
  constructor(films, rankTitle) {
    super();
    this._films = films;
    this._rankTitle = rankTitle;
    this._chart = null;

    this._data = Statistic.parseFilmsToData(films, rankTitle, StatisticFilter.ALL_TIME);

    this._changeFilterType = this._changeFilterType.bind(this);

    this._setInnerHandlers();
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

    if (this._data.watched !== 0) {
      const ctx = this.getElement().querySelector('.statistic__chart');
      this._chart = renderChart(ctx, this._data.genres);
    }
  }

  restoreHandlers() {
    this._setInnerHandlers();
  }

  _setInnerHandlers() {
    this.getElement().querySelector('.statistic__filters').addEventListener('change', this._changeFilterType);
  }

  _changeFilterType(evt) {
    this.updateData( Statistic.parseFilmsToData(this._films, this._rankTitle, evt.target.value) );
    this._renderChart();
  }

  static parseFilmsToData(films, rankTitle, activeFilterType) {
    const statistic = getStatistic( filterTypeToFilms[activeFilterType](films) );
    const sortedGenres = sortGenres(statistic.genres);

    return Object.assign(
      {},
      statistic,
      {
        genres: sortedGenres,
        topGenreName: sortedGenres.length !== 0 ? sortedGenres[0][0] : '',
        rankTitle,
        activeFilterType: activeFilterType,
      },
    );
  }
}

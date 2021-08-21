import AbstractView from '@view/abstract.js';
import { formatRuntime } from '@utils/format.js';

const createTopGenreTemplate = (topGenre) => (`
  <li class="statistic__text-item">
    <h4 class="statistic__item-title">Top genre</h4>
    <p class="statistic__item-text">${topGenre}</p>
  </li>
`);

const createStatisticListTemplate = (amount, runtime, topGenre) => (`
  <ul class="statistic__text-list">
    <li class="statistic__text-item">
      <h4 class="statistic__item-title">You watched</h4>
      <p class="statistic__item-text">${amount} <span class="statistic__item-description">movies</span></p>
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
    ${topGenre ? createTopGenreTemplate(topGenre) : ''}
  </ul>
`);

export default class StatisticList extends AbstractView {
  constructor(amount, runtime, topGenre) {
    super();
    this._amount = amount;
    this._runtime = runtime;
    this._topGenre = topGenre;
  }

  getTemplate() {
    return createStatisticListTemplate(this._amount, this._runtime, this._topGenre);
  }
}

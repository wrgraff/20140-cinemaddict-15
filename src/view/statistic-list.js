import { formatRuntime } from '@utils/format.js';

export const createStatisticListTemplate = ( amount, runtime, topGenre ) => (`
  <ul class="statistic__text-list">
    <li class="statistic__text-item">
      <h4 class="statistic__item-title">You watched</h4>
      <p class="statistic__item-text">${amount} <span class="statistic__item-description">movies</span></p>
    </li>
    <li class="statistic__text-item">
      <h4 class="statistic__item-title">Total duration</h4>
      <p class="statistic__item-text">
      ${formatRuntime( runtime, ( hours, minutes ) => (`
        ${hours} <span class="statistic__item-description">h</span>
        ${minutes} <span class="statistic__item-description">m</span>
      `) )}
      </p>
    </li>
    <li class="statistic__text-item">
      <h4 class="statistic__item-title">Top genre</h4>
      <p class="statistic__item-text">${topGenre}</p>
    </li>
  </ul>
`);

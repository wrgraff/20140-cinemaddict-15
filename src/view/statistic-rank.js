import { createElement } from '@utils/render.js';

const createStatisticRankTemplate = (rank) => (`
  <p class="statistic__rank">
    Your rank
    <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    <span class="statistic__rank-label">${rank}</span>
  </p>
`);

export default class StatisticRank {
  constructor(rank) {
    this._rank = rank;
    this._element = null;
  }

  getTemplate() {
    return createStatisticRankTemplate(this._rank);
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

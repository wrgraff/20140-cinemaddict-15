import { createElement } from '@utils/render.js';
import { RANKS } from '@const/statistic.js';

const calcTextRank = ( amount ) => {
  let textRank = '';

  for (const [key, value] of Object.entries( RANKS )) {
    if (amount > key) {
      textRank = value;
    }
  }

  return textRank;
};

const createStatisticRankTemplate = ( rank ) => (`
  <p class="statistic__rank">
    Your rank
    <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    <span class="statistic__rank-label">${rank}</span>
  </p>
`);

export default class StatisticRank {
  constructor( amount ) {
    this._rank = calcTextRank( amount );
    this._element = null;
  }

  getTemplate() {
    return createStatisticRankTemplate( this._rank );
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

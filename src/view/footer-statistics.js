import { createElement } from '@utils/render.js';
import { formatAmount } from '@utils/format.js';

const createFooterStatisticsTemplate = (amount) => (`<p>${formatAmount(amount)} movies inside</p>`);

export default class FooterStatistics {
  constructor(amount) {
    this._amount = amount;
    this._element = null;
  }

  getTemplate() {
    return createFooterStatisticsTemplate(this._amount);
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

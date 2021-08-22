import AbstractView from '@view/abstract.js';
import { formatAmount } from '@utils/format.js';

const createFooterStatisticsTemplate = (amount) => (`<p>${formatAmount(amount)} movies inside</p>`);

export default class FooterStatistics extends AbstractView {
  constructor(amount) {
    super();
    this._amount = amount;
  }

  getTemplate() {
    return createFooterStatisticsTemplate(this._amount);
  }
}

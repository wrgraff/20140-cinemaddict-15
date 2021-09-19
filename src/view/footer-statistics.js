import AbstractView from '@view/abstract.js';
import { formatAmount } from '@utils/format.js';

const createFooterStatisticsTemplate = (isLoading, amount) => `<p>${isLoading ? 'Loading...' : `${ formatAmount(amount) } movies inside` }</p>`;

export default class FooterStatistics extends AbstractView {
  constructor(amount, isLoading = true) {
    super();
    this._amount = amount;
    this._isLoading = isLoading;
  }

  getTemplate() {
    return createFooterStatisticsTemplate(this._isLoading, this._amount);
  }
}

import { SortType } from '@const/films.js';
import SmartView from '@view/smart.js';

const createSortTemplate = ({ currentType }) => (`
  <ul class="sort">
    <li><a href="#" class="sort__button ${currentType === SortType.DEFAULT ? 'sort__button--active' : ''}" data-sort-type="${SortType.DEFAULT}">Sort by default</a></li>
    <li><a href="#" class="sort__button ${currentType === SortType.DATE ? 'sort__button--active' : ''}" data-sort-type="${SortType.DATE}">Sort by date</a></li>
    <li><a href="#" class="sort__button ${currentType === SortType.RATING ? 'sort__button--active' : ''}" data-sort-type="${SortType.RATING}">Sort by rating</a></li>
  </ul>
`);

export default class Sort extends SmartView {
  constructor() {
    super();
    this._data = {
      currentType: SortType.DEFAULT,
    };

    this._onListClick = this._onListClick.bind(this);
  }

  getTemplate() {
    return createSortTemplate(this._data);
  }

  setTypeChangeHandler(callback) {
    this._callback.changeType = callback;
    this.getElement().addEventListener('click', this._onListClick);
  }

  restoreHandlers() {
    this.setTypeChangeHandler(this._callback.changeType);
  }

  _onListClick(evt) {
    if (evt.target.tagName !== 'A') {
      return;
    }

    evt.preventDefault();
    this.updateData({ currentType: evt.target.dataset.sortType });
    this._callback.changeType(this._data.currentType);
  }
}

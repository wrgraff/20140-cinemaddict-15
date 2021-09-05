import AbstractView from '@view/abstract.js';
import { SortType } from '@const/films.js';

const createSortTemplate = () => (`
  <ul class="sort">
    <li><a href="#" class="sort__button sort__button--active" data-sort-type="${SortType.DEFAULT}">Sort by default</a></li>
    <li><a href="#" class="sort__button" data-sort-type="${SortType.DATE}">Sort by date</a></li>
    <li><a href="#" class="sort__button" data-sort-type="${SortType.RATING}">Sort by rating</a></li>
  </ul>
`);

export default class Sort extends AbstractView {
  constructor() {
    super();

    this._handleTypeChange = this._handleTypeChange.bind(this);
  }

  getTemplate() {
    return createSortTemplate();
  }

  setTypeChangeHandler(callback) {
    this._callback.changeType = callback;
    this.getElement().addEventListener('click', this._handleTypeChange);
  }

  _handleTypeChange(evt) {
    if (evt.target.tagName !== 'A') {
      return;
    }

    evt.preventDefault();
    this._callback.changeType(evt.target.dataset.sortType);
  }
}

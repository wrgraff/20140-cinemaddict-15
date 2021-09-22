import AbstractView from '@view/abstract.js';
import { FilterType } from '@const/common.js';

const createMainNavigationTemplate = ({ watchlist, history, favorites }, currentFilterType, isStatisticActive) => (`
  <nav class="main-navigation">
    <div class="main-navigation__items">
      <a href="#all" class="main-navigation__item ${currentFilterType === FilterType.ALL ? 'main-navigation__item--active' : ''}" data-filter-type="${FilterType.ALL}">
        All movies
      </a>
      <a href="#watchlist" class="main-navigation__item ${currentFilterType === FilterType.WATCHLIST ? 'main-navigation__item--active' : ''}" data-filter-type="${FilterType.WATCHLIST}">
        Watchlist <span class="main-navigation__item-count">${watchlist}</span>
      </a>
      <a href="#history" class="main-navigation__item ${currentFilterType === FilterType.HISTORY ? 'main-navigation__item--active' : ''}" data-filter-type="${FilterType.HISTORY}">
        History <span class="main-navigation__item-count">${history}</span>
      </a>
      <a href="#favorites" class="main-navigation__item ${currentFilterType === FilterType.FAVORITES ? 'main-navigation__item--active' : ''}" data-filter-type="${FilterType.FAVORITES}">
        Favorites <span class="main-navigation__item-count">${favorites}</span>
      </a>
    </div>
    <a href="#stats" class="main-navigation__additional ${isStatisticActive ? 'main-navigation__additional--active' : ''}">Stats</a>
  </nav>
`);

export default class MainNavigation extends AbstractView {
  constructor({ watchlist, history, favorites }, currentFilterType, isStatisticActive) {
    super();
    this._amount = { watchlist, history, favorites };
    this._currentFilterType = isStatisticActive ? '' : currentFilterType;
    this._isStatisticActive = isStatisticActive;

    this._onFilterTypeChange = this._onFilterTypeChange.bind(this);
    this._onAdditionalClick = this._onAdditionalClick.bind(this);
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.changeFilterType = callback;
    this.getElement().querySelector('.main-navigation__items').addEventListener('click', this._onFilterTypeChange);
  }

  setAdditionalClickHandler(callback) {
    this._callback.clickAdditional = callback;
    this.getElement().querySelector('.main-navigation__additional').addEventListener('click', this._onAdditionalClick);
  }

  getTemplate() {
    return createMainNavigationTemplate(this._amount, this._currentFilterType, this._isStatisticActive);
  }

  _onFilterTypeChange(evt) {
    if (evt.target.tagName !== 'A') {
      return;
    }

    evt.preventDefault();
    this._callback.changeFilterType(evt.target.dataset.filterType);
  }

  _onAdditionalClick(evt) {
    evt.preventDefault();
    this._callback.clickAdditional();
  }
}

import { createElement } from '@utils/render.js';

const createMainNavigationTemplate = ( { watchlist, history, favorites } ) => (`
  <nav class="main-navigation">
    <div class="main-navigation__items">
      <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
      <a href="#watchlist" class="main-navigation__item">
        Watchlist <span class="main-navigation__item-count">${watchlist}</span>
      </a>
      <a href="#history" class="main-navigation__item">
        History <span class="main-navigation__item-count">${history}</span>
      </a>
      <a href="#favorites" class="main-navigation__item">
        Favorites <span class="main-navigation__item-count">${favorites}</span>
      </a>
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>
`);


export default class MainNavigation {
  constructor({ watchlist, history, favorites }) {
    this._amount = { watchlist, history, favorites };
    this._element = null;
  }

  getTemplate() {
    return createMainNavigationTemplate( this._amount );
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

import { createElement } from '@utils/render.js';

const createDetailsControlsTemplate = (film) => (`
  <section class="film-details__controls">
    <button
      type="button"
      class="film-details__control-button film-details__control-button--watchlist ${film.isInWatchlist ? 'film-details__control-button--active' : ''}"
      id="watchlist"
      name="watchlist"
    >
      Add to watchlist
    </button>

    <button
      type="button"
      class="film-details__control-button film-details__control-button--watched ${film.isWatched ? 'film-details__control-button--active' : ''}"
      id="watched"
      name="watched"
    >
      Already watched
    </button>

    <button
      type="button"
      class="film-details__control-button film-details__control-button--favorite ${film.isFavorite ? 'film-details__control-button--active' : ''}"
      id="favorite"
      name="favorite"
    >
      Add to favorites
    </button>
  </section>
`);

export default class DetailsControls {
  constructor(film) {
    this._film = film;
    this._element = null;
  }

  getTemplate() {
    return createDetailsControlsTemplate(this._film);
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

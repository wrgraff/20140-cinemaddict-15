import AbstractView from '@view/abstract.js';

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

export default class DetailsControls extends AbstractView {
  constructor(film) {
    super();
    this._film = film;

    this._watchlistClickHandler = this._watchlistClickHandler.bind(this);
    this._watchedClickHandler = this._watchedClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
  }

  getTemplate() {
    return createDetailsControlsTemplate(this._film);
  }

  setWatchlistClickHandler(callback) {
    this._callback.clickWatchlist = callback;
    this.getElement().querySelector('.film-details__control-button--watchlist').addEventListener('click', this._watchlistClickHandler);
  }

  setWatchedClickHandler(callback) {
    this._callback.clickWatched = callback;
    this.getElement().querySelector('.film-details__control-button--watched').addEventListener('click', this._watchedClickHandler);
  }

  setFavoriteClickHandler(callback) {
    this._callback.clickFavorite = callback;
    this.getElement().querySelector('.film-details__control-button--favorite').addEventListener('click', this._favoriteClickHandler);
  }

  _watchlistClickHandler(evt) {
    evt.preventDefault();
    this._callback.clickWatchlist();
  }

  _watchedClickHandler(evt) {
    evt.preventDefault();
    this._callback.clickWatched();
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.clickFavorite();
  }
}

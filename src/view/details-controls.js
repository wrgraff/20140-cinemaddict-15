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

    this._onAddWatchlistClick = this._onAddWatchlistClick.bind(this);
    this._onAddWatchedClick = this._onAddWatchedClick.bind(this);
    this._onAddFavoriteClick = this._onAddFavoriteClick.bind(this);
  }

  getTemplate() {
    return createDetailsControlsTemplate(this._film);
  }

  setOnAddWatchlistClick(callback) {
    this._callback.clickAddWatchlist = callback;
    this.getElement().querySelector('.film-details__control-button--watchlist').addEventListener('click', this._onAddWatchlistClick);
  }

  setOnAddWatchedClick(callback) {
    this._callback.clickAddWatched = callback;
    this.getElement().querySelector('.film-details__control-button--watched').addEventListener('click', this._onAddWatchedClick);
  }

  setOnAddFavoriteClick(callback) {
    this._callback.clickAddFavorite = callback;
    this.getElement().querySelector('.film-details__control-button--favorite').addEventListener('click', this._onAddFavoriteClick);
  }

  _onAddWatchlistClick(evt) {
    evt.preventDefault();
    this._callback.clickAddWatchlist();
  }

  _onAddWatchedClick(evt) {
    evt.preventDefault();
    this._callback.clickAddWatched();
  }

  _onAddFavoriteClick(evt) {
    evt.preventDefault();
    this._callback.clickAddFavorite();
  }
}

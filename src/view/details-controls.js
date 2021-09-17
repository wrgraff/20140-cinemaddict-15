import SmartView from '@view/smart.js';

const createDetailsControlsTemplate = ({ isInWatchlist, isWatched, isFavorite }) => (`
  <section class="film-details__controls">
    <button
      type="button"
      class="film-details__control-button film-details__control-button--watchlist ${isInWatchlist ? 'film-details__control-button--active' : ''}"
      id="watchlist"
      name="watchlist"
    >
      Add to watchlist
    </button>

    <button
      type="button"
      class="film-details__control-button film-details__control-button--watched ${isWatched ? 'film-details__control-button--active' : ''}"
      id="watched"
      name="watched"
    >
      Already watched
    </button>

    <button
      type="button"
      class="film-details__control-button film-details__control-button--favorite ${isFavorite ? 'film-details__control-button--active' : ''}"
      id="favorite"
      name="favorite"
    >
      Add to favorites
    </button>
  </section>
`);

export default class DetailsControls extends SmartView {
  constructor(film) {
    super();
    this._data = DetailsControls.parseFilmToData(film);

    this._watchlistClickHandler = this._watchlistClickHandler.bind(this);
    this._watchedClickHandler = this._watchedClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
  }

  getTemplate() {
    return createDetailsControlsTemplate(this._data);
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

  restoreHandlers() {
    this.setWatchlistClickHandler(this._callback.clickWatchlist);
    this.setWatchedClickHandler(this._callback.clickWatched);
    this.setFavoriteClickHandler(this._callback.clickFavorite);
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

  static parseFilmToData({ isInWatchlist, isWatched, isFavorite }) {
    return {
      isInWatchlist,
      isWatched,
      isFavorite,
    };
  }
}

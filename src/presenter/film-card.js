import { render, remove, replace } from '@utils/render.js';
import { UserAction, UpdateType } from '@const/common.js';
import FilmCardView from '@view/film-card.js';

export default class FilmCard {
  constructor(container, changeData) {
    this._container = container;
    this._changeData = changeData;

    this._film = null;
    this._cardComponent = null;

    this._callback = {};
    this._onCardClick = this._onCardClick.bind(this);
    this._onWatchlistClick = this._onWatchlistClick.bind(this);
    this._onWatchedClick = this._onWatchedClick.bind(this);
    this._onFavoriteClick = this._onFavoriteClick.bind(this);
  }

  init(film) {
    this._film = film;
    this._createCard();
    render(this._container, this._cardComponent);
  }

  update(film) {
    this._film = film;
    const oldCardComponent = this._cardComponent;
    this._createCard();
    replace(this._cardComponent, oldCardComponent);
  }

  setCardClickHandler(callback) {
    this._callback.clickCard = callback;
  }

  destroy() {
    remove(this._cardComponent);
  }

  _createCard() {
    this._cardComponent = new FilmCardView(this._film);
    this._cardComponent.setCardClickHandler(this._onCardClick);
    this._cardComponent.setWatchlistClickHandler(this._onWatchlistClick);
    this._cardComponent.setWatchedClickHandler(this._onWatchedClick);
    this._cardComponent.setFavoriteClickHandler(this._onFavoriteClick);
  }

  _onCardClick(activeFilm) {
    this._callback.clickCard(activeFilm);
  }

  _onWatchlistClick() {
    this._changeData(
      UserAction.UPDATE_WATCHLIST,
      UpdateType.PATCH,
      Object.assign(
        {},
        this._film,
        {
          isInWatchlist: !this._film.isInWatchlist,
        },
      ),
    );
  }

  _onWatchedClick() {
    this._changeData(
      UserAction.UPDATE_WATCHED,
      UpdateType.PATCH,
      Object.assign(
        {},
        this._film,
        {
          isWatched: !this._film.isWatched,
          watchedDate: !this._film.isWatched ? new Date() : null,
        },
      ),
    );
  }

  _onFavoriteClick() {
    this._changeData(
      UserAction.UPDATE_FAVORITE,
      UpdateType.PATCH,
      Object.assign(
        {},
        this._film,
        {
          isFavorite: !this._film.isFavorite,
        },
      ),
    );
  }

  static create(container, film, changeData) {
    const filmPresenter = new this(container, changeData);
    filmPresenter.init(film);
    return filmPresenter;
  }
}

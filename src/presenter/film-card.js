import { render, replace } from '@utils/render.js';
import FilmCardView from '@view/film-card.js';

export default class FilmCard {
  constructor(container, detailsPresenter, changeData) {
    this._container = container;
    this._changeData = changeData;

    this._film = null;
    this._cardComponent = null;
    this._detailsPresenter = detailsPresenter;

    this._handleWatchlistClick = this._handleWatchlistClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
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

  _createCard() {
    this._cardComponent = new FilmCardView(this._film);
    this._cardComponent.setCardClickHandler(() => this._detailsPresenter.init(this._film));
    this._cardComponent.setWatchlistClickHandler(this._handleWatchlistClick);
    this._cardComponent.setWatchedClickHandler(this._handleWatchedClick);
    this._cardComponent.setFavoriteClickHandler(this._handleFavoriteClick);
  }

  _handleWatchlistClick() {
    this._changeData(
      Object.assign(
        {},
        this._film,
        {
          isInWatchlist: !this._film.isInWatchlist,
        },
      ),
    );
  }

  _handleWatchedClick() {
    this._changeData(
      Object.assign(
        {},
        this._film,
        {
          isWatched: !this._film.isWatched,
        },
      ),
    );
  }

  _handleFavoriteClick() {
    this._changeData(
      Object.assign(
        {},
        this._film,
        {
          isFavorite: !this._film.isFavorite,
        },
      ),
    );
  }

  static create(container, detailsPresenter, film, changeData) {
    const filmPresenter = new this(container, detailsPresenter, changeData);
    filmPresenter.init(film);
    return filmPresenter;
  }
}

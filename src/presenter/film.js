import { render, replace } from '@utils/render.js';
import FilmCardView from '@view/film-card.js';

export default class Film {
  constructor(container, detailsPresenter, changeData) {
    this._container = container;
    this._changeData = changeData;

    this._film = null;
    this._cardComponent = null;
    this._detailsPresenter = detailsPresenter;

    this._onAddWatchlistClick = this._onAddWatchlistClick.bind(this);
    this._onAddWatchedClick = this._onAddWatchedClick.bind(this);
    this._onAddFavoriteClick = this._onAddFavoriteClick.bind(this);
  }

  init(film) {
    this._film = film;
    this._createComponent();
    render(this._container, this._cardComponent);
  }

  update(film) {
    this._film = film;
    this._oldCardComponent = this._cardComponent;
    this._createComponent();
    replace(this._cardComponent, this._oldCardComponent);
  }

  _createComponent() {
    this._cardComponent = new FilmCardView(this._film);
    this._cardComponent.setOnCardClick(() => this._detailsPresenter.init(this._film));
    this._cardComponent.setOnAddWatchlistClick(this._onAddWatchlistClick);
    this._cardComponent.setOnAddWatchedClick(this._onAddWatchedClick);
    this._cardComponent.setOnAddFavoriteClick(this._onAddFavoriteClick);
  }

  _onAddWatchlistClick() {
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

  _onAddWatchedClick() {
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

  _onAddFavoriteClick() {
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

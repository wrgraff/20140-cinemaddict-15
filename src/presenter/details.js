import { UpdateType } from '@const/common.js';
import { render, remove, replace } from '@utils/render.js';
import { isEscapeEvent } from '@utils/dom-event.js';
import DetailsInfoView from '@view/details-info.js';
import DetailsControlsView from '@view/details-controls.js';
import DetailsCommentsView from '@view/details-comments.js';
import DetailsCloseButtonView from '@view/details-close-button.js';

import DetailsView from '@view/details.js';

export default class Details {
  constructor(filmsModel) {
    this._film = null;
    this._filmsModel = filmsModel;

    this._popupComponent = new DetailsView();
    this._infoComponent = null;
    this._controlsComponent = null;
    this._commentsComponent = null;
    this._closeButtonComponent = new DetailsCloseButtonView();

    this._remove = this._remove.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleWatchlistClick = this._handleWatchlistClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);

    this._filmsModel.addObserver(this._handleModelEvent);
  }

  init(film) {
    if (this._popupComponent !== null) {
      remove(this._popupComponent);
    }

    this._film = film;
    this._infoComponent = new DetailsInfoView(this._film);
    this._commentsComponent = new DetailsCommentsView(this._film.comments);
    this._createControls();

    this._closeButtonComponent.setClickHandler(this._remove);

    this._open();
  }

  update(film) {
    if (this._controlsComponent !== null && film.id === this._film.id) {
      this._film = film;
      const oldControlsComponent = this._controlsComponent;
      this._createControls();
      replace(this._controlsComponent, oldControlsComponent);
    }
  }

  _open() {
    const topContainer = this._popupComponent.getElement().querySelector('.film-details__top-container');
    const bottomContainer = this._popupComponent.getElement().querySelector('.film-details__bottom-container');
    const closeButtonContainer = this._popupComponent.getElement().querySelector('.film-details__close');

    render(topContainer, this._infoComponent);
    render(topContainer, this._controlsComponent);
    render(bottomContainer, this._commentsComponent);
    render(closeButtonContainer, this._closeButtonComponent);
    render(document.body, this._popupComponent);
    document.body.classList.add('hide-overflow');
    document.addEventListener('keydown', this._escKeyDownHandler);
  }

  _remove() {
    this._film = null;
    remove(this._infoComponent);
    remove(this._controlsComponent);
    remove(this._commentsComponent);
    remove(this._closeButtonComponent);
    remove(this._popupComponent);
    document.body.classList.remove('hide-overflow');
    document.removeEventListener('keydown', this._escKeyDownHandler);
  }

  _createControls() {
    this._controlsComponent = new DetailsControlsView(this._film);
    this._controlsComponent.setWatchlistClickHandler(this._handleWatchlistClick);
    this._controlsComponent.setWatchedClickHandler(this._handleWatchedClick);
    this._controlsComponent.setFavoriteClickHandler(this._handleFavoriteClick);
  }

  _handleWatchlistClick() {
    this._filmsModel.updateItemById(
      UpdateType.PATCH_WATCHLIST,
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
    this._filmsModel.updateItemById(
      UpdateType.PATCH_WATCHED,
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
    this._filmsModel.updateItemById(
      UpdateType.PATCH_FAVORITE,
      Object.assign(
        {},
        this._film,
        {
          isFavorite: !this._film.isFavorite,
        },
      ),
    );
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH_WATCHLIST:
      case UpdateType.PATCH_WATCHED:
      case UpdateType.PATCH_FAVORITE:
      case UpdateType.MINOR:
      case UpdateType.MAJOR:
        this.update(data);
        break;
    }
  }

  _escKeyDownHandler(evt) {
    if ( isEscapeEvent(evt) ) {
      evt.preventDefault();
      this._remove();
      document.removeEventListener('keydown', this._escKeyDownHandler);
    }
  }
}

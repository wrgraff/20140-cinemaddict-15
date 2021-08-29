import { render, remove, replace } from '@utils/render.js';
import { isEscapeEvent } from '@utils/dom-event.js';
import DetailsInfoView from '@view/details-info.js';
import DetailsControlsView from '@view/details-controls.js';
import DetailsCommentsView from '@view/details-comments.js';
import DetailsCloseButtonView from '@view/details-close-button.js';

import DetailsView from '@view/details.js';

export default class Details {
  constructor(changeData) {
    this._film = null;
    this._changeData = changeData;

    this._detailsComponent = new DetailsView();
    this._infoComponent = null;
    this._controlsComponent = null;
    this._commentsComponent = null;
    this._closeButtonComponent = new DetailsCloseButtonView();

    this._remove = this._remove.bind(this);
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._onAddWatchlistClick = this._onAddWatchlistClick.bind(this);
    this._onAddWatchedClick = this._onAddWatchedClick.bind(this);
    this._onAddFavoriteClick = this._onAddFavoriteClick.bind(this);
  }

  init(film) {
    if (this._detailsComponent !== null) {
      remove(this._detailsComponent);
    }

    this._film = film;
    this._infoComponent = new DetailsInfoView(this._film);
    this._commentsComponent = new DetailsCommentsView(this._film.comments);
    this._createControls();

    this._closeButtonComponent.setOnClick(this._remove);

    this._open();
  }

  update(film) {
    this._film = film;
    const oldControlsComponent = this._controlsComponent;
    this._createControls();
    replace(this._controlsComponent, oldControlsComponent);
  }

  _open() {
    const topContainer = this._detailsComponent.getElement().querySelector('.film-details__top-container');
    const bottomContainer = this._detailsComponent.getElement().querySelector('.film-details__bottom-container');
    const closeButtonContainer = this._detailsComponent.getElement().querySelector('.film-details__close');

    render(topContainer, this._infoComponent);
    render(topContainer, this._controlsComponent);
    render(bottomContainer, this._commentsComponent);
    render(closeButtonContainer, this._closeButtonComponent);
    render(document.body, this._detailsComponent);
    document.body.classList.add('hide-overflow');
    document.addEventListener('keydown', this._onEscKeyDown);
  }

  _remove() {
    remove(this._infoComponent);
    remove(this._controlsComponent);
    remove(this._commentsComponent);
    remove(this._closeButtonComponent);
    remove(this._detailsComponent);
    document.body.classList.remove('hide-overflow');
    document.removeEventListener('keydown', this._onEscKeyDown);
  }

  _createControls() {
    this._controlsComponent = new DetailsControlsView(this._film);
    this._controlsComponent.setOnAddWatchlistClick(this._onAddWatchlistClick);
    this._controlsComponent.setOnAddWatchedClick(this._onAddWatchedClick);
    this._controlsComponent.setOnAddFavoriteClick(this._onAddFavoriteClick);
  }

  _onEscKeyDown(evt) {
    if ( isEscapeEvent(evt) ) {
      evt.preventDefault();
      this._remove();
      document.removeEventListener('keydown', this._onEscKeyDown);
    }
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
}

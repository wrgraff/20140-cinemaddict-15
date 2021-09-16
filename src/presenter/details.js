import { UpdateType } from '@const/common.js';
import { render, remove } from '@utils/render.js';
import { isEscapeEvent } from '@utils/dom-event.js';
import DetailsInfoView from '@view/details-info.js';
import DetailsControlsView from '@view/details-controls.js';
import DetailsCommentsView from '@view/details-comments.js';
import DetailsCommentsListView from '@view/details-comments-list.js';
import DetailsCloseButtonView from '@view/details-close-button.js';
import DetailsCommentNewView from '@view/details-comment-new.js';
import DetailsView from '@view/details.js';
import DetailsInnerView from '@view/details-inner.js';
import DetailsTopView from '@view/details-top.js';
import DetailsBottomView from '@view/details-bottom.js';

export default class Details {
  constructor(filmsModel) {
    this._film = null;
    this._filmsModel = filmsModel;
    this._isOpen = false;

    this._popupComponent = new DetailsView();
    this._formComponent = new DetailsInnerView();
    this._topComponent = new DetailsTopView();
    this._bottomComponent = new DetailsBottomView();
    this._infoComponent = null;
    this._controlsComponent = null;
    this._commentsComponent = null;
    this._commentsListComponent = null;
    this._closeButtonComponent = new DetailsCloseButtonView();
    this._newCommentComponent = new DetailsCommentNewView();

    this._remove = this._remove.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleWatchlistClick = this._handleWatchlistClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleAddComment = this._handleAddComment.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);

    this._filmsModel.addObserver(this._handleModelEvent);
  }

  init(film) {
    if (this._isOpen) {
      this._remove();
    }

    this._film = film;

    this._infoComponent = new DetailsInfoView(this._film);
    this._commentsComponent = new DetailsCommentsView(this._film.comments);
    this._commentsListComponent = new DetailsCommentsListView(this._film.comments);
    this._controlsComponent = new DetailsControlsView(this._film);

    this._controlsComponent.setWatchlistClickHandler(this._handleWatchlistClick);
    this._controlsComponent.setWatchedClickHandler(this._handleWatchedClick);
    this._controlsComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._closeButtonComponent.setClickHandler(this._remove);
    this._newCommentComponent.setFormSubmitHandler(this._handleAddComment);

    this._open();
  }

  update(film) {
    this._film = film;

    this._controlsComponent.updateData({
      isInWatchlist: film.isInWatchlist,
      isWatched: film.isWatched,
      isFavorite: film.isFavorite,
    });
  }

  _open() {
    render(this._topComponent, this._closeButtonComponent);
    render(this._topComponent, this._infoComponent);
    render(this._topComponent, this._controlsComponent);
    render(this._bottomComponent, this._commentsComponent);
    render(this._commentsComponent, this._commentsListComponent);
    render(this._commentsComponent, this._newCommentComponent);

    render(this._formComponent, this._topComponent);
    render(this._formComponent, this._bottomComponent);
    render(this._popupComponent, this._formComponent);

    render(document.body, this._popupComponent);
    document.body.classList.add('hide-overflow');
    document.addEventListener('keydown', this._escKeyDownHandler);

    this._isOpen = true;
  }

  _remove() {
    this._film = null;
    remove(this._popupComponent);
    remove(this._formComponent);
    remove(this._topComponent);
    remove(this._bottomComponent);
    remove(this._infoComponent);
    remove(this._controlsComponent);
    remove(this._commentsComponent);
    remove(this._commentsListComponent);
    remove(this._closeButtonComponent);
    remove(this._newCommentComponent);
    document.body.classList.remove('hide-overflow');
    document.removeEventListener('keydown', this._escKeyDownHandler);
  }

  _handleWatchlistClick() {
    this._filmsModel.updateById(
      UpdateType.MINOR,
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
    this._filmsModel.updateById(
      UpdateType.MINOR,
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
    this._filmsModel.updateById(
      UpdateType.MINOR,
      Object.assign(
        {},
        this._film,
        {
          isFavorite: !this._film.isFavorite,
        },
      ),
    );
  }

  _handleAddComment(update) {
    this._filmsModel.updateById(
      UpdateType.MINOR,
      Object.assign(
        {},
        this._film,
        {
          comments: [...this._film.comments, update],
        },
      ),
    );
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
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

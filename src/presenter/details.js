import { UpdateType } from '@const/common.js';
import { render, remove, replace } from '@utils/render.js';
import { isEscapeEvent } from '@utils/dom-event.js';
import DetailsInfoView from '@view/details-info.js';
import DetailsControlsView from '@view/details-controls.js';
import DetailsCommentsView from '@view/details-comments.js';
import DetailsCloseButtonView from '@view/details-close-button.js';
import DetailsCommentNewView from '@view/details-comment-new.js';
import DetailsView from '@view/details.js';
import DetailsInnerView from '@view/details-inner.js';
import DetailsTopView from '@view/details-top.js';
import DetailsBottomView from '@view/details-bottom.js';

export default class Details {
  constructor(filmsModel, api) {
    this._film = null;
    this._comments = null;
    this._filmsModel = filmsModel;
    this._api = api;
    this._isOpen = false;

    this._popupComponent = new DetailsView();
    this._formComponent = new DetailsInnerView();
    this._topComponent = new DetailsTopView();
    this._bottomComponent = new DetailsBottomView();
    this._infoComponent = null;
    this._controlsComponent = null;
    this._commentsComponent = new DetailsCommentsView();
    this._closeButtonComponent = new DetailsCloseButtonView();
    this._newCommentComponent = new DetailsCommentNewView();

    this._remove = this._remove.bind(this);
    this._onModelEvent = this._onModelEvent.bind(this);
    this._onWatchlistClick = this._onWatchlistClick.bind(this);
    this._onWatchedClick = this._onWatchedClick.bind(this);
    this._onFavoriteClick = this._onFavoriteClick.bind(this);
    this._onCommentAdd = this._onCommentAdd.bind(this);
    this._onCommentDelete = this._onCommentDelete.bind(this);
    this._onEscapeKeyDown = this._onEscapeKeyDown.bind(this);

    this._filmsModel.addObserver(this._onModelEvent);
  }

  init(film) {
    if (this._isOpen) {
      this._remove();
    }

    this._film = film;
    this._comments = [];

    this._infoComponent = new DetailsInfoView(this._film);
    this._controlsComponent = new DetailsControlsView(this._film);

    this._controlsComponent.setWatchlistClickHandler(this._onWatchlistClick);
    this._controlsComponent.setWatchedClickHandler(this._onWatchedClick);
    this._controlsComponent.setFavoriteClickHandler(this._onFavoriteClick);
    this._closeButtonComponent.setClickHandler(this._remove);
    this._newCommentComponent.setFormSubmitHandler(this._onCommentAdd);

    this._open();

    this._api.getCommentsById(this._film)
      .then((comments) => {
        this._comments = comments;
        this._updateComments(comments);
      })
      .catch(() => {
        this._comments = [];
        this._updateComments([]);
      });
  }

  update(film) {
    this._film = film;

    if (this._isOpen) {
      this._controlsComponent.updateData({
        isInWatchlist: film.isInWatchlist,
        isWatched: film.isWatched,
        isFavorite: film.isFavorite,
      });
    }
  }

  _open() {
    render(this._topComponent, this._closeButtonComponent);
    render(this._topComponent, this._infoComponent);
    render(this._topComponent, this._controlsComponent);
    render(this._bottomComponent, this._commentsComponent);
    render(this._commentsComponent, this._newCommentComponent);

    render(this._formComponent, this._topComponent);
    render(this._formComponent, this._bottomComponent);
    render(this._popupComponent, this._formComponent);

    render(document.body, this._popupComponent);
    document.body.classList.add('hide-overflow');
    document.addEventListener('keydown', this._onEscapeKeyDown);

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
    remove(this._closeButtonComponent);
    remove(this._newCommentComponent);
    document.body.classList.remove('hide-overflow');
    document.removeEventListener('keydown', this._onEscapeKeyDown);
    this._newCommentComponent.clearInput();
  }

  _updateComments(comments, isLoading = false, isDeleting = false, deletingId = 0) {
    const oldCommentsComponent = this._commentsComponent;
    this._commentsComponent = new DetailsCommentsView(comments, isLoading, isDeleting, deletingId);
    this._commentsComponent.setCommentsListClickHandler(this._onCommentDelete);
    replace(this._commentsComponent, oldCommentsComponent);
    render(this._commentsComponent, this._newCommentComponent);
    this._newCommentComponent.restoreHandlers();
  }

  _onWatchlistClick() {
    this._api.updateFilm(
      Object.assign(
        {},
        this._film,
        {
          isInWatchlist: !this._film.isInWatchlist,
        },
      ),
    )
      .then( (response) => this._filmsModel.updateById(UpdateType.MINOR, response) );
  }

  _onWatchedClick() {
    this._api.updateFilm(
      Object.assign(
        {},
        this._film,
        {
          isWatched: !this._film.isWatched,
          watchedDate: !this._film.isWatched ? new Date() : null,
        },
      ),
    )
      .then( (response) => this._filmsModel.updateById(UpdateType.MINOR, response) );
  }

  _onFavoriteClick() {
    this._api.updateFilm(
      Object.assign(
        {},
        this._film,
        {
          isFavorite: !this._film.isFavorite,
        },
      ),
    )
      .then( (response) => this._filmsModel.updateById(UpdateType.MINOR, response) );
  }

  _onCommentAdd(update) {
    this._newCommentComponent.setSaving();
    this._api.addComment(this._film.id, update)
      .then(({ comments, film }) => {
        this._newCommentComponent.clearInput();
        this._updateComments(comments);
        this._filmsModel.updateById(
          UpdateType.MAJOR,
          film,
        );
      })
      .catch(() => {
        this._newCommentComponent.shake();
      });
  }

  _onCommentDelete(deletedComment) {
    this._updateComments(this._comments, false, true, deletedComment);

    this._api.deleteComment(deletedComment).then(() => {
      const commentIndex = this._comments.findIndex((comment) => comment.id === deletedComment);
      this._comments = [
        ...this._comments.slice(0, commentIndex),
        ...this._comments.slice(commentIndex + 1),
      ];
      this._film.comments = this._comments.map((comment) => comment.id);

      this._updateComments(this._comments);
      this._filmsModel.updateById(
        UpdateType.MAJOR,
        Object.assign(
          {},
          this._film,
        ),
      );
    });
  }

  _onModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
      case UpdateType.MINOR:
      case UpdateType.MAJOR:
        this.update(data);
        break;
    }
  }

  _onEscapeKeyDown(evt) {
    if ( isEscapeEvent(evt) ) {
      evt.preventDefault();
      this._remove();
      document.removeEventListener('keydown', this._onEscapeKeyDown);
    }
  }
}

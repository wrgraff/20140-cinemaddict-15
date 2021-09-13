import { render, remove } from '@utils/render.js';
import { sortByRating, sortByComments, sortByDate } from '@utils/films.js';
import { UserAction, UpdateType } from '@const/common.js';
import { FilmListType, DefaultListSetting, SortType } from '@const/films.js';
import FilmsListView from '@view/films-list.js';
import FilmsListExtraView from '@view/films-list-extra.js';
import FilmsListContainerView from '@view/films-list-container.js';
import FilmsListShowMoreView from '@view/films-list-show-more.js';
import FilmCardPresenter from '@presenter/film-card.js';

export default class FilmsList {
  constructor(container, model, settings = DefaultListSetting) {
    this._model = model;
    this._container = container;
    this._sourcedItems = null;
    this._type = settings.TYPE;
    this._stepAmount = settings.STEP_AMOUNT;
    this._maxAmount = settings.MAX_AMOUNT;
    this._shownItems = settings.STEP_AMOUNT;
    this._defaultSortType = settings.SORT_TYPE;
    this._currentSortType = settings.SORT_TYPE;

    switch (settings.TYPE) {
      case FilmListType.RATING:
      case FilmListType.COMMENTS:
        this._sectionComponent = new FilmsListExtraView(settings.TITLE);
        break;
      default:
        this._sectionComponent = new FilmsListView(settings.TITLE);
    }

    this._itemsComponent = new FilmsListContainerView();
    this._showMoreComponent = null;

    this._cardPresenter = new Map();

    this._callback = {};
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleDetailsOpen = this._handleDetailsOpen.bind(this);
  }

  init() {
    this._model.addObserver(this._handleModelEvent);
    this._render();
  }

  sort(sortType) {
    this._currentSortType = sortType;
    this._clearCards();
    this._renderCards(0, this._shownItems);
  }

  setFilmChangeHandler(callback) {
    this._callback.changeFilm = callback;
  }

  setDetailsOpenHandler(callback) {
    this._callback.openDetails = callback;
  }

  _getItems() {
    switch (this._currentSortType) {
      case SortType.DATE:
        return sortByDate( this._model.getItems().slice() );
      case SortType.RATING:
        return sortByRating( this._model.getItems().slice() );
      case SortType.COMMENTS:
        return sortByComments( this._model.getItems().slice() );
    }
    return this._model.getItems().slice();
  }

  _render() {
    if (this._maxAmount === 0) {
      this._maxAmount = this._model.getItems().length;
    }

    render(this._sectionComponent, this._itemsComponent);
    this._renderCards(0, this._shownItems);

    if (this._shownItems < this._maxAmount && this._type === FilmListType.DEFAULT) {
      this._renderShowMore();
    }

    render(this._container, this._sectionComponent);
  }

  _clear({resetRenderedTaskCount = false, resetSortType = false} = {}) {
    if (this._showMoreComponent !== null) {
      remove(this._showMoreComponent);
    }
    this._clearCards();

    this._maxAmount = this._getItems().length;
    if (resetRenderedTaskCount) {
      this._shownItems = 0;
    } else {
      this._shownItems = Math.min(this._shownItems, this._maxAmount);
    }

    if (resetSortType) {
      this._currentSortType = this._defaultSortType;
    }
  }

  _renderCards(from, to) {
    this._getItems()
      .slice(from, to)
      .forEach((item) => {
        const cardPresenter = FilmCardPresenter.create(this._itemsComponent, item, this._handleViewAction);
        cardPresenter.setCardClickHandler(() => this._handleDetailsOpen(item));
        this._cardPresenter.set(item.id, cardPresenter);
      });
    this._shownItems = to;
  }

  _clearCards() {
    this._cardPresenter.forEach((presenter) => presenter.destroy());
    this._cardPresenter.clear();
  }

  _renderShowMore() {
    if (this._showMoreComponent !== null) {
      this._showMoreComponent = null;
    }

    this._showMoreComponent = new FilmsListShowMoreView();
    render(this._sectionComponent, this._showMoreComponent);

    this._showMoreComponent.setClickHandler(() => {
      this._renderCards(this._shownItems, this._shownItems + this._stepAmount);

      if (this._shownItems >= this._model.getItems().length) {
        remove(this._showMoreComponent);
      }
    });
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_FILM:
        this._model.updateItemById(updateType, update);
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._cardPresenter.get(data.id).update(data);
        break;
      case UpdateType.MINOR:
        this._clear();
        this._render();
        break;
      case UpdateType.MAJOR:
        this._clear({resetRenderedTaskCount: true, resetSortType: true});
        this._render();
        break;
    }
  }

  _handleDetailsOpen(item) {
    this._callback.openDetails(item);
  }
}

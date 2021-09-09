import { render, remove } from '@utils/render.js';
import { updateItemById } from '@utils/common.js';
import { sortByRating, sortByComments, sortByDate } from '@utils/films.js';
import { FilmListType, DefaultListSetting } from '@const/films.js';
import { SortType } from '@const/films.js';
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
    this._stepAmount = settings.STEP_AMOUNT;
    this._maxAmount = settings.MAX_AMOUNT;
    this._shownItems = 0;
    this._currentSortType = settings.SORT_TYPE;

    switch (settings.SORT_TYPE) {
      case FilmListType.RATING:
      case FilmListType.COMMENTS:
        this._sectionComponent = new FilmsListExtraView(settings.TITLE);
        break;
      default:
        this._sectionComponent = new FilmsListView(settings.TITLE);
    }

    this._itemsComponent = new FilmsListContainerView();
    this._showMoreComponent = new FilmsListShowMoreView();

    this._cardPresenter = new Map();

    this._callback = {};
    this._handleItemChange = this._handleItemChange.bind(this);
    this._handleDetailsOpen = this._handleDetailsOpen.bind(this);
  }

  init() {
    if (this._maxAmount === 0) {
      this._maxAmount = this._model.getItems().length;
    }

    render(this._sectionComponent, this._itemsComponent);
    this._renderCards(this._shownItems, this._shownItems + this._stepAmount);

    if (this._shownItems < this._maxAmount) {
      this._renderShowMore();
    }

    render(this._container, this._sectionComponent);
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

  update(changedFilm) {
    this._items = updateItemById(this._items, changedFilm);
    this._sourcedItems = updateItemById(this._sourcedItems, changedFilm);
    const changedPresenter = this._cardPresenter.get(changedFilm.id);
    if (changedPresenter) {
      changedPresenter.update(changedFilm);
    }
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

  _renderCards(from, to) {
    this._getItems()
      .slice(from, to)
      .forEach((item) => {
        const cardPresenter = FilmCardPresenter.create(this._itemsComponent, item, this._handleItemChange);
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
    render(this._sectionComponent, this._showMoreComponent);

    this._showMoreComponent.setClickHandler(() => {
      this._renderCards(this._shownItems, this._shownItems + this._stepAmount);

      if (this._shownItems >= this._model.getItems().length) {
        remove(this._showMoreComponent);
      }
    });
  }

  _handleItemChange(changedFilm) {
    this._callback.changeFilm(changedFilm);
  }

  _handleDetailsOpen(item) {
    this._callback.openDetails(item);
  }
}

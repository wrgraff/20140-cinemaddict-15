import { render, remove } from '@utils/render.js';
import { updateItemById } from '@utils/common.js';
import { sortByRating, sortByComments, sortByDate } from '@utils/films.js';
import { Title, StepAmount, Type } from '@const/films.js';
import { SortType } from '@const/films.js';
import FilmsListView from '@view/films-list.js';
import FilmsListExtraView from '@view/films-list-extra.js';
import FilmsListContainerView from '@view/films-list-container.js';
import FilmsListShowMoreView from '@view/films-list-show-more.js';
import FilmCardPresenter from '@presenter/film-card.js';

export default class FilmsList {
  constructor(container, detailsPresenter, type, title, sortType, stepAmount, maxAmount) {
    this._container = container;
    this._items = null;
    this._sourcedItems = null;
    this._stepAmount = stepAmount || StepAmount.DEFAULT;
    this._maxAmount = maxAmount || 0;
    this._shownItems = 0;
    this._defaultSortType = sortType;
    this._currentSortType = SortType.DEFAULT;

    switch (type) {
      case Type.RATING:
      case Type.COMMENTS:
        this._sectionComponent = new FilmsListExtraView(title || Title.DEFAULT);
        break;
      default:
        this._sectionComponent = new FilmsListView(title || Title.DEFAULT);
    }

    this._itemsComponent = new FilmsListContainerView();
    this._showMoreComponent = new FilmsListShowMoreView();

    this._detailsPresenter = detailsPresenter;
    this._cardPresenter = new Map();

    this._callback = {};
    this._handleFilmChange = this._handleFilmChange.bind(this);
  }

  init(items) {
    this._items = items.slice();
    this._sourcedItems = items.slice();
    this._sortItems(this._defaultSortType);

    if (this._maxAmount === 0) {
      this._maxAmount = items.length;
    }

    render(this._sectionComponent, this._itemsComponent);
    this._renderCards(this._shownItems, this._shownItems + this._stepAmount);

    if (this._shownItems < this._maxAmount) {
      this._renderShowMore();
    }

    render(this._container, this._sectionComponent);
  }

  sort(sortType) {
    this._sortItems(sortType);
    this._clearCards();
    this._renderCards(0, this._shownItems);
  }

  update(changedFilm) {
    this._items = updateItemById(this._items, changedFilm);
    this._sourcedItems = updateItemById(this._sourcedItems, changedFilm);
    const changedPresenter = this._cardPresenter.get(changedFilm.id);
    if (changedPresenter) {
      changedPresenter.update(changedFilm);
    }
  }

  setFilmChangeHandler(callback) {
    this._callback.changeFilm = callback;
  }

  _sortItems(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    switch (sortType) {
      case SortType.DATE:
        this._items = sortByDate(this._items);
        break;
      case SortType.RATING:
        this._items = sortByRating(this._items);
        break;
      case SortType.COMMENTS:
        this._items = sortByComments(this._items);
        break;
      default:
        this._items = this._sourcedItems.slice();
    }

    this._currentSortType = sortType;
  }

  _renderCards(from, to) {
    this._items
      .slice(from, to)
      .forEach((item) => {
        const cardPresenter = FilmCardPresenter.create(this._itemsComponent, this._detailsPresenter, item, this._handleFilmChange);
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

      if (this._shownItems >= this._items.length) {
        remove(this._showMoreComponent);
      }
    });
  }

  _handleFilmChange(changedFilm) {
    this._callback.changeFilm(changedFilm);
  }
}

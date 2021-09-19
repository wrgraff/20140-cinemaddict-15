import { UserAction, UpdateType, FilterType } from '@const/common.js';
import { FilmListType, DefaultListSetting, SortType } from '@const/films.js';
import { render, remove, replace } from '@utils/render.js';
import { sortByRating, sortByComments, sortByDate, actionTypeToFilterType, filterTypeToFilmListTitle } from '@utils/films.js';
import { filterTypeToFilms } from '@utils/filter.js';
import FilmsListView from '@view/films-list.js';
import FilmsListExtraView from '@view/films-list-extra.js';
import FilmsListEmptyView from '@view/films-list-empty.js';
import FilmsListContainerView from '@view/films-list-container.js';
import FilmsListShowMoreView from '@view/films-list-show-more.js';
import FilmCardPresenter from '@presenter/film-card.js';

export default class FilmsList {
  constructor(container, filmsModel, settings = DefaultListSetting, filerModel = null, api) {
    this._filmsModel = filmsModel;
    this._filterModel = filerModel;
    this._container = container;
    this._api = api;

    this._isRenderedEmpty = false;
    this._type = settings.TYPE;
    this._stepAmount = settings.STEP_AMOUNT;
    this._maxAmount = settings.MAX_AMOUNT || this._filmsModel.getAll().length;
    this._shownAmount = 0;
    this._defaultSortType = settings.SORT_TYPE;
    this._currentSortType = settings.SORT_TYPE;

    switch (settings.TYPE) {
      case FilmListType.RATING:
      case FilmListType.COMMENTS:
        this._listComponent = new FilmsListExtraView(settings.TITLE);
        break;
      default:
        this._listComponent = new FilmsListView(settings.TITLE);
    }

    this._emptyComponent = null;
    this._listContainerComponent = new FilmsListContainerView();
    this._showMoreComponent = null;

    this._cardPresenter = new Map();

    this._callback = {};
    this._onModelEvent = this._onModelEvent.bind(this);
    this._onViewAction = this._onViewAction.bind(this);
    this._onDetailsOpen = this._onDetailsOpen.bind(this);

    this._filmsModel.addObserver(this._onModelEvent);
    this._filterModel.addObserver(this._onModelEvent);
  }

  init() {
    this._render();
  }

  update({resetShownAmount = false, resetSortType = false} = {}) {
    if (this._getItems().length === 0) {
      if (!this._isRenderedEmpty) {
        this._replaceListToEmpty();
      }

      this._isRenderedEmpty = true;

      return;
    }

    if (this._isRenderedEmpty) {
      this._isRenderedEmpty = false;
      this._replaceEmptyToList();
    }

    this._clearCards();

    if (resetShownAmount) {
      this._shownAmount = this._stepAmount;
    }

    if (resetSortType) {
      this._currentSortType = this._defaultSortType;
    }

    this._renderCards(0, this._shownAmount);

    if (this._type !== FilmListType.DEFAULT) {
      return;
    }

    this._maxAmount = this._getItems().length;

    if (this._shownAmount >= this._maxAmount && this._showMoreComponent !== null) {
      remove(this._showMoreComponent);
      this._showMoreComponent = null;
    }

    if (this._shownAmount < this._maxAmount && this._showMoreComponent === null) {
      this._renderShowMore();
    }
  }

  sort(sortType) {
    this._currentSortType = sortType;
    this._clearCards();
    this._renderCards(0, this._shownAmount);
  }

  setDetailsOpenHandler(callback) {
    this._callback.openDetails = callback;
  }

  setReplaceListToEmptyHandler(callback) {
    this._callback.replaceListToEmpty = callback;
  }

  setReplaceEmptyToListHandler(callback) {
    this._callback.replaceEmptyToList = callback;
  }

  _replaceListToEmpty() {
    this._callback.replaceListToEmpty();
    this._emptyComponent = new FilmsListEmptyView(filterTypeToFilmListTitle[ this._filterModel.getType() ]);
    replace(this._emptyComponent, this._listComponent);
  }

  _replaceEmptyToList() {
    this._callback.replaceEmptyToList();
    replace(this._listComponent, this._emptyComponent);
    remove(this._emptyComponent);
  }

  _getItems() {
    const films = this._filmsModel.getAll();
    let filterType = null;
    let filteredFilms = films;

    if (this._filterModel !== null) {
      filterType = this._filterModel.getType();
    }

    if (filterType !== FilterType.ALL && this._type === FilmListType.DEFAULT) {
      filteredFilms = filterTypeToFilms[filterType](films);
    }

    switch (this._currentSortType) {
      case SortType.DATE:
        return sortByDate( filteredFilms );
      case SortType.RATING:
        return sortByRating( filteredFilms );
      case SortType.COMMENTS:
        return sortByComments( filteredFilms );
    }
    return filteredFilms;
  }

  _render() {
    render(this._listComponent, this._listContainerComponent);
    this._renderCards(0, this._shownAmount + this._stepAmount);
    render(this._container, this._listComponent);

    if (this._type !== FilmListType.DEFAULT) {
      return;
    }

    if (this._shownAmount < this._maxAmount) {
      this._renderShowMore();
    }
  }

  _renderCards(from, to) {
    this._getItems()
      .slice(from, to)
      .forEach((item) => {
        const cardPresenter = FilmCardPresenter.create(this._listContainerComponent, item, this._onViewAction);
        cardPresenter.setCardClickHandler(() => this._onDetailsOpen(item));
        this._cardPresenter.set(item.id, cardPresenter);
      });
    this._shownAmount = to;
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
    render(this._listComponent, this._showMoreComponent);

    this._showMoreComponent.setClickHandler(() => {
      this._renderCards(this._shownAmount, this._shownAmount + this._stepAmount);

      if (this._shownAmount >= this._maxAmount) {
        remove(this._showMoreComponent);
        this._showMoreComponent = null;
      }
    });
  }

  _onViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_WATCHED:
      case UserAction.UPDATE_FAVORITE:
      case UserAction.UPDATE_WATCHLIST:
        updateType = actionTypeToFilterType[actionType] === this._filterModel.getType() ? UpdateType.MINOR : updateType;
        this._api.updateFilm(update).then((response) => {
          this._filmsModel.updateById(updateType, response);
        });
        break;
    }
  }

  _onModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._cardPresenter.get(data.id) && this._cardPresenter.get(data.id).update(data);
        break;
      case UpdateType.MINOR:
        this.update();
        break;
      case UpdateType.MAJOR:
        this.update({resetShownAmount: true, resetSortType: true});
        break;
    }
  }

  _onDetailsOpen(item) {
    this._callback.openDetails(item);
  }
}

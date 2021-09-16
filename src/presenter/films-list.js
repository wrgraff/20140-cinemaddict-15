import { render, remove } from '@utils/render.js';
import { sortByRating, sortByComments, sortByDate } from '@utils/films.js';
import { filter } from '@utils/filter.js';
import { UserAction, UpdateType, FilterType } from '@const/common.js';
import { FilmListType, DefaultListSetting, SortType, actionTypeToFilterType } from '@const/films.js';
import FilmsListView from '@view/films-list.js';
import FilmsListExtraView from '@view/films-list-extra.js';
import FilmsListContainerView from '@view/films-list-container.js';
import FilmsListShowMoreView from '@view/films-list-show-more.js';
import FilmCardPresenter from '@presenter/film-card.js';

export default class FilmsList {
  constructor(container, filmsModel, settings = DefaultListSetting, filerModel = null) {
    this._filmsModel = filmsModel;
    this._filterModel = filerModel;
    this._container = container;

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

    this._listContainerComponent = new FilmsListContainerView();
    this._showMoreComponent = null;

    this._cardPresenter = new Map();

    this._callback = {};
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleDetailsOpen = this._handleDetailsOpen.bind(this);

    this._filmsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._render();
  }

  update({resetShownAmount = false, resetSortType = false} = {}) {
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

  _getItems() {
    const films = this._filmsModel.getAll();
    let filterType = null;
    let filteredFilms = films;

    if (this._filterModel !== null) {
      filterType = this._filterModel.getType();
    }

    if (filterType !== FilterType.ALL && this._type === FilmListType.DEFAULT) {
      filteredFilms = filter[filterType](films);
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
        const cardPresenter = FilmCardPresenter.create(this._listContainerComponent, item, this._handleViewAction);
        cardPresenter.setCardClickHandler(() => this._handleDetailsOpen(item));
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

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_WATCHED:
      case UserAction.UPDATE_FAVORITE:
      case UserAction.UPDATE_WATCHLIST:
        updateType = actionTypeToFilterType[actionType] === this._filterModel.getType() ? UpdateType.MINOR : updateType;
        this._filmsModel.updateById(updateType, update);
        break;
    }
  }

  _handleModelEvent(updateType, data) {
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

  _handleDetailsOpen(item) {
    this._callback.openDetails(item);
  }
}

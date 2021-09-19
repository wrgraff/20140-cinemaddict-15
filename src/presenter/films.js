import { render, remove, RenderPlace } from '@utils/render.js';
import { UpdateType } from '@const/common.js';
import { FilmListType, DefaultListSetting, RatingListSetting, CommentsListSetting, FilmListTitle } from '@const/films.js';

import SortView from '@view/sort.js';
import FilmsView from '@view/films.js';
import FilmsListEmptyView from '@view/films-list-empty.js';
import DetailsPresenter from '@presenter/details.js';
import FilmsListPresenter from '@presenter/films-list.js';

export default class Films {
  constructor(container, filmsModel, filterModel, api) {
    this._model = filmsModel;
    this._filterModel = filterModel;
    this._container = container;
    this._isLoading = true;
    this._api = api;

    this._sectionComponent = new FilmsView();
    this._sortComponent = null;
    this._emptyComponent = new FilmsListEmptyView(FilmListTitle.EMPTY);
    this._loadingComponent = new FilmsListEmptyView(FilmListTitle.LOADING);

    this._detailsPresenter = null;
    this._itemsListPresenter = new Map();

    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onDetailsOpen = this._onDetailsOpen.bind(this);
    this._onModelEvent = this._onModelEvent.bind(this);
    this._renderSort = this._renderSort.bind(this);
  }

  init() {
    this._model.addObserver(this._onModelEvent);

    this._detailsPresenter = new DetailsPresenter(this._model, this._api);

    this._itemsListPresenter.set(FilmListType.DEFAULT, new FilmsListPresenter(this._sectionComponent, this._model, DefaultListSetting, this._filterModel, this._api));
    this._itemsListPresenter.set(FilmListType.RATING, new FilmsListPresenter(this._sectionComponent, this._model, RatingListSetting, this._filterModel, this._api));
    this._itemsListPresenter.set(FilmListType.COMMENTS, new FilmsListPresenter(this._sectionComponent, this._model, CommentsListSetting, this._filterModel, this._api));

    this._itemsListPresenter.get(FilmListType.DEFAULT).setReplaceListToEmptyHandler(() => remove(this._sortComponent));
    this._itemsListPresenter.get(FilmListType.DEFAULT).setReplaceEmptyToListHandler(this._renderSort);

    this._render();
  }

  destroy() {
    remove(this._sortComponent);
    remove(this._sectionComponent);
  }

  _renderSort() {
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }

    this._sortComponent = new SortView();
    this._sortComponent.setTypeChangeHandler(this._onSortTypeChange);

    render(this._sectionComponent, this._sortComponent, RenderPlace.BEFORE);
  }

  _renderSection() {
    if (this._isLoading) {
      render(this._sectionComponent, this._loadingComponent);
      render(this._container, this._sectionComponent);
      return;
    }

    if ( this._model.isEmpty() ) {
      render(this._sectionComponent, this._emptyComponent);
      render(this._container, this._sectionComponent);
      return;
    }

    this._itemsListPresenter.forEach((presenter) => {
      presenter.init();
      presenter.setDetailsOpenHandler(this._onDetailsOpen);
    });

    render(this._container, this._sectionComponent);
  }

  _render() {
    this._renderSection();
    this._renderSort();
  }

  _onDetailsOpen(item) {
    this._detailsPresenter.init(item);
  }

  _onSortTypeChange(sortType) {
    this._itemsListPresenter.get(FilmListType.DEFAULT).sort(sortType);
  }

  _onModelEvent(updateType) {
    switch (updateType) {
      case UpdateType.MAJOR:
        remove(this._sortComponent);
        this._renderSort();
        break;

      case UpdateType.INIT:
        this._isLoading = false;
        remove(this._loadingComponent);
        this._renderSection();
        break;
    }
  }

  static create(container, filmsModel, filterModel, api) {
    const filmsPresenter = new this(container, filmsModel, filterModel, api);
    filmsPresenter.init();
    return filmsPresenter;
  }
}

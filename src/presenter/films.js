import { render, remove } from '@utils/render.js';
import { UpdateType } from '@const/common.js';
import { FilmListType, DefaultListSetting, RatingListSetting, CommentsListSetting } from '@const/films.js';

import SortView from '@view/sort.js';
import FilmsView from '@view/films.js';
import DetailsPresenter from '@presenter/details.js';
import FilmsListPresenter from '@presenter/films-list.js';

export default class Films {
  constructor(container, filmsModel, filterModel) {
    this._model = filmsModel;
    this._filterModel = filterModel;
    this._container = container;

    this._sectionComponent = new FilmsView();
    this._sortComponent = null;

    this._detailsPresenter = null;
    this._itemsListPresenter = new Map();

    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onDetailsOpen = this._onDetailsOpen.bind(this);
    this._onModelEvent = this._onModelEvent.bind(this);
  }

  init() {
    this._model.addObserver(this._onModelEvent);

    this._detailsPresenter = new DetailsPresenter(this._model);

    this._itemsListPresenter.set(FilmListType.DEFAULT, new FilmsListPresenter(this._sectionComponent, this._model, DefaultListSetting, this._filterModel));
    this._itemsListPresenter.set(FilmListType.RATING, new FilmsListPresenter(this._sectionComponent, this._model, RatingListSetting, this._filterModel));
    this._itemsListPresenter.set(FilmListType.COMMENTS, new FilmsListPresenter(this._sectionComponent, this._model, CommentsListSetting, this._filterModel));

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

    render(this._container, this._sortComponent);
  }

  _renderSection() {
    if ( this._model.isEmpty() ) {
      this._createList();
      return;
    }

    this._itemsListPresenter.forEach((presenter) => {
      presenter.init();
      presenter.setDetailsOpenHandler(this._onDetailsOpen);
    });

    render(this._container, this._sectionComponent);
  }

  _render() {
    this._renderSort();
    this._renderSection();
  }

  _onDetailsOpen(item) {
    this._detailsPresenter.init(item);
  }

  _onSortTypeChange(sortType) {
    this._itemsListPresenter.get(FilmListType.DEFAULT).sort(sortType);
  }

  _onModelEvent(updateType) {
    if (updateType === UpdateType.MAJOR) {
      remove(this._sortComponent);
      this._renderSort();
    }
  }

  static create(container, filmsModel, filterModel) {
    const filmsPresenter = new this(container, filmsModel, filterModel);
    filmsPresenter.init();
    return filmsPresenter;
  }
}

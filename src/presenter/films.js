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

    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleDetailsOpen = this._handleDetailsOpen.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
  }

  init() {
    this._model.addObserver(this._handleModelEvent);

    this._detailsPresenter = new DetailsPresenter(this._model);

    this._itemsListPresenter.set(FilmListType.DEFAULT, new FilmsListPresenter(this._sectionComponent, this._model, DefaultListSetting, this._filterModel));
    this._itemsListPresenter.set(FilmListType.RATING, new FilmsListPresenter(this._sectionComponent, this._model, RatingListSetting, this._filterModel));
    this._itemsListPresenter.set(FilmListType.COMMENTS, new FilmsListPresenter(this._sectionComponent, this._model, CommentsListSetting, this._filterModel));

    this._render();
  }

  _renderSort() {
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }

    this._sortComponent = new SortView();
    this._sortComponent.setTypeChangeHandler(this._handleSortTypeChange);

    render(this._container, this._sortComponent);
  }

  _renderSection() {
    if (this._model.getAll().length === 0) {
      this._createList();
      return;
    }

    this._itemsListPresenter.forEach((presenter) => {
      presenter.init();
      presenter.setDetailsOpenHandler(this._handleDetailsOpen);
    });

    render(this._container, this._sectionComponent);
  }

  _render() {
    this._renderSort();
    this._renderSection();
  }

  _handleDetailsOpen(item) {
    this._detailsPresenter.init(item);
  }

  _handleSortTypeChange(sortType) {
    this._itemsListPresenter.get(FilmListType.DEFAULT).sort(sortType);
  }

  _handleModelEvent(updateType) {
    if (updateType === UpdateType.MAJOR) {
      remove(this._sortComponent);
      this._renderSort();
    }
  }

  static create(container, filmsModel, filterModel) {
    const filmsPresenter = new this(container, filmsModel, filterModel);
    filmsPresenter.init();
  }
}

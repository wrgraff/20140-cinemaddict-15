import { render } from '@utils/render.js';
import { Title, StepAmount, Type } from '@const/films.js';
import { SortType } from '@const/films.js';

import SortView from '@view/sort.js';
import FilmsView from '@view/films.js';
import DetailsPresenter from '@presenter/details.js';
import FilmsListPresenter from '@presenter/films-list.js';

export default class Films {
  constructor(container) {
    this._container = container;

    this._sectionComponent = new FilmsView();
    this._sortComponent = new SortView();

    this._detailsPresenter = null;
    this._itemsListPresenter = new Map();

    this._handleItemChange = this._handleItemChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(items) {
    this._items = items;

    this._detailsPresenter = new DetailsPresenter(this._handleItemChange);

    this._itemsListPresenter.set(Type.DEFAULT, new FilmsListPresenter(this._sectionComponent, this._detailsPresenter));
    this._itemsListPresenter.set(Type.RATING, new FilmsListPresenter(this._sectionComponent, this._detailsPresenter, Type.RATING, Title.RATING, SortType.RATING, StepAmount.EXTRA, StepAmount.EXTRA));
    this._itemsListPresenter.set(Type.COMMENTS, new FilmsListPresenter(this._sectionComponent, this._detailsPresenter, Type.COMMENTS, Title.COMMENTS, SortType.COMMENTS, StepAmount.EXTRA, StepAmount.EXTRA));

    this._render();
  }

  _renderSort() {
    render(this._container, this._sortComponent);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderListEmpty() {
    render(this._container, this._listEmptyComponent);
  }

  _renderSection() {
    if (this._items.length === 0) {
      this._createList();
      return;
    }

    this._itemsListPresenter.forEach((presenter) => {
      presenter.init(this._items);
      presenter.setFilmChangeHandler(this._handleItemChange);
    });

    render(this._container, this._sectionComponent);
  }

  _render() {
    this._renderSort();
    this._renderSection();
  }

  _handleItemChange(changedFilm) {
    this._itemsListPresenter.forEach((presenter) => presenter.update(changedFilm));
    this._detailsPresenter.update(changedFilm);
  }

  _handleSortTypeChange(sortType) {
    this._itemsListPresenter.get(Type.DEFAULT).sort(sortType);
  }

  static create(container, films) {
    const filmsPresenter = new this(container);
    filmsPresenter.init(films);
  }
}

import { UpdateType } from '@const/common.js';
import { render, replace } from '@utils/render.js';
import { getFilters } from '@utils/filter.js';
import MainNavigationView from '@view/main-navigation.js';

export default class Filter {
  constructor(container, filterModel, filmsModel) {
    this._container = container;
    this._filterModel = filterModel;
    this._filmsModel = filmsModel;

    this._navigationComponent = null;
  }

  init() {
    const filters = getFilters( this._filmsModel.getItems() );
    this._navigationComponent = new MainNavigationView(filters);
    render(this._container, this._navigationComponent);
  }

  update() {
    const filters = getFilters( this._filmsModel.getItems() );
    const prevNavigationComponent = this._navigationComponent;

    this._navigationComponent = new MainNavigationView(filters);
    replace(this._navigationComponent, prevNavigationComponent);
    removeEventListener(prevNavigationComponent);
  }

  _handleModelEvent() {
    this.update();
  }

  _handleTypeChange(type) {
    if (this._filterModel.getType() === type) {
      return;
    }

    this._filterModel.setType(UpdateType.MAJOR, type);
  }

  static create(container, filterModel, filmsModel) {
    const filterPresenter = new this(container, filterModel, filmsModel);
    filterPresenter.init();
  }
}

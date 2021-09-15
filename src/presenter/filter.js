import { UpdateType } from '@const/common.js';
import { render, remove, replace } from '@utils/render.js';
import { getFilters } from '@utils/filter.js';
import MainNavigationView from '@view/main-navigation.js';

export default class Filter {
  constructor(container, filterModel, filmsModel) {
    this._container = container;
    this._filterModel = filterModel;
    this._filmsModel = filmsModel;

    this._navigationComponent = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleTypeChange = this._handleTypeChange.bind(this);

    this._filterModel.addObserver(this._handleModelEvent);
    this._filmsModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._createNavigationComponent();
    render(this._container, this._navigationComponent);
  }

  update() {
    const prevNavigationComponent = this._navigationComponent;

    this._createNavigationComponent();
    replace(this._navigationComponent, prevNavigationComponent);
    remove(prevNavigationComponent);
  }

  _createNavigationComponent() {
    const filters = getFilters( this._filmsModel.getAll() );
    this._navigationComponent = new MainNavigationView( filters, this._filterModel.getType() );
    this._navigationComponent.setFilterTypeChangeHandler(this._handleTypeChange);
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

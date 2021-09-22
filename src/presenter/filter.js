import { UpdateType } from '@const/common.js';
import { render, remove, replace } from '@utils/render.js';
import { getFilters } from '@utils/filter.js';
import MainNavigationView from '@view/main-navigation.js';

export default class Filter {
  constructor(container, filterModel, filmsModel) {
    this._container = container;
    this._model = filterModel;
    this._filmsModel = filmsModel;
    this._isStatisticActive = false;
    this._callback = {};

    this._navigationComponent = null;

    this._onModelEvent = this._onModelEvent.bind(this);
    this._onTypeChange = this._onTypeChange.bind(this);
    this._onMenuStatisticClick = this._onMenuStatisticClick.bind(this);

    this._model.addObserver(this._onModelEvent);
    this._filmsModel.addObserver(this._onModelEvent);
  }

  setStatisticsMenuItemClickHandler(callback) {
    this._callback.clickStatisticsMenuItem = callback;
  }

  setMenuItemClickHandler(callback) {
    this._callback.clickFilterMenuItem = callback;
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
    this._navigationComponent = new MainNavigationView( filters, this._model.getType(), this._isStatisticActive );
    this._navigationComponent.setFilterTypeChangeHandler(this._onTypeChange);
    this._navigationComponent.setAdditionalClickHandler(this._onMenuStatisticClick);
  }

  _onModelEvent() {
    this.update();
  }

  _onTypeChange(type) {
    if (this._isStatisticActive) {
      this._callback.clickFilterMenuItem();
      this._isStatisticActive = false;
    }

    if (this._model.getType() === type) {
      return;
    }

    this._model.setType(UpdateType.MAJOR, type);
  }

  _onMenuStatisticClick() {
    this._isStatisticActive = true;
    this._callback.clickStatisticsMenuItem();
    this.update();
  }

  static create(container, filterModel, filmsModel) {
    const filterPresenter = new this(container, filterModel, filmsModel);
    filterPresenter.init();
    return filterPresenter;
  }
}

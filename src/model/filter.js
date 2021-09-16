import AbstractObserver from '@utils/abstract-observer.js';
import { FilterType } from '@const/common.js';

export default class Filter extends AbstractObserver {
  constructor() {
    super();
    this._currentType = FilterType.ALL;
  }

  setType(updateType, type) {
    this._currentType = type;
    this._notify(updateType, type);
  }

  getType() {
    return this._currentType;
  }
}

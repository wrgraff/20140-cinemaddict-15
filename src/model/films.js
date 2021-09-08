import AbstractObserver from '@utils/abstract-observer';

export default class Films extends AbstractObserver {
  constructor() {
    super();
    this._items = [];
  }

  setItems(items) {
    this._items = items.slice();
  }

  getItems() {
    return this._items;
  }
}

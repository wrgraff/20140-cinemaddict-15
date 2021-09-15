import AbstractObserver from '@utils/abstract-observer.js';

export default class Films extends AbstractObserver {
  constructor() {
    super();
    this._items = [];
  }

  set(items) {
    this._items = items.slice();
  }

  getAll() {
    return this._items;
  }

  updateById(updateType, updatedItem) {
    const index = this._items.findIndex((item) => item.id === updatedItem.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting film');
    }

    this._items = [
      ...this._items.slice(0, index),
      updatedItem,
      ...this._items.slice(index + 1),
    ];

    this._notify(updateType, updatedItem);
  }
}

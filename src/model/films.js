import AbstractObserver from '@utils/abstract-observer.js';

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

  updateItemById(updateType, updatedItem) {
    const index = this._items.findIndex((item) => item.id === updatedItem.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting task');
    }

    this._items = [
      ...this._items.slice(0, index),
      updatedItem,
      ...this._items.slice(index + 1),
    ];

    this._notify(updateType, updatedItem);
  }
}

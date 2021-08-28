import { render, remove } from '@utils/render.js';
import { isEscapeEvent } from '@utils/dom-event.js';

import DetailsView from '@view/details.js';

export default class Details {
  constructor() {
    this._component = null;

    this._remove = this._remove.bind(this);
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  init(film) {
    if (this._component !== null) {
      remove(this._component);
    }

    this._component = new DetailsView(film);
    this._open();
  }

  _open() {
    render(document.body, this._component);
    document.body.classList.add('hide-overflow');
    document.addEventListener('keydown', this._onEscKeyDown);
    this._component.setOnCloseButtonClick(this._remove);
  }

  _remove() {
    remove(this._component);
    document.body.classList.remove('hide-overflow');
    document.removeEventListener('keydown', this._onEscKeyDown);
  }

  _onEscKeyDown(evt) {
    if ( isEscapeEvent(evt) ) {
      evt.preventDefault();
      this._remove();
      document.removeEventListener('keydown', this._onEscKeyDown);
    }
  }
}

import { createElement } from '@utils/render.js';

const createFilmsListShowMoreTemplate = () => ('<button class="films-list__show-more">Show more</button>');

export default class FilmsListShowMore {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFilmsListShowMoreTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement( this.getTemplate() );
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

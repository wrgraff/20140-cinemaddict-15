import { createElement } from '@utils/render.js';

const createFilmsListTemplate = (title) => (`
  <section class="films-list">
    <h2 class="films-list__title">${title}</h2>
  </section>
`);

export default class FilmsListEmpty {
  constructor(title) {
    this._title = title;
    this._element = null;
  }

  getTemplate() {
    return createFilmsListTemplate(this._title);
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

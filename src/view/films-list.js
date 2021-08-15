import { render, RenderPlace, createElement } from '@utils/render.js';
import FilmsListContainerView from '@view/films-list-container.js';

const createFilmsListTemplate = (title) => (`
  <section class="films-list">
    <h2 class="films-list__title visually-hidden">${title}</h2>
  </section>
`);

export default class FilmsList {
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
      render( this._element, new FilmsListContainerView().getElement(), RenderPlace.BEFORE_END );
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

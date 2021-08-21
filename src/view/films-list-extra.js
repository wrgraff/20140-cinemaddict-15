import AbstractView from '@view/abstract.js';
import { render, RenderPlace, createElement } from '@utils/render.js';
import FilmsListContainerView from '@view/films-list-container.js';

const createFilmsListTemplate = (title) => (`
  <section class="films-list films-list--extra">
    <h2 class="films-list__title">${title}</h2>
  </section>
`);

export default class FilmsListExtra extends AbstractView {
  constructor(title) {
    super();
    this._title = title;
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
}

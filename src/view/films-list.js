import { render, RenderPlace, createElement } from '@utils/render.js';
import FilmsListContainerView from '@view/films-list-container.js';

const createFilmsListTemplate = ( title, isExtra ) => (`
  <section class="films-list ${isExtra ? 'films-list--extra' : ''}">
    <h2 class="films-list__title ${isExtra ? '' : 'visually-hidden'}">${title}</h2>
  </section>
`);

export default class FilmsList {
  constructor( title, isExtra ) {
    this._title = title;
    this._isExtra = isExtra;
    this._element = null;
    this._container = null;
  }

  getTemplate() {
    return createFilmsListTemplate( this._title, this._isExtra );
  }

  getElement() {
    if (!this._element) {
      this._element = createElement( this.getTemplate() );
    }

    return this._element;
  }

  getContainer() {
    if (!this._container) {
      this._container = new FilmsListContainerView().getElement();
      render( this.getElement(), this._container, RenderPlace.BEFORE_END );
    }

    return this._container;
  }

  removeElement() {
    this._element = null;
  }
}

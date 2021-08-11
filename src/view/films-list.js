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
  }

  getTemplate() {
    return createFilmsListTemplate( this._title, this._isExtra );
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

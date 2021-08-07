import { createFilmsListShowMoreTemplate } from '@view/films-list-show-more.js';
import { createFilmsListContainerTemplate } from '@view/films-list-container.js';

export const createFilmsListTemplate = ( title, isExtra ) => (`
  <section class="films-list ${isExtra ? 'films-list--extra' : ''}">
    <h2 class="films-list__title ${isExtra ? '' : 'visually-hidden'}">${title}</h2>

    ${createFilmsListContainerTemplate()}
    ${isExtra ? '' : createFilmsListShowMoreTemplate()}
  </section>
`);

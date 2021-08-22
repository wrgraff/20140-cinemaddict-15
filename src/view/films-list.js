import AbstractView from '@view/abstract.js';

const createFilmsListTemplate = (title) => (`
  <section class="films-list">
    <h2 class="films-list__title visually-hidden">${title}</h2>
  </section>
`);

export default class FilmsList extends AbstractView {
  constructor(title) {
    super();
    this._title = title;
  }

  getTemplate() {
    return createFilmsListTemplate(this._title);
  }
}

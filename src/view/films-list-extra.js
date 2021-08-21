import AbstractView from '@view/abstract.js';

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
}

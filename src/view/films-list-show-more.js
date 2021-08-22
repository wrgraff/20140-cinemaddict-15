import AbstractView from '@view/abstract.js';

const createFilmsListShowMoreTemplate = () => ('<button class="films-list__show-more">Show more</button>');

export default class FilmsListShowMore extends AbstractView {
  constructor() {
    super();
    this._onClick = this._onClick.bind(this);
  }

  getTemplate() {
    return createFilmsListShowMoreTemplate();
  }

  setOnClick(callback) {
    this._callback.click = callback;
    this.getElement().addEventListener('click', this._onClick);
  }

  _onClick(evt) {
    evt.preventDefault();
    this._callback.click();
  }
}

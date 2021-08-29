import AbstractView from '@view/abstract.js';

const createFilmsListShowMoreTemplate = () => ('<button class="films-list__show-more">Show more</button>');

export default class FilmsListShowMore extends AbstractView {
  constructor() {
    super();
    this._handleClick = this._handleClick.bind(this);
  }

  getTemplate() {
    return createFilmsListShowMoreTemplate();
  }

  setClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().addEventListener('click', this._handleClick);
  }

  _handleClick(evt) {
    evt.preventDefault();
    this._callback.click();
  }
}

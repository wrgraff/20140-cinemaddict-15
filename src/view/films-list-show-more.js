import AbstractView from '@view/abstract.js';

const createFilmsListShowMoreTemplate = () => '<button class="films-list__show-more">Show more</button>';

export default class FilmsListShowMore extends AbstractView {
  constructor() {
    super();
    this._onButtonClick = this._onButtonClick.bind(this);
  }

  setClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().addEventListener('click', this._onButtonClick);
  }

  getTemplate() {
    return createFilmsListShowMoreTemplate();
  }

  _onButtonClick(evt) {
    evt.preventDefault();
    this._callback.click();
  }
}

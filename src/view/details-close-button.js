import AbstractView from '@view/abstract.js';

const createDetailsCloseButtonTemplate = () => ('<button class="film-details__close-btn" type="button">close</button>');

export default class DetailsCloseButton extends AbstractView {
  constructor() {
    super();
    this._clickHandler = this._clickHandler.bind(this);
  }

  getTemplate() {
    return createDetailsCloseButtonTemplate();
  }

  setClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().addEventListener('click', this._clickHandler);
  }

  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.click();
  }
}

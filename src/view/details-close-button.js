import AbstractView from '@view/abstract.js';

const createDetailsCloseButtonTemplate = () => ('<button class="film-details__close-btn" type="button">close</button>');

export default class DetailsCloseButton extends AbstractView {
  constructor() {
    super();
    this._onClick = this._onClick.bind(this);
  }

  getTemplate() {
    return createDetailsCloseButtonTemplate();
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

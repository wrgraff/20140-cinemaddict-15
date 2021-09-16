import AbstractView from '@view/abstract.js';

const createDetailsCloseButtonTemplate = () => (`
  <div class="film-details__close">
    <button class="film-details__close-btn" type="button">close</button>
  </div>
`);

export default class DetailsCloseButton extends AbstractView {
  constructor() {
    super();
    this._handleCloseBtnClick = this._handleCloseBtnClick.bind(this);
  }

  getTemplate() {
    return createDetailsCloseButtonTemplate();
  }

  setClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().querySelector('.film-details__close-btn').addEventListener('click', this._handleCloseBtnClick);
  }

  _handleCloseBtnClick(evt) {
    evt.preventDefault();
    this._callback.click();
  }
}

import AbstractView from '@view/abstract.js';
import { createElement, render } from '@utils/render.js';
import DetailsInfoView from '@view/details-info.js';
import DetailsControlsView from '@view/details-controls.js';
import DetailsCommentsView from '@view/details-comments.js';
import DetailsCloseButtonView from '@view/details-close-button.js';

const createDetailsTemplate = () => (`
  <section class="film-details">
    <form class="film-details__inner" action="" method="get">
      <div class="film-details__top-container">
        <div class="film-details__close"></div>
      </div>

      <div class="film-details__bottom-container"></div>
    </form>
  </section>
`);

export default class Details extends AbstractView {
  constructor(film) {
    super();
    this._film = film;
    this._onCloseButtonClick = this._onCloseButtonClick.bind(this);
  }

  getTemplate() {
    return createDetailsTemplate();
  }

  getElement() {
    if (this._element === null) {
      this._element = createElement( this.getTemplate() );
      this._closeButton = new DetailsCloseButtonView();
      this._info = new DetailsInfoView(this._film);
      this._controls = new DetailsControlsView(this._film);
      this._comments = new DetailsCommentsView(this._film.comments);

      this._topContainer = this._element.querySelector('.film-details__top-container');
      this._bottomContainer = this._element.querySelector('.film-details__bottom-container');
      this._closeButtonContainer = this._element.querySelector('.film-details__close');

      render(this._topContainer, this._info);
      render(this._topContainer, this._controls);
      render(this._bottomContainer, this._comments);
      render(this._closeButtonContainer, this._closeButton);
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
    this._closeButton.removeElement();
    this._info.removeElement();
    this._controls.removeElement();
    this._comments.removeElement();
  }

  setOnCloseButtonClick(callback) {
    this._callback.closeButtonClick = callback;
    this._closeButton.getElement().addEventListener('click', this._onCloseButtonClick);
  }

  _onCloseButtonClick(evt) {
    evt.preventDefault();
    this._callback.closeButtonClick();
  }
}

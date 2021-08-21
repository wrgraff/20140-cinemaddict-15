import AbstractView from '@view/abstract.js';
import { createElement } from '@utils/render.js';
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
    if (!this._element) {
      this._element = createElement( this.getTemplate() );
      this._closeButton = new DetailsCloseButtonView().getElement();

      this._topContainer = this._element.querySelector('.film-details__top-container');
      this._bottomContainer = this._element.querySelector('.film-details__bottom-container');
      this._closeButtonContainer = this._element.querySelector('.film-details__close');

      this._topContainer.append( new DetailsInfoView(this._film).getElement() );
      this._topContainer.append( new DetailsControlsView(this._film).getElement() );
      this._bottomContainer.append( new DetailsCommentsView(this._film.comments).getElement() );
      this._closeButtonContainer.append(this._closeButton);
    }

    return this._element;
  }

  _onCloseButtonClick(evt) {
    evt.preventDefault();
    this._callback.closeButtonClick();
  }

  setOnCloseButtonClick(callback) {
    this._callback.closeButtonClick = callback;
    this._closeButton.addEventListener('click', this._onCloseButtonClick);
  }
}

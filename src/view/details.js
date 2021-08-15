import { createElement } from '@utils/render.js';
import DetailsInfoView from '@view/details-info.js';
import DetailsControlsView from '@view/details-controls.js';
import DetailsCommentsView from '@view/details-comments.js';

const createDetailsTemplate = () => (`
  <section class="film-details">
    <form class="film-details__inner" action="" method="get">
      <div class="film-details__top-container">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
      </div>

      <div class="film-details__bottom-container"></div>
    </form>
  </section>
`);

export default class Details {
  constructor(film) {
    this._film = film;
    this._element = null;
  }

  getTemplate() {
    return createDetailsTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement( this.getTemplate() );

      this._topContainer = this._element.querySelector('.film-details__top-container');
      this._bottomContainer = this._element.querySelector('.film-details__bottom-container');

      this._topContainer.append( new DetailsInfoView(this._film).getElement() );
      this._topContainer.append( new DetailsControlsView(this._film).getElement() );
      this._bottomContainer.append( new DetailsCommentsView(this._film.comments).getElement() );
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

import AbstractView from '@view/abstract.js';

const createDetailsTopTemplate = () => '<div class="film-details__top-container"></div>';

export default class DetailsTop extends AbstractView {
  getTemplate() {
    return createDetailsTopTemplate();
  }
}

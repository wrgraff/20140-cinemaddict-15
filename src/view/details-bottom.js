import AbstractView from '@view/abstract.js';

const createDetailsBottomTemplate = () => ('<div class="film-details__bottom-container"></div>');

export default class DetailsBottom extends AbstractView {
  getTemplate() {
    return createDetailsBottomTemplate();
  }
}

import AbstractView from '@view/abstract.js';

const createDetailsCloseButtonTemplate = () => ('<button class="film-details__close-btn" type="button">close</button>');

export default class DetailsCloseButton extends AbstractView {
  getTemplate() {
    return createDetailsCloseButtonTemplate();
  }
}

import AbstractView from '@view/abstract.js';

const createDetailsTemplate = () => ('<section class="film-details"></section>');

export default class Details extends AbstractView {
  getTemplate() {
    return createDetailsTemplate();
  }
}

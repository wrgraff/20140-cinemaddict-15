import AbstractView from '@view/abstract.js';

const createFilmsTemplate = () => ('<section class="films"></section>');

export default class Films extends AbstractView {
  getTemplate() {
    return createFilmsTemplate();
  }
}

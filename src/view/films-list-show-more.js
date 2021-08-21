import AbstractView from '@view/abstract.js';

const createFilmsListShowMoreTemplate = () => ('<button class="films-list__show-more">Show more</button>');

export default class FilmsListShowMore extends AbstractView {
  getTemplate() {
    return createFilmsListShowMoreTemplate();
  }
}

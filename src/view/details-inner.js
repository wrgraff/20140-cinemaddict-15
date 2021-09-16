import AbstractView from '@view/abstract.js';

const createDetailsInnerTemplate = () => ('<form class="film-details__inner" action="" method="get"></form>');

export default class DetailsInner extends AbstractView {
  getTemplate() {
    return createDetailsInnerTemplate();
  }
}

import AbstractView from '@view/abstract.js';

const createDetailsCommentsTemplate = (amount) => (`
  <section class="film-details__comments-wrap">
    <h3 class="film-details__comments-title">
      Comments <span class="film-details__comments-count">${amount}</span>
    </h3>
  </section>
`);

export default class DetailsComments extends AbstractView {
  constructor(filmComments) {
    super();
    this._filmComments = filmComments;
  }

  getTemplate() {
    return createDetailsCommentsTemplate(this._filmComments.length);
  }
}

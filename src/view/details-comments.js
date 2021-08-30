import AbstractView from '@view/abstract.js';
import DetailsCommentNewView from '@view/details-comment-new.js';
import DetailsCommentsListView from '@view/details-comments-list.js';

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

  getElement() {
    super.getElement().append( new DetailsCommentsListView(this._filmComments).getElement() );
    super.getElement().append( new DetailsCommentNewView().getElement() );

    return this._element;
  }
}

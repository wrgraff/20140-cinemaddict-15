import { createElement } from '@utils/render.js';
import DetailsCommentNewView from '@view/details-comment-new.js';
import DetailsCommentsListView from '@view/details-comments-list.js';

const createDetailsCommentsTemplate = ( amount ) => (`
  <section class="film-details__comments-wrap">
    <h3 class="film-details__comments-title">
      Comments <span class="film-details__comments-count">${ amount }</span>
    </h3>
  </section>
`);

export default class DetailsComments {
  constructor( filmComments ) {
    this._filmComments = filmComments;
    this._element = null;
  }

  getTemplate() {
    return createDetailsCommentsTemplate( this._filmComments.length );
  }

  getElement() {
    if (!this._element) {
      this._element = createElement( this.getTemplate() );
      this._element.append( new DetailsCommentsListView(this._filmComments).getElement() );
      this._element.append( new DetailsCommentNewView().getElement() );
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

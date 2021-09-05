import { createElement } from '@utils/render.js';
import AbstractView from '@view/abstract.js';
import DetailsCommentView from '@view/details-comment.js';
import { COMMENT_COUNT } from '@const/comments.js';
import { generateComment } from '@mock/comment.js';

const comments = new Array(COMMENT_COUNT).fill('').map(generateComment);

const createDetailsCommentsListTemplate = () => ('<ul class="film-details__comments-list"></ul>');

export default class DetailsCommentsList extends AbstractView {
  constructor(filmComments) {
    super();
    this._filmComments = filmComments;
  }

  getTemplate() {
    return createDetailsCommentsListTemplate();
  }

  getElement() {
    if (this._element === null) {
      this._element = createElement( this.getTemplate() );
    }

    this._filmComments.forEach((commentId) => (
      this._element.append( new DetailsCommentView( comments[commentId] ).getElement() )
    ));

    return this._element;
  }
}

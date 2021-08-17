import { createElement } from '@utils/render.js';

const createDetailsCommentTemplate = (comment) => (`
  <li class="film-details__comment">
    <span class="film-details__comment-emoji">
      <img src="./images/emoji/${comment.emotion}.png" width="55" height="55" alt="emoji-${comment.emotion}">
    </span>
    <div>
      <p class="film-details__comment-text">${comment.text}</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">${comment.name}</span>
        <span class="film-details__comment-day">${comment.date}</span>
        <button class="film-details__comment-delete">Delete</button>
      </p>
    </div>
  </li>
`);

export default class DetailsComment {
  constructor(comment) {
    this._comment = comment;
    this._element = null;
  }

  getTemplate() {
    return createDetailsCommentTemplate(this._comment);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement( this.getTemplate() );
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

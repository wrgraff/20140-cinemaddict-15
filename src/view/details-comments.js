import he from 'he';
import dayjs from 'dayjs';
import AbstractView from '@view/abstract.js';

const createDetailsCommentTemplate = ({ id, emotion, name, text, date }, isDeleting, deletingId) => (`
  <li class="film-details__comment">
    <span class="film-details__comment-emoji">
      <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-${emotion}">
    </span>
    <div>
      <p class="film-details__comment-text">${text}</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">${name}</span>
        <span class="film-details__comment-day">${date}</span>
        <button class="film-details__comment-delete" data-comment-id="${id}"${ isDeleting && deletingId === id ? 'disabled' : ''} >${ isDeleting && deletingId === id ? 'Deleting...' : 'Delete'}</button>
      </p>
    </div>
  </li>
`);

const createDetailsCommentsTemplate = (isLoading, comments, amount, isDeleting, deletingId) => (`
  <section class="film-details__comments-wrap">
    <h3 class="film-details__comments-title">
      Comments <span class="film-details__comments-count">${isLoading ? 'Loading...' : amount}</span>
    </h3>

    <ul class="film-details__comments-list">${ isLoading && amount > 0 ? '' : comments.map((comment) => createDetailsCommentTemplate(comment, isDeleting, deletingId)).join('') }</ul>
  </section>
`);

export default class DetailsComments extends AbstractView {
  constructor(comments = [], isLoading = true, isDeleting = false, deletingId = 0) {
    super();
    this._isLoading = isLoading;
    this._isDeleting = isDeleting;
    this._deletingId = deletingId;
    this._comments = comments.map(DetailsComments.parseCommentsToData);
    this._amount = comments.length;

    this._onCommentsListClick = this._onCommentsListClick.bind(this);
  }

  setCommentsListClickHandler(callback) {
    this._callback.clickCommentDelete = callback;
    this.getElement().querySelector('.film-details__comments-list').addEventListener('click', this._onCommentsListClick);
  }

  getTemplate() {
    return createDetailsCommentsTemplate(this._isLoading, this._comments, this._amount, this._isDeleting, this._deletingId);
  }

  _onCommentsListClick(evt) {
    if (evt.target.tagName === 'BUTTON') {
      evt.preventDefault();
      this._callback.clickCommentDelete(evt.target.dataset.commentId);
    }
  }

  static parseCommentsToData(comment) {
    return Object.assign(
      {},
      comment,
      {
        text: he.encode(comment.text),
        date: dayjs(comment.date).format('YYYY/MM/DD HH:MM'),
      },
    );
  }
}

import dayjs from 'dayjs';
import AbstractView from '@view/abstract.js';

const createDetailsCommentTemplate = (data) => (`
  <li class="film-details__comment">
    <span class="film-details__comment-emoji">
      <img src="./images/emoji/${data.emotion}.png" width="55" height="55" alt="emoji-${data.emotion}">
    </span>
    <div>
      <p class="film-details__comment-text">${data.text}</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">${data.name}</span>
        <span class="film-details__comment-day">${data.date}</span>
        <button class="film-details__comment-delete">Delete</button>
      </p>
    </div>
  </li>
`);

export default class DetailsComment extends AbstractView {
  constructor(comment) {
    super();
    this._data = DetailsComment.parseCommentToData(comment);
  }

  getTemplate() {
    return createDetailsCommentTemplate(this._data);
  }

  static parseCommentToData(comment) {
    return Object.assign(
      {},
      comment,
      {
        date: dayjs(comment.date).format('YYYY/MM/DD HH:MM'),
      },
    );
  }
}

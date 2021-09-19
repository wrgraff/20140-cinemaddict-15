import he from 'he';
import dayjs from 'dayjs';
import SmartView from '@view/smart.js';

const createDetailsCommentTemplate = (comment) => (`
  <li class="film-details__comment">
    <span class="film-details__comment-emoji">
      <img src="./images/emoji/${comment.emotion}.png" width="55" height="55" alt="emoji-${comment.emotion}">
    </span>
    <div>
      <p class="film-details__comment-text">${he.encode(comment.text)}</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">${comment.name}</span>
        <span class="film-details__comment-day">${comment.date}</span>
        <button class="film-details__comment-delete">Delete</button>
      </p>
    </div>
  </li>
`);

const createDetailsCommentsTemplate = ({ isLoading, amount, comments }) => (`
  <section class="film-details__comments-wrap">
    <h3 class="film-details__comments-title">
      Comments <span class="film-details__comments-count">${isLoading ? 'Loading...' : amount}</span>
    </h3>

    <ul class="film-details__comments-list">${ isLoading && amount !== 0 ? '' : comments.map( (comment) => createDetailsCommentTemplate(comment) ).join('') }</ul>
  </section>
`);

export default class DetailsComments extends SmartView {
  constructor() {
    super();
    this._data = DetailsComments.parseCommentsToData({ comments: [] });
  }

  getTemplate() {
    return createDetailsCommentsTemplate(this._data);
  }

  restoreHandlers() {
    // Тут будет восстановление обработчиков на кнопках удаления
    // Это получается Smart View не может жить без обработчиков. Чушь какая-то, его ж можно апдейтить снаружи (недаром же updateData публичный)
  }

  static parseCommentsToData({ comments, isLoading = true }) {
    return {
      comments: comments.map((comment) => Object.assign(
        {},
        comment,
        {
          name: comment.author,
          text: comment.comment,
          date: dayjs(comment.date).format('YYYY/MM/DD HH:MM'),
        },
      )),
      isLoading,
      amount: comments.length,
    };
  }
}

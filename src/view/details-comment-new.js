import { EMOTIONS } from '@const/comments.js';
import SmartView from '@view/smart.js';

const BLANK_COMMENT = {
  text: '',
  emotion: '',
};

const createDetailsEmotionsList = (activeEmotion) => (
  EMOTIONS
    .map((emotion) => (`
      <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emotion}" value="${emotion}" ${emotion === activeEmotion ? 'checked' : ''}>
      <label class="film-details__emoji-label" for="emoji-${emotion}">
        <img src="./images/emoji/${emotion}.png" width="30" height="30" alt="emoji">
      </label>
    `))
    .join('')
);

const createDetailsCommentNewTemplate = ({ isActiveEmotion, emotion, text }) => (`
  <div class="film-details__new-comment">
    <div class="film-details__add-emoji-label">
      ${isActiveEmotion ? `<img src="images/emoji/${emotion}.png" width="55" height="55" alt="emoji-smile">` : ''}
    </div>

    <label class="film-details__comment-label">
      <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${text}</textarea>
    </label>

    <div class="film-details__emoji-list">
      ${createDetailsEmotionsList(emotion)}
    </div>
  </div>
`);

export default class DetailsCommentNew extends SmartView {
  constructor(comment = BLANK_COMMENT) {
    super();
    this._data = DetailsCommentNew.parseCommentToData(comment);

    this._textInputHandler = this._textInputHandler.bind(this);
    this._emotionSelectHandler = this._emotionSelectHandler.bind(this);

    this._setInnerHandlers();
  }

  getTemplate() {
    return createDetailsCommentNewTemplate(this._data);
  }

  restoreHandlers() {
    this._setInnerHandlers();
  }

  _setInnerHandlers() {
    const element = this.getElement();
    element.querySelector('.film-details__emoji-list').addEventListener('change', this._emotionListChangeHandler);
    element.querySelector('.film-details__comment-input').addEventListener('input', this._commentInputHandler);
  }

  _emotionListChangeHandler(evt) {
    this.updateData({
      emotion: evt.target.value,
      isActiveEmotion: true,
    });
  }

  _commentInputHandler(evt) {
    this.updateData({
      text: evt.target.value,
    }, true);
  }

  static parseCommentToData(comment) {
    return Object.assign(
      {},
      comment,
      {
        isActiveEmotion: comment.emotion !== '',
      },
    );
  }

  static parseDataToComment({ isActiveEmotion, ...comment }) {
    if (!isActiveEmotion) {
      comment.emotion = '';
    }

    return comment;
  }
}

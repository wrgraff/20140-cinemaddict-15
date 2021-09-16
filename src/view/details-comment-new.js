import he from 'he';
import { EMOTIONS, BLANK_COMMENT } from '@const/comments.js';
import SmartView from '@view/smart.js';
import { isCommandEnterEvent, isControlEnterEvent } from '@utils/dom-event.js';

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
      ${isActiveEmotion ? `<img src="images/emoji/${emotion}.png" width="55" height="55" alt="emoji-${emotion}">` : ''}
    </div>

    <label class="film-details__comment-label">
      <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${he.encode(text)}</textarea>
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

    this._inputComment = this._inputComment.bind(this);
    this._changeEmojiList = this._changeEmojiList.bind(this);
    this._submitForm = this._submitForm.bind(this);

    this._setInnerHandlers();
  }

  getTemplate() {
    return createDetailsCommentNewTemplate(this._data);
  }

  setFormSubmitHandler(callback) {
    this._callback.submitForm = callback;
  }

  restoreHandlers() {
    this._setInnerHandlers();
  }

  _setInnerHandlers() {
    const element = this.getElement();
    element.querySelector('.film-details__emoji-list').addEventListener('change', this._changeEmojiList);
    document.addEventListener('input', this._inputComment);
    document.addEventListener('keydown', this._submitForm);
  }

  _changeEmojiList(evt) {
    this.updateData({
      emotion: evt.target.value,
      isActiveEmotion: true,
    });
  }

  _inputComment(evt) {
    this.updateData({
      text: evt.target.value,
    }, true);
  }

  _submitForm(evt) {
    if ( isCommandEnterEvent(evt) || isControlEnterEvent(evt) ) {
      evt.preventDefault();
      if (this._data.text && this._data.emotion) {
        this._callback.submitForm(this._data);
      }
    }
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

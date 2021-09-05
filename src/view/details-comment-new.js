import { Emotion } from '@const/comments.js';
import AbstractView from '@view/abstract.js';

const createDetailsEmotionsList = (activeEmotion) => (
  Object.values(Emotion)
    .map((emotion) => (`
      <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emotion}" value="${emotion}" ${emotion === activeEmotion ? 'checked' : ''}>
      <label class="film-details__emoji-label" for="emoji-${emotion}">
        <img src="./images/emoji/${emotion}.png" width="30" height="30" alt="emoji">
      </label>
    `))
    .join('')
);

const createDetailsCommentNewTemplate = ({ isActiveEmotion, activeEmotion }) => (`
  <div class="film-details__new-comment">
    <div class="film-details__add-emoji-label">
      ${isActiveEmotion ? `<img src="images/emoji/${activeEmotion}.png" width="55" height="55" alt="emoji-smile">` : ''}
    </div>

    <label class="film-details__comment-label">
      <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
    </label>

    <div class="film-details__emoji-list">
      ${createDetailsEmotionsList(activeEmotion)}
    </div>
  </div>
`);

const BLANK_COMMENT = {
  text: '',
  activeEmotion: null,
};

export default class DetailsCommentNew extends AbstractView {
  constructor(comment = BLANK_COMMENT) {
    super();
    this._data = DetailsCommentNew.parseCommentToData(comment);

    this._emotionSelectHandler = this._emotionSelectHandler.bind(this);

    this._setInnerHandlers();
  }

  getTemplate() {
    return createDetailsCommentNewTemplate(this._data);
  }

  updateData(update) {
    if (!update) {
      return;
    }

    this._data = Object.assign(
      {},
      this._data,
      update,
    );

    this.updateElement();
  }

  updateElement() {
    const prevElement = this.getElement();
    const parent = prevElement.parentElement;
    this.removeElement();

    const newElement = this.getElement();

    parent.replaceChild(newElement, prevElement);

    this.restoreHandlers();
  }

  restoreHandlers() {
    this._setInnerHandlers();
  }

  _setInnerHandlers() {
    this.getElement()
      .querySelectorAll('.film-details__emoji-item')
      .forEach((item) => (
        item.addEventListener('change', this._emotionSelectHandler)
      ));
  }

  _emotionSelectHandler(evt) {
    this.updateData({
      activeEmotion: evt.target.value,
      isActiveEmotion: Boolean(evt.target.value),
    });
  }

  static parseCommentToData(comment) {
    return Object.assign(
      {},
      comment,
      {
        isActiveEmotion: comment.activeEmotion !== null,
      },
    );
  }

  static parseDataToTask(data) {
    data = Object.assign({}, data);

    if (!data.isActiveEmotion) {
      data.activeEmotion = null;
    }

    delete data.isActiveEmotion;

    return data;
  }
}

import { createDetailsCommentTemplate } from '@view/details-comment.js';

export const createDetailsCommentsListTemplate = ( amount ) => (`
  <ul class="film-details__comments-list">
    ${ new Array(amount).fill('').map(createDetailsCommentTemplate).join('') }
  </ul>
`);

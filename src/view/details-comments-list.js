import { createDetailsCommentTemplate } from '@view/details-comment.js';
import { COMMENT_COUNT } from '@const/comments.js';
import { generateComment } from '@mock/comment.js';

const comments = new Array(COMMENT_COUNT).fill('').map(generateComment);

export const createDetailsCommentsListTemplate = ( filmComments ) => (`
  <ul class="film-details__comments-list">
    ${ filmComments.map(( commentId ) => createDetailsCommentTemplate( comments[commentId] )).join('') }
  </ul>
`);

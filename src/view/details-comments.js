import { createDetailsCommentNewTemplate } from '@view/details-comment-new.js';
import { createDetailsCommentsListTemplate } from '@view/details-comments-list.js';

export const createDetailsCommentsTemplate = ( filmComments ) => (`
  <section class="film-details__comments-wrap">
    <h3 class="film-details__comments-title">
      Comments <span class="film-details__comments-count">${ filmComments.length }</span>
    </h3>

    ${ createDetailsCommentsListTemplate( filmComments ) }
    ${ createDetailsCommentNewTemplate() }
  </section>
`);

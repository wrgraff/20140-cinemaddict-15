import { createDetailsCommentNewTemplate } from '@view/details-comment-new.js';
import { createDetailsCommentsListTemplate } from '@view/details-comments-list.js';

export const createDetailsCommentsTemplate = ( amount ) => (`
  <section class="film-details__comments-wrap">
    <h3 class="film-details__comments-title">
      Comments <span class="film-details__comments-count">${ amount }</span>
    </h3>

    ${ createDetailsCommentsListTemplate( amount ) }
    ${ createDetailsCommentNewTemplate() }
  </section>
`);

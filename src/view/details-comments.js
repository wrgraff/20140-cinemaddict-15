import { createDetailsCommentNewTemplate } from '@view/details-comment-new.js';
import { createDetailsCommentTemplate } from '@view/details-comment.js';

export const createDetailsCommentsTemplate = ( amount ) => (`
  <section class="film-details__comments-wrap">
    <h3 class="film-details__comments-title">
      Comments <span class="film-details__comments-count">${ amount }</span>
    </h3>

    <ul class="film-details__comments-list">
      ${ new Array(amount).fill().map(() => createDetailsCommentTemplate()).join('') }
    </ul>

    ${ createDetailsCommentNewTemplate() }
  </section>
`);

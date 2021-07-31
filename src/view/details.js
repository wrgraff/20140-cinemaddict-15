import { COMMENT_COUNT } from '@const/comments.js';

import { createDetailsInfoTemplate } from '@view/details-info.js';
import { createDetailsControlsTemplate } from '@view/details-controls.js';
import { createDetailsCommentsTemplate } from '@view/details-comments.js';

export const createDetailsTemplate = () => (`
  <section class="film-details">
    <form class="film-details__inner" action="" method="get">
      <div class="film-details__top-container">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
        ${ createDetailsInfoTemplate() }
        ${ createDetailsControlsTemplate() }
      </div>

      <div class="film-details__bottom-container">
        ${ createDetailsCommentsTemplate( COMMENT_COUNT ) }
      </div>
    </form>
  </section>
`);

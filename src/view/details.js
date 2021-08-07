import { createDetailsInfoTemplate } from '@view/details-info.js';
import { createDetailsControlsTemplate } from '@view/details-controls.js';
import { createDetailsCommentsTemplate } from '@view/details-comments.js';

export const createDetailsTemplate = ( film ) => (`
  <section class="film-details">
    <form class="film-details__inner" action="" method="get">
      <div class="film-details__top-container">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
        ${ createDetailsInfoTemplate( film ) }
        ${ createDetailsControlsTemplate( film ) }
      </div>

      <div class="film-details__bottom-container">
        ${ createDetailsCommentsTemplate( film.comments ) }
      </div>
    </form>
  </section>
`);

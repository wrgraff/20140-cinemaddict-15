import AbstractView from '@view/abstract.js';

const createDetailsTemplate = () => (`
  <section class="film-details">
    <form class="film-details__inner" action="" method="get">
      <div class="film-details__top-container">
        <div class="film-details__close"></div>
      </div>

      <div class="film-details__bottom-container"></div>
    </form>
  </section>
`);

export default class Details extends AbstractView {
  getTemplate() {
    return createDetailsTemplate();
  }
}

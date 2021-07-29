export const createFilmsListTemplate = ( title, isExtra ) => (`
  <section class="films-list ${isExtra ? 'films-list--extra' : ''}">
    <h2 class="films-list__title ${isExtra ? '' : 'visually-hidden'}">${title}</h2>

    <div class="films-list__container"></div>

    ${isExtra ? '' : '<button class="films-list__show-more">Show more</button>'}
  </section>
`);

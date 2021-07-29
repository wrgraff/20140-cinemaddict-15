import { render, renderPlace } from '@utils/render';
import { filmsListsData } from '@const/films';
import { COMMENTS_COUNT } from '@const/comments';
import { createProfileTemplate } from '@view/profile.js';
import { createMainNavigationTemplate } from '@view/main-navigation.js';
import { createSortTemplate } from '@view/sort.js';
import { createFilmsTemplate } from '@view/films.js';
import { createFilmsListTemplate } from '@view/films-list.js';
import { createFilmCardTemplate } from '@view/film-card.js';
import { createFooterStatisticsTemplate } from '@view/footer-statistics.js';
import { createDetailsTemplate } from '@view/details.js';
import { createDetailsInfoTemplate } from '@view/details-info';
import { createDetailsControlsTemplate } from '@view/details-controls';
import { createDetailsCommentsTemplate } from '@view/details-comments';
import { createDetailsCommentNewTemplate } from '@view/details-comment-new';
import { createDetailsCommentTemplate } from '@view/details-comment';

const renderFilmsList = ( container, { title, amount, isExtra }) => {
  render(container, createFilmsListTemplate( title, isExtra ), renderPlace.BEFOREEND);

  const filmsContainerElement = container.querySelector('.films-list:last-child .films-list__container');

  for ( let i = 0; i < amount; i++ ) {
    render(filmsContainerElement, createFilmCardTemplate(), renderPlace.BEFOREEND);
  }
};

const headerElement = document.querySelector('.header');
const mainElement = document.querySelector('.main');

render(headerElement, createProfileTemplate(), renderPlace.BEFOREEND);
render(mainElement, createMainNavigationTemplate(), renderPlace.BEFOREEND);
render(mainElement, createSortTemplate(), renderPlace.BEFOREEND);
render(mainElement, createFilmsTemplate(), renderPlace.BEFOREEND);

const filmsElement = mainElement.querySelector('.films');

filmsListsData.forEach(( filmsListData ) => renderFilmsList( filmsElement, filmsListData ));

const footerStatisticsElement = document.querySelector('.footer__statistics');

render(footerStatisticsElement, createFooterStatisticsTemplate( filmsListsData[0].amount ), renderPlace.BEFOREEND);

render(document.body, createDetailsTemplate(), renderPlace.BEFOREEND);

const detailsElement = document.querySelector('.film-details');
const detailsTopElement = detailsElement.querySelector('.film-details__top-container');
const detailsBottomElement = detailsElement.querySelector('.film-details__bottom-container');

render(detailsTopElement, createDetailsInfoTemplate(), renderPlace.BEFOREEND);
render(detailsTopElement, createDetailsControlsTemplate(), renderPlace.BEFOREEND);
render(detailsBottomElement, createDetailsCommentsTemplate(COMMENTS_COUNT), renderPlace.BEFOREEND);

const detailsCommentsElement = detailsElement.querySelector('.film-details__comments-wrap');
const detailsCommentsListElement = detailsElement.querySelector('.film-details__comments-list');

render(detailsCommentsElement, createDetailsCommentNewTemplate(), renderPlace.BEFOREEND);
for ( let i = 0; i < COMMENTS_COUNT; i++ ) {
  render(detailsCommentsListElement, createDetailsCommentTemplate(), renderPlace.BEFOREEND);
}

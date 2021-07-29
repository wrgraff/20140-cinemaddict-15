import { render, RenderPlace } from '@utils/render.js';
import { FILM_LIST_DATA } from '@const/films.js';
import { COMMENT_COUNT } from '@const/comments.js';
import { createProfileTemplate } from '@view/profile.js';
import { createMainNavigationTemplate } from '@view/main-navigation.js';
import { createSortTemplate } from '@view/sort.js';
import { createFilmsTemplate } from '@view/films.js';
import { createFilmsListTemplate } from '@view/films-list.js';
import { createFilmCardTemplate } from '@view/film-card.js';
import { createFooterStatisticsTemplate } from '@view/footer-statistics.js';
import { createDetailsTemplate } from '@view/details.js';
import { createDetailsInfoTemplate } from '@view/details-info.js';
import { createDetailsControlsTemplate } from '@view/details-controls.js';
import { createDetailsCommentsTemplate } from '@view/details-comments.js';
import { createDetailsCommentNewTemplate } from '@view/details-comment-new.js';
import { createDetailsCommentTemplate } from '@view/details-comment.js';

const renderFilmsList = ( container, { title, amount, isExtra }) => {
  render(container, createFilmsListTemplate( title, isExtra ), RenderPlace.BEFORE_END);

  const filmsContainerElement = container.querySelector('.films-list:last-child .films-list__container');

  for ( let i = 0; i < amount; i++ ) {
    render(filmsContainerElement, createFilmCardTemplate(), RenderPlace.BEFORE_END);
  }
};

const headerElement = document.querySelector('.header');
const mainElement = document.querySelector('.main');

render(headerElement, createProfileTemplate(), RenderPlace.BEFORE_END);
render(mainElement, createMainNavigationTemplate(), RenderPlace.BEFORE_END);
render(mainElement, createSortTemplate(), RenderPlace.BEFORE_END);
render(mainElement, createFilmsTemplate(), RenderPlace.BEFORE_END);

const filmsElement = mainElement.querySelector('.films');

FILM_LIST_DATA.forEach(( filmsListData ) => renderFilmsList( filmsElement, filmsListData ));

const footerStatisticsElement = document.querySelector('.footer__statistics');

render(footerStatisticsElement, createFooterStatisticsTemplate( FILM_LIST_DATA[0].amount ), RenderPlace.BEFORE_END);

render(document.body, createDetailsTemplate(), RenderPlace.BEFORE_END);

const detailsElement = document.querySelector('.film-details');
const detailsTopElement = detailsElement.querySelector('.film-details__top-container');
const detailsBottomElement = detailsElement.querySelector('.film-details__bottom-container');

render(detailsTopElement, createDetailsInfoTemplate(), RenderPlace.BEFORE_END);
render(detailsTopElement, createDetailsControlsTemplate(), RenderPlace.BEFORE_END);
render(detailsBottomElement, createDetailsCommentsTemplate(COMMENT_COUNT), RenderPlace.BEFORE_END);

const detailsCommentsElement = detailsElement.querySelector('.film-details__comments-wrap');
const detailsCommentsListElement = detailsElement.querySelector('.film-details__comments-list');

render(detailsCommentsElement, createDetailsCommentNewTemplate(), RenderPlace.BEFORE_END);
for ( let i = 0; i < COMMENT_COUNT; i++ ) {
  render(detailsCommentsListElement, createDetailsCommentTemplate(), RenderPlace.BEFORE_END);
}

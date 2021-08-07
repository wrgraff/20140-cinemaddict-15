import { render, RenderPlace } from '@utils/render.js';
import { FILM_LIST_DATA } from '@const/films.js';
import { createProfileTemplate } from '@view/profile.js';
import { createMainNavigationTemplate } from '@view/main-navigation.js';
import { createSortTemplate } from '@view/sort.js';
import { createFilmsTemplate } from '@view/films.js';
import { createFilmsListTemplate } from '@view/films-list.js';
import { createFilmCardTemplate } from '@view/film-card.js';
import { createFooterStatisticsTemplate } from '@view/footer-statistics.js';
import { createDetailsTemplate } from '@view/details.js';
import { getRandomInteger } from '@utils/random.js';
import { generateFilm } from '@mock/film.js';
import { COMMENT_COUNT } from '@const/comments.js';

const filmsCount = getRandomInteger(20, 40);
const films = new Array(filmsCount).fill('').map(() => generateFilm(COMMENT_COUNT));

const renderFilmList = ( container, { title, amount, isExtra }) => {
  render(container, createFilmsListTemplate( title, isExtra ), RenderPlace.BEFORE_END);

  const filmsContainerElement = container.querySelector('.films-list:last-child .films-list__container');

  for ( let i = 0; i < amount; i++ ) {
    render(filmsContainerElement, createFilmCardTemplate(films[i]), RenderPlace.BEFORE_END);
  }
};

const headerElement = document.querySelector('.header');
const mainElement = document.querySelector('.main');

render(headerElement, createProfileTemplate(), RenderPlace.BEFORE_END);
render(mainElement, createMainNavigationTemplate(), RenderPlace.BEFORE_END);
render(mainElement, createSortTemplate(), RenderPlace.BEFORE_END);
render(mainElement, createFilmsTemplate(), RenderPlace.BEFORE_END);

const filmsElement = mainElement.querySelector('.films');

FILM_LIST_DATA.forEach(( filmListData ) => renderFilmList( filmsElement, filmListData ));

const footerStatisticsElement = document.querySelector('.footer__statistics');

render(footerStatisticsElement, createFooterStatisticsTemplate( FILM_LIST_DATA[0].amount ), RenderPlace.BEFORE_END);

render(document.body, createDetailsTemplate(films[0]), RenderPlace.BEFORE_END);

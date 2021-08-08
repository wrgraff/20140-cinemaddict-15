import { render, RenderPlace } from '@utils/render.js';
import { getRandomInteger } from '@utils/random.js';
import { getFilters } from '@utils/filter.js';
import { getStatistic } from '@utils/statistic.js';
import { generateFilm } from '@mock/film.js';
import { FILM_LIST_DATA } from '@const/films.js';
import { COMMENT_COUNT } from '@const/comments.js';
import { createProfileTemplate } from '@view/profile.js';
import { createMainNavigationTemplate } from '@view/main-navigation.js';
import { createSortTemplate } from '@view/sort.js';
import { createFilmsTemplate } from '@view/films.js';
import { createFilmsListTemplate } from '@view/films-list.js';
import { createFilmsListShowMoreTemplate } from '@view/films-list-show-more.js';
import { createFilmCardTemplate } from '@view/film-card.js';
import { createFooterStatisticsTemplate } from '@view/footer-statistics.js';
import { createDetailsTemplate } from '@view/details.js';
import { createStatisticTemplate } from '@view/statistic.js';

const filmsCount = getRandomInteger(20, 40);
const films = new Array(filmsCount).fill('').map(() => generateFilm(COMMENT_COUNT));

const renderFilmList = ( container, { title, amount, isExtra, sortingMethod }) => {
  const filmsToRender = sortingMethod ? [...films.sort(sortingMethod)] : films;

  render(container, createFilmsListTemplate( title, isExtra ), RenderPlace.BEFORE_END);
  const filmsContainerElement = container.querySelector('.films-list:last-child .films-list__container');

  let renderedFilmCount = 0;
  const addFilmCards = ( from, to ) => {
    for ( let i = from; i < to; i++ ) {
      render(filmsContainerElement, createFilmCardTemplate(filmsToRender[i]), RenderPlace.BEFORE_END);
    }
    renderedFilmCount = to;
  };

  addFilmCards(renderedFilmCount, amount);

  if (!isExtra) {
    const filmsListElement = container.querySelector('.films-list:last-child');
    render(filmsListElement, createFilmsListShowMoreTemplate(), RenderPlace.BEFORE_END);

    const filmsListShowMoreButtonElement = filmsListElement.querySelector('.films-list__show-more');

    filmsListShowMoreButtonElement.addEventListener('click', () => {
      let renderTo = renderedFilmCount + amount;

      if (renderTo >= filmsToRender.length) {
        renderTo = filmsToRender.length;
        filmsListShowMoreButtonElement.remove();
      }

      addFilmCards(renderedFilmCount, renderTo);
    });
  }
};

const headerElement = document.querySelector('.header');
const mainElement = document.querySelector('.main');

render(headerElement, createProfileTemplate(), RenderPlace.BEFORE_END);
render(mainElement, createMainNavigationTemplate( getFilters( films ) ), RenderPlace.BEFORE_END);
render(mainElement, createSortTemplate(), RenderPlace.BEFORE_END);
render(mainElement, createFilmsTemplate(), RenderPlace.BEFORE_END);

const filmsElement = mainElement.querySelector('.films');

FILM_LIST_DATA.forEach(( filmListData ) => renderFilmList( filmsElement, filmListData ));

const footerStatisticsElement = document.querySelector('.footer__statistics');

render(footerStatisticsElement, createFooterStatisticsTemplate( films.length ), RenderPlace.BEFORE_END);

render(document.body, createDetailsTemplate(films[0]), RenderPlace.BEFORE_END);
render(document.body, createStatisticTemplate( getStatistic(films) ), RenderPlace.BEFORE_END);

import { createProfileTemplate } from '@view/profile.js';
import { createMainNavigationTemplate } from '@view/main-navigation.js';
import { createSortTemplate } from '@view/sort.js';
import { createFilmsTemplate } from '@view/films.js';
import { createFilmsListTemplate } from '@view/films-list.js';
import { createFilmCardTemplate } from '@view/film-card.js';
import { createFooterStatisticsTemplate } from '@view/footer-statistics.js';

const render = ( container, template, place ) => {
  container.insertAdjacentHTML( place, template );
};

const filmsListsData = [
  {
    title: 'All movies. Upcoming',
    amount: 5,
    isExtra: false,
  },
  {
    title: 'Top rated',
    amount: 2,
    isExtra: true,
  },
  {
    title: 'Most commented',
    amount: 2,
    isExtra: true,
  },
];

const renderFilmsList = ( container, { title, amount, isExtra }) => {
  render(container, createFilmsListTemplate( title, isExtra ), 'beforeend');

  const filmsContainerElement = container.querySelector('.films-list:last-child .films-list__container');

  for ( let i = 0; i < amount; i++ ) {
    render(filmsContainerElement, createFilmCardTemplate(), 'beforeend');
  }
};

const headerElement = document.querySelector('.header');
const mainElement = document.querySelector('.main');

render(headerElement, createProfileTemplate(), 'beforeend');
render(mainElement, createMainNavigationTemplate(), 'beforeend');
render(mainElement, createSortTemplate(), 'beforeend');
render(mainElement, createFilmsTemplate(), 'beforeend');

const filmsElement = mainElement.querySelector('.films');

filmsListsData.forEach(( filmsListData ) => renderFilmsList( filmsElement, filmsListData ));

const footerStatisticsElement = document.querySelector('.footer__statistics');

render(footerStatisticsElement, createFooterStatisticsTemplate( filmsListsData[0].amount ), 'beforeend');

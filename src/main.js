import {createProfileTemplate} from '@view/profile.js';
import {createMainNavigationTemplate} from '@view/main-navigation.js';
import {createSortTemplate} from '@view/sort.js';
import {createFilmsTemplate} from '@view/films.js';
import {createFilmsListTemplate} from '@view/films-list.js';

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const headerElement = document.querySelector('.header');
const mainElement = document.querySelector('.main');

render(headerElement, createProfileTemplate(), 'beforeend');
render(mainElement, createMainNavigationTemplate(), 'beforeend');
render(mainElement, createSortTemplate(), 'beforeend');
render(mainElement, createFilmsTemplate(), 'beforeend');

const filmsElement = mainElement.querySelector('.films');

render(filmsElement, createFilmsListTemplate('All movies. Upcoming', false), 'beforeend');
render(filmsElement, createFilmsListTemplate('Top rated', true), 'beforeend');
render(filmsElement, createFilmsListTemplate('Most commented', true), 'beforeend');

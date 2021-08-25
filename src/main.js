import { render } from '@utils/render.js';
import { getRandomInteger } from '@utils/random.js';
import { getFilters } from '@utils/filter.js';
import { getStatistic } from '@utils/statistic.js';
import { generateFilm } from '@mock/film.js';
import { COMMENT_COUNT } from '@const/comments.js';
import ProfileView from '@view/profile.js';
import MainNavigationView from '@view/main-navigation.js';
import FooterStatisticsView from '@view/footer-statistics.js';
import StatisticView from '@view/statistic.js';
import FilmsPresenter from '@presenter/films.js';

// Create mock data
const filmsCount = getRandomInteger(20, 40);
const films = new Array(filmsCount).fill('').map( () => generateFilm(COMMENT_COUNT) );

// Rendering
const pageHeader = document.querySelector('.header');
const pageMain = document.querySelector('.main');

render( pageHeader, new ProfileView() );
render( pageMain, new MainNavigationView( getFilters(films) ) );

const filmsPresenter = new FilmsPresenter(pageMain);
filmsPresenter.init(films);

const footerStatistics = document.querySelector('.footer__statistics');
render( footerStatistics, new FooterStatisticsView(films.length) );

render( document.body, new StatisticView( getStatistic(films) ) );

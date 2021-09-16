import { render } from '@utils/render.js';
import { getRandomInteger } from '@utils/random.js';
import { getStatistic } from '@utils/statistic.js';
import { generateFilm } from '@mock/film.js';
import { COMMENT_COUNT } from '@const/comments.js';
import ProfileView from '@view/profile.js';
import FooterStatisticsView from '@view/footer-statistics.js';
import StatisticView from '@view/statistic.js';
import FilmsPresenter from '@presenter/films.js';
import FilterPresenter from '@presenter/filter.js';
import FilmsModel from '@model/films.js';
import FilterModel from '@model/filter.js';

// Create mock data
const filmsCount = getRandomInteger(5, 10);
const films = new Array(filmsCount).fill('').map( () => generateFilm(COMMENT_COUNT) );

// Rendering
const pageHeader = document.querySelector('.header');
const pageMain = document.querySelector('.main');
render( pageHeader, new ProfileView() );

const filterModel = new FilterModel();
const filmsModel = new FilmsModel();
filmsModel.set(films);
FilterPresenter.create(pageMain, filterModel, filmsModel);
FilmsPresenter.create(pageMain, filmsModel, filterModel);

const footerStatistics = document.querySelector('.footer__statistics');
render( footerStatistics, new FooterStatisticsView(films.length) );

render( document.body, new StatisticView( getStatistic(films) ) );

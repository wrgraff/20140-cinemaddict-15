import { render, remove, replace } from '@utils/render.js';
import { getRandomInteger } from '@utils/random.js';
import { filmsToData } from '@utils/films.js';
import { getRankTitle } from '@utils/statistic.js';
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

const filterModel = new FilterModel();
const filmsModel = new FilmsModel();
filmsModel.set( filmsToData(films) );

let statisticsComponent = null;
let rankTitle = getRankTitle( filmsModel.getAll() );
let profileComponent = new ProfileView(rankTitle);
render(pageHeader, profileComponent);
filmsModel.addObserver(() => {
  rankTitle = getRankTitle( filmsModel.getAll() );
  const oldProfileComponent = profileComponent;
  profileComponent = new ProfileView(rankTitle);
  replace(profileComponent, oldProfileComponent);
});

const filterPresenter = FilterPresenter.create(pageMain, filterModel, filmsModel);
const filmsPresenter = FilmsPresenter.create(pageMain, filmsModel, filterModel);

filterPresenter.setStatisticsMenuItemClickHandler(() => {
  filmsPresenter.destroy();
  statisticsComponent = new StatisticView( filmsModel.getAll(), rankTitle );
  render(pageMain, statisticsComponent);
});

filterPresenter.setFilterMenuItemClickHandler(() => {
  filmsPresenter.init();
  remove(statisticsComponent);
  statisticsComponent = null;
});

const footerStatistics = document.querySelector('.footer__statistics');
render( footerStatistics, new FooterStatisticsView(films.length) );


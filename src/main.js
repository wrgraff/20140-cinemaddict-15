import { UpdateType } from '@const/common.js';
import { render, remove, replace } from '@utils/render.js';
import { getWatchedAmount } from '@utils/films.js';
import { getRankTitle } from '@utils/statistic.js';
import ProfileView from '@view/profile.js';
import FooterStatisticsView from '@view/footer-statistics.js';
import StatisticView from '@view/statistic.js';
import FilmsPresenter from '@presenter/films.js';
import FilterPresenter from '@presenter/filter.js';
import FilmsModel from '@model/films.js';
import FilterModel from '@model/filter.js';
import Api from './api.js';

const AUTHORIZATION = 'Basic ZfdSjKRWMnPnwefK0';
const END_POINT = 'https://15.ecmascript.pages.academy/cinemaddict';
const api = new Api(END_POINT, AUTHORIZATION);

const pageHeader = document.querySelector('.header');
const pageMain = document.querySelector('.main');

const filterModel = new FilterModel();
const filmsModel = new FilmsModel();
api.getFilms()
  .then((films) => {
    filmsModel.set(UpdateType.INIT, films);
  })
  .catch(() => {
    filmsModel.set(UpdateType.INIT, []);
  });

let statisticsComponent = null;
let footerStatisticsComponent = new FooterStatisticsView();
let watchedFilmsAmount = getWatchedAmount( filmsModel.getAll() );
let rankTitle = getRankTitle(watchedFilmsAmount);
let profileComponent = new ProfileView(rankTitle);
let isLoading = true;
render(pageHeader, profileComponent);
filmsModel.addObserver(() => {
  isLoading = false;
  watchedFilmsAmount = getWatchedAmount( filmsModel.getAll() );
  rankTitle = getRankTitle(watchedFilmsAmount);

  const oldProfileComponent = profileComponent;
  profileComponent = new ProfileView(rankTitle, isLoading);
  replace(profileComponent, oldProfileComponent);

  const oldFooterStatisticsComponent = footerStatisticsComponent;
  footerStatisticsComponent = new FooterStatisticsView(filmsModel.getAll().length, isLoading);
  replace(footerStatisticsComponent, oldFooterStatisticsComponent);
});

const filterPresenter = FilterPresenter.create(pageMain, filterModel, filmsModel);
const filmsPresenter = FilmsPresenter.create(pageMain, filmsModel, filterModel, api);

filterPresenter.setStatisticsMenuItemClickHandler(() => {
  if (statisticsComponent === null) {
    filmsPresenter.destroy();
    statisticsComponent = new StatisticView( filmsModel.getAll(), rankTitle );
    render(pageMain, statisticsComponent);
  }
});

filterPresenter.setMenuItemClickHandler(() => {
  filmsPresenter.init();
  remove(statisticsComponent);
  statisticsComponent = null;
});

const footerStatistics = document.querySelector('.footer__statistics');
render( footerStatistics, footerStatisticsComponent );


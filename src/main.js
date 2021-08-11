import { render, RenderPlace } from '@utils/render.js';
import { getRandomInteger } from '@utils/random.js';
import { getFilters } from '@utils/filter.js';
import { getStatistic } from '@utils/statistic.js';
import { generateFilm } from '@mock/film.js';
import { FILM_LIST_DATA } from '@const/films.js';
import { COMMENT_COUNT } from '@const/comments.js';
import ProfileView from '@view/profile.js';
import MainNavigationView from '@view/main-navigation.js';
import SortView from '@view/sort.js';
import FilmsView from '@view/films.js';
import FilmsListView from '@view/films-list.js';
import FilmsListShowMoreView from '@view/films-list-show-more.js';
import FilmCardView from '@view/film-card.js';
import FooterStatisticsView from '@view/footer-statistics.js';
import DetailsView from '@view/details.js';
import StatisticView from '@view/statistic.js';

const filmsCount = getRandomInteger(20, 40);
const films = new Array(filmsCount).fill('').map(() => generateFilm(COMMENT_COUNT));

const renderFilmList = ( container, { title, amount, isExtra, sortingMethod }) => {
  const filmsToRender = sortingMethod ? [...films.sort(sortingMethod)] : films;

  const filmsConatainer = new FilmsListView( title, isExtra );
  render(container, filmsConatainer.getElement(), RenderPlace.BEFORE_END);

  let renderedFilmCount = 0;
  const addFilmCards = ( from, to ) => {
    for ( let i = from; i < to; i++ ) {
      render(filmsConatainer.getContainer(), new FilmCardView( filmsToRender[i] ).getElement(), RenderPlace.BEFORE_END);
    }
    renderedFilmCount = to;
  };

  addFilmCards(renderedFilmCount, amount);

  if (!isExtra) {
    const filmsListElement = container.querySelector('.films-list:last-child');
    const filmsListShowMore = new FilmsListShowMoreView();
    render(filmsListElement, filmsListShowMore.getElement(), RenderPlace.BEFORE_END);

    filmsListShowMore.getElement().addEventListener('click', () => {
      let renderTo = renderedFilmCount + amount;

      if (renderTo >= filmsToRender.length) {
        renderTo = filmsToRender.length;
        filmsListShowMore.removeElement();
      }

      addFilmCards(renderedFilmCount, renderTo);
    });
  }
};

const headerElement = document.querySelector('.header');
const mainElement = document.querySelector('.main');

render(headerElement, new ProfileView().getElement(), RenderPlace.BEFORE_END);
render(mainElement, new MainNavigationView( getFilters( films ) ).getElement(), RenderPlace.BEFORE_END);
render(mainElement, new SortView().getElement(), RenderPlace.BEFORE_END);

const filmsElement = new FilmsView().getElement();
render(mainElement, filmsElement, RenderPlace.BEFORE_END);
FILM_LIST_DATA.forEach(( filmListData ) => renderFilmList( filmsElement, filmListData ));

const footerStatisticsElement = document.querySelector('.footer__statistics');
render(footerStatisticsElement, new FooterStatisticsView( films.length ).getElement(), RenderPlace.BEFORE_END);

render(document.body, new DetailsView(films[0]).getElement(), RenderPlace.BEFORE_END);
render(document.body, new StatisticView( getStatistic(films) ).getElement(), RenderPlace.BEFORE_END);

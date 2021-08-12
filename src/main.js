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

const renderDetails = (film) => {
  const details = new DetailsView(film);
  render(document.body, details.getElement(), RenderPlace.BEFORE_END);
  document.body.classList.add('hide-overflow');

  details.getElement().querySelector('.film-details__close-btn').addEventListener('click', () => {
    details.getElement().remove();
    details.removeElement();
    document.body.classList.remove('hide-overflow');
  });
};

const renderFilmList = ( container, { title, amount, isExtra, sortingMethod }) => {
  const filmsToRender = sortingMethod ? [...films.sort(sortingMethod)] : films;

  const filmsList = new FilmsListView( title, isExtra ).getElement();
  const filmsListContainer = filmsList.querySelector('.films-list__container');
  render(container, filmsList, RenderPlace.BEFORE_END);

  let renderedFilmCount = 0;

  const addFilmCards = ( from, to ) => {
    for ( let i = from; i < to; i++ ) {
      const currentFilm = filmsToRender[i];
      const filmCard = new FilmCardView( currentFilm ).getElement();
      const filmCardTitle = filmCard.querySelector('.film-card__title');
      const filmCardPoster = filmCard.querySelector('.film-card__poster');
      const filmCardComments = filmCard.querySelector('.film-card__comments');

      [filmCardTitle, filmCardPoster, filmCardComments].forEach((element) => {
        element.addEventListener('click', () => renderDetails(currentFilm));
      });

      render(filmsListContainer, filmCard, RenderPlace.BEFORE_END);
    }

    renderedFilmCount = to;
  };

  addFilmCards(renderedFilmCount, amount);

  if (!isExtra) {
    const lastFilmsList = container.querySelector('.films-list:last-child');
    const filmsListShowMore = new FilmsListShowMoreView();
    render(lastFilmsList, filmsListShowMore.getElement(), RenderPlace.BEFORE_END);

    filmsListShowMore.getElement().addEventListener('click', () => {
      let renderTo = renderedFilmCount + amount;

      if (renderTo >= filmsToRender.length) {
        renderTo = filmsToRender.length;
        filmsListShowMore.getElement().remove();
        filmsListShowMore.removeElement();
      }

      addFilmCards(renderedFilmCount, renderTo);
    });
  }
};

const pageHeader = document.querySelector('.header');
const pageMain = document.querySelector('.main');

render(pageHeader, new ProfileView().getElement(), RenderPlace.BEFORE_END);
render(pageMain, new MainNavigationView( getFilters( films ) ).getElement(), RenderPlace.BEFORE_END);
render(pageMain, new SortView().getElement(), RenderPlace.BEFORE_END);

const filmsSection = new FilmsView().getElement();
render(pageMain, filmsSection, RenderPlace.BEFORE_END);
FILM_LIST_DATA.forEach(( filmListData ) => renderFilmList( filmsSection, filmListData ));

const footerStatistics = document.querySelector('.footer__statistics');
render(footerStatistics, new FooterStatisticsView( films.length ).getElement(), RenderPlace.BEFORE_END);

render(document.body, new StatisticView( getStatistic(films) ).getElement(), RenderPlace.BEFORE_END);

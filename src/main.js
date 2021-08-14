import { chunk } from '@utils/common.js';
import { render, RenderPlace } from '@utils/render.js';
import { getRandomInteger } from '@utils/random.js';
import { getFilmsByRating, getFilmsByComments } from '@utils/films.js';
import { getFilters } from '@utils/filter.js';
import { getStatistic } from '@utils/statistic.js';
import { isEscapeEvent } from '@utils/dom-event.js';
import { generateFilm } from '@mock/film.js';
import { FilmListTitle, FilmListAmountInLine } from '@const/films.js';
import { COMMENT_COUNT } from '@const/comments.js';
import ProfileView from '@view/profile.js';
import MainNavigationView from '@view/main-navigation.js';
import SortView from '@view/sort.js';
import FilmsView from '@view/films.js';
import FilmsListView from '@view/films-list.js';
import FilmsListExtraView from '@view/films-list-extra.js';
import FilmsListEmptyView from '@view/films-list-empty.js';
import FilmsListShowMoreView from '@view/films-list-show-more.js';
import FilmCardView from '@view/film-card.js';
import FooterStatisticsView from '@view/footer-statistics.js';
import DetailsView from '@view/details.js';
import StatisticView from '@view/statistic.js';

// Create mock data
const filmsCount = getRandomInteger(20, 40);
const films = new Array(filmsCount).fill('').map(() => generateFilm(COMMENT_COUNT));

// Details popup
const renderDetails = (film) => {
  const details = new DetailsView(film);

  const removeDetails = () => {
    details.getElement().remove();
    details.removeElement();
    document.body.classList.remove('hide-overflow');
  };

  const onEscKeyDown = (evt) => {
    if (isEscapeEvent(evt)) {
      evt.preventDefault();
      removeDetails();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  const onDetailsCloseButtonClick = () => removeDetails();

  render(document.body, details.getElement(), RenderPlace.BEFORE_END);
  document.body.classList.add('hide-overflow');
  document.addEventListener('keydown', onEscKeyDown);
  details.getElement().querySelector('.film-details__close-btn').addEventListener('click', onDetailsCloseButtonClick);
};

// Add cards
const renderFilmCards = ( container, filmsToRender ) => {
  filmsToRender.forEach((film) => {
    const filmCard = new FilmCardView( film ).getElement();
    const filmCardTitle = filmCard.querySelector('.film-card__title');
    const filmCardPoster = filmCard.querySelector('.film-card__poster');
    const filmCardComments = filmCard.querySelector('.film-card__comments');

    [filmCardTitle, filmCardPoster, filmCardComments].forEach((element) => {
      element.addEventListener('click', () => renderDetails(film));
    });

    render(container, filmCard, RenderPlace.BEFORE_END);
  });
};

// Rendering
const pageHeader = document.querySelector('.header');
const pageMain = document.querySelector('.main');

render(pageHeader, new ProfileView().getElement(), RenderPlace.BEFORE_END);
render(pageMain, new MainNavigationView( getFilters( films ) ).getElement(), RenderPlace.BEFORE_END);
render(pageMain, new SortView().getElement(), RenderPlace.BEFORE_END);

const filmsSection = new FilmsView().getElement();
render(pageMain, filmsSection, RenderPlace.BEFORE_END);

const renderFilmsList = () => {
  let lineToRenderIndex = 0;
  const filmsToRender = chunk(films, FilmListAmountInLine.BASE);
  const filmsList = new FilmsListView( FilmListTitle.ALL ).getElement();
  const filmsListContainer = filmsList.querySelector('.films-list__container');
  const filmsListShowMore = new FilmsListShowMoreView();
  render(filmsList, filmsListShowMore.getElement(), RenderPlace.BEFORE_END);
  renderFilmCards( filmsListContainer, filmsToRender[lineToRenderIndex] );
  lineToRenderIndex++;
  render(filmsSection, filmsList, RenderPlace.BEFORE_END);

  filmsListShowMore.getElement().addEventListener('click', () => {
    if (lineToRenderIndex >= filmsToRender.length - 1) {
      filmsListShowMore.getElement().remove();
      filmsListShowMore.removeElement();
    }

    renderFilmCards(filmsListContainer, filmsToRender[lineToRenderIndex]);
    lineToRenderIndex++;
  });
};

const renderFilmsListExtra = (extraFilms, title) => {
  const filmsToRender = extraFilms.slice(0, FilmListAmountInLine.EXTRA);
  const filmsList = new FilmsListExtraView( title ).getElement();
  const filmsListContainer = filmsList.querySelector('.films-list__container');
  renderFilmCards( filmsListContainer, filmsToRender );
  render(filmsSection, filmsList, RenderPlace.BEFORE_END);
};

if (!films.length) {
  render(filmsSection, new FilmsListEmptyView(FilmListTitle.EMPTY).getElement(), RenderPlace.BEFORE_END);
} else {
  renderFilmsList();
  renderFilmsListExtra( getFilmsByRating(films), FilmListTitle.TOP_RATED );
  renderFilmsListExtra( getFilmsByComments(films), FilmListTitle.MOST_COMMENTED );
}

const footerStatistics = document.querySelector('.footer__statistics');
render(footerStatistics, new FooterStatisticsView( films.length ).getElement(), RenderPlace.BEFORE_END);

render(document.body, new StatisticView( getStatistic(films) ).getElement(), RenderPlace.BEFORE_END);

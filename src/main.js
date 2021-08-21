import { render, remove } from '@utils/render.js';
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
import FilmsListContainerView from '@view/films-list-container.js';
import FilmsListShowMoreView from '@view/films-list-show-more.js';
import FilmCardView from '@view/film-card.js';
import FooterStatisticsView from '@view/footer-statistics.js';
import DetailsView from '@view/details.js';
import StatisticView from '@view/statistic.js';

// Create mock data
const filmsCount = getRandomInteger(20, 40);
const films = new Array(filmsCount).fill('').map( () => generateFilm(COMMENT_COUNT) );

// Details popup
const renderDetails = (film) => {
  const details = new DetailsView(film);

  const removeDetails = () => {
    remove(details);
    document.body.classList.remove('hide-overflow');
  };

  const onEscKeyDown = (evt) => {
    if ( isEscapeEvent(evt) ) {
      evt.preventDefault();
      removeDetails();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  render( document.body, details );
  document.body.classList.add('hide-overflow');
  document.addEventListener('keydown', onEscKeyDown);
  details.setOnCloseButtonClick(() => {
    removeDetails();
    document.removeEventListener('keydown', onEscKeyDown);
  });
};

// Add cards
const renderFilmCards = (container, filmsToRender) => {
  filmsToRender.forEach((film) => {
    const filmCard = new FilmCardView(film);
    filmCard.setOnCardClick(() => renderDetails(film));
    render(container, filmCard);
  });
};

// Rendering
const pageHeader = document.querySelector('.header');
const pageMain = document.querySelector('.main');

render( pageHeader, new ProfileView() );
render( pageMain, new MainNavigationView( getFilters(films) ) );
render( pageMain, new SortView() );

const filmsSection = new FilmsView();
render(pageMain, filmsSection);

const renderFilmsList = (container, filmsToRender) => {
  let shownFilms = 0;
  const filmsListContainer = new FilmsListContainerView();
  render(container, filmsListContainer);

  const renderFilms = () => {
    renderFilmCards(filmsListContainer, filmsToRender.slice( shownFilms, Math.min(shownFilms + FilmListAmountInLine.BASE, filmsToRender.length) ));
    shownFilms += FilmListAmountInLine.BASE;
  };

  renderFilms();
  render(filmsSection, container);

  if (shownFilms < filmsToRender.length) {
    const filmsListShowMore = new FilmsListShowMoreView();
    render(container, filmsListShowMore);

    filmsListShowMore.setOnClick(() => {
      renderFilms();

      if (shownFilms >= filmsToRender.length) {
        remove(filmsListShowMore);
      }
    });
  }
};

if (films.length > 0) {
  const filmsListAll = new FilmsListView(FilmListTitle.ALL);
  const filmsListByRating = new FilmsListExtraView(FilmListTitle.TOP_RATED);
  const filmsListByComments = new FilmsListExtraView(FilmListTitle.MOST_COMMENTED);

  renderFilmsList(filmsListAll, films);
  renderFilmsList( filmsListByRating, getFilmsByRating(films).slice(0, FilmListAmountInLine.EXTRA) );
  renderFilmsList( filmsListByComments, getFilmsByComments(films).slice(0, FilmListAmountInLine.EXTRA) );
} else {
  render( filmsSection, new FilmsListEmptyView(FilmListTitle.EMPTY) );
}

const footerStatistics = document.querySelector('.footer__statistics');
render( footerStatistics, new FooterStatisticsView(films.length) );

render( document.body, new StatisticView( getStatistic(films) ) );

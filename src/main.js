import { render } from '@utils/render.js';
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
    details.getElement().remove();
    details.removeElement();
    document.body.classList.remove('hide-overflow');
  };

  const onEscKeyDown = (evt) => {
    if ( isEscapeEvent(evt) ) {
      evt.preventDefault();
      removeDetails();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  const onDetailsCloseButtonClick = () => {
    removeDetails();
    document.removeEventListener('keydown', onEscKeyDown);
  };

  render( document.body, details.getElement() );
  document.body.classList.add('hide-overflow');
  document.addEventListener('keydown', onEscKeyDown);
  details.getElement().querySelector('.film-details__close-btn').addEventListener('click', onDetailsCloseButtonClick);
};

// Add cards
const renderFilmCards = (container, filmsToRender) => {
  filmsToRender.forEach((film) => {
    const filmCard = new FilmCardView(film).getElement();
    const filmCardTitle = filmCard.querySelector('.film-card__title');
    const filmCardPoster = filmCard.querySelector('.film-card__poster');
    const filmCardComments = filmCard.querySelector('.film-card__comments');

    [filmCardTitle, filmCardPoster, filmCardComments].forEach((element) => {
      element.addEventListener('click', () => renderDetails(film));
    });

    render(container, filmCard);
  });
};

// Rendering
const pageHeader = document.querySelector('.header');
const pageMain = document.querySelector('.main');

render( pageHeader, new ProfileView().getElement() );
render( pageMain, new MainNavigationView( getFilters(films) ).getElement() );
render( pageMain, new SortView().getElement() );

const filmsSection = new FilmsView().getElement();
render(pageMain, filmsSection);

const renderFilmsList = (container, filmsToRender) => {
  let shownFilms = 0;
  const filmsListContainer = new FilmsListContainerView().getElement();
  container.append(filmsListContainer);

  const renderFilms = () => {
    renderFilmCards(filmsListContainer, filmsToRender.slice( shownFilms, Math.min(shownFilms + FilmListAmountInLine.BASE, filmsToRender.length) ));
    shownFilms += FilmListAmountInLine.BASE;
  };

  renderFilms();
  render(filmsSection, container);

  if (shownFilms < filmsToRender.length) {
    const filmsListShowMore = new FilmsListShowMoreView();
    render( container, filmsListShowMore.getElement() );

    filmsListShowMore.getElement().addEventListener('click', () => {
      renderFilms();

      if (shownFilms >= filmsToRender.length) {
        filmsListShowMore.getElement().remove();
        filmsListShowMore.removeElement();
      }
    });
  }
};

if (films.length > 0) {
  const filmsListAll = new FilmsListView(FilmListTitle.ALL).getElement();
  const filmsListByRating =  new FilmsListExtraView(FilmListTitle.TOP_RATED).getElement();
  const filmsListByComments =  new FilmsListExtraView(FilmListTitle.MOST_COMMENTED).getElement();

  renderFilmsList(filmsListAll, films);
  renderFilmsList( filmsListByRating, getFilmsByRating(films).slice(0, FilmListAmountInLine.EXTRA) );
  renderFilmsList( filmsListByComments, getFilmsByComments(films).slice(0, FilmListAmountInLine.EXTRA) );
} else {
  render( filmsSection, new FilmsListEmptyView(FilmListTitle.EMPTY).getElement() );

}

const footerStatistics = document.querySelector('.footer__statistics');
render( footerStatistics, new FooterStatisticsView(films.length).getElement() );

render( document.body, new StatisticView( getStatistic(films) ).getElement() );

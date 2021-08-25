import { render, remove } from '@utils/render.js';
import { getFilmsByRating, getFilmsByComments } from '@utils/films.js';
import { isEscapeEvent } from '@utils/dom-event.js';
import { FilmListTitle, FilmListAmountInLine } from '@const/films.js';

import SortView from '@view/sort.js';
import FilmsView from '@view/films.js';
import FilmsListView from '@view/films-list.js';
import FilmsListExtraView from '@view/films-list-extra.js';
import FilmsListEmptyView from '@view/films-list-empty.js';
import FilmsListContainerView from '@view/films-list-container.js';
import FilmsListShowMoreView from '@view/films-list-show-more.js';
import FilmCardView from '@view/film-card.js';
import DetailsView from '@view/details.js';

export default class Films {
  constructor(container) {
    this._container = container;

    this._sectionComponent = new FilmsView();
    this._sortComponent = new SortView();
    this._listComponent = new FilmsListView(FilmListTitle.ALL);
    this._listByRatingComponent = new FilmsListExtraView(FilmListTitle.TOP_RATED);
    this._listByCommentsComponent = new FilmsListExtraView(FilmListTitle.MOST_COMMENTED);
    this._listEmptyComponent = new FilmsListEmptyView(FilmListTitle.EMPTY);
    this._cardComponent = new FilmCardView();
  }

  init(films) {
    this._films = films.slice();
    this._filmsByRating = getFilmsByRating(films).slice(0, FilmListAmountInLine.EXTRA);
    this._filmsByComments = getFilmsByComments(films).slice(0, FilmListAmountInLine.EXTRA);

    this._render();
  }

  _renderSort() {
    render(this._container, this._sortComponent);
  }

  _renderDetails(film) {
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

    render(document.body, details);
    document.body.classList.add('hide-overflow');
    document.addEventListener('keydown', onEscKeyDown);
    details.setOnCloseButtonClick(() => {
      removeDetails();
      document.removeEventListener('keydown', onEscKeyDown);
    });
  }

  _renderShowMore(container, listContainer, filmsToRender) {
    let shownFilms = FilmListAmountInLine.BASE;
    const filmsListShowMore = new FilmsListShowMoreView();
    render(container, filmsListShowMore);

    filmsListShowMore.setOnClick(() => {
      this._renderCards(listContainer, filmsToRender.slice( shownFilms, Math.min(shownFilms + FilmListAmountInLine.BASE, filmsToRender.length) ));
      shownFilms += FilmListAmountInLine.BASE;

      if (shownFilms >= filmsToRender.length) {
        remove(filmsListShowMore);
      }
    });
  }

  _renderCards(container, filmsToRender) {
    filmsToRender.forEach((film) => {
      const filmCard = new FilmCardView(film);
      filmCard.setOnCardClick(() => this._renderDetails(film));
      render(container, filmCard);
    });
  }

  _renderListEmpty() {
    render(this._container, this._listEmptyComponent);
  }

  _renderList(container, filmsToRender) {
    const listContainer = new FilmsListContainerView();
    render(container, listContainer);

    this._renderCards(listContainer, filmsToRender.slice( 0, Math.min(FilmListAmountInLine.BASE, filmsToRender.length) ));
    render(this._sectionComponent, container);

    if (FilmListAmountInLine.BASE < filmsToRender.length) {
      this._renderShowMore(container, listContainer, filmsToRender);
    }
  }

  _renderSection() {
    if (this._films.length <= 0) {
      this._renderListEmpty();
      return;
    }

    this._renderList(this._listComponent, this._films);
    this._renderList(this._listByCommentsComponent, this._filmsByComments);
    this._renderList(this._listByRatingComponent, this._filmsByRating);

    render(this._container, this._sectionComponent);
  }

  _render() {
    this._renderSort();
    this._renderSection();
  }
}

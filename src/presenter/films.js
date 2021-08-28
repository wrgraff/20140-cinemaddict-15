import { render, remove } from '@utils/render.js';
import { getFilmsByRating, getFilmsByComments } from '@utils/films.js';
import { updateItem } from '@utils/common.js';
import { FilmListTitle, FilmListAmountInLine } from '@const/films.js';

import SortView from '@view/sort.js';
import FilmsView from '@view/films.js';
import FilmsListView from '@view/films-list.js';
import FilmsListExtraView from '@view/films-list-extra.js';
import FilmsListEmptyView from '@view/films-list-empty.js';
import FilmsListContainerView from '@view/films-list-container.js';
import FilmsListShowMoreView from '@view/films-list-show-more.js';
import DetailsPresenter from '@presenter/details.js';
import FilmPresenter from '@presenter/film.js';

export default class Films {
  constructor(container) {
    this._container = container;
    this._shownFilms = FilmListAmountInLine.BASE;

    this._sectionComponent = new FilmsView();
    this._sortComponent = new SortView();
    this._listComponent = new FilmsListView(FilmListTitle.ALL);
    this._listByRatingComponent = new FilmsListExtraView(FilmListTitle.TOP_RATED);
    this._listByCommentsComponent = new FilmsListExtraView(FilmListTitle.MOST_COMMENTED);
    this._listEmptyComponent = new FilmsListEmptyView(FilmListTitle.EMPTY);
    this._showMoreComponent = new FilmsListShowMoreView();

    this._detailsPresenter = new DetailsPresenter();
    this._filmPresenter = new Map();
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

  _renderShowMore(container, listContainer, filmsToRender) {
    render(container, this._showMoreComponent);

    this._showMoreComponent.setOnClick(() => {
      this._renderCards(listContainer, filmsToRender, this._shownFilms, this._shownFilms + FilmListAmountInLine.BASE);
      this._shownFilms += FilmListAmountInLine.BASE;

      if (this._shownFilms >= filmsToRender.length) {
        remove(this._showMoreComponent);
      }
    });
  }

  _renderCards(container, list, from, to) {
    list
      .slice(from, to)
      .forEach((film) => {
        const filmPresenter = FilmPresenter.create(container, this._detailsPresenter, film);
        this._filmPresenter.set(film.id, filmPresenter);
      });
  }

  _renderListEmpty() {
    render(this._container, this._listEmptyComponent);
  }

  _renderList(container, filmsToRender) {
    const listContainer = new FilmsListContainerView();
    render(container, listContainer);

    this._renderCards(listContainer, filmsToRender, 0, this._shownFilms);
    render(this._sectionComponent, container);

    if (this._shownFilms < filmsToRender.length) {
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

  _onFilmChange(changedFilm) {
    this._films = updateItem(this._films, changedFilm);
    this._filmsByComments = updateItem(this._filmsByComments, changedFilm);
    this._filmsByRating = updateItem(this._filmsByRating, changedFilm);
    this._filmPresenter.get(changedFilm.id).init(changedFilm);
  }

  static create(container, films) {
    const filmsPresenter = new this(container);
    filmsPresenter.init(films);
  }
}

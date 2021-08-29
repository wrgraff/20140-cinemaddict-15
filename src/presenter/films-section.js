import { render, remove } from '@utils/render.js';
import { getFilmsByRating, getFilmsByComments } from '@utils/films.js';
import { updateItemById } from '@utils/common.js';
import { FilmListTitle, FilmListAmountInLine, SortType } from '@const/films.js';

import SortView from '@view/sort.js';
import FilmsView from '@view/films.js';
import FilmsListView from '@view/films-list.js';
import FilmsListExtraView from '@view/films-list-extra.js';
import FilmsListEmptyView from '@view/films-list-empty.js';
import FilmsListContainerView from '@view/films-list-container.js';
import FilmsListShowMoreView from '@view/films-list-show-more.js';
import DetailsPresenter from '@presenter/details.js';
import FilmCardPresenter from '@presenter/film-card.js';

export default class FilmsSection {
  constructor(container) {
    this._container = container;
    this._shownFilms = FilmListAmountInLine.BASE;
    this._currentSortType = SortType.DEFAULT;

    this._sectionComponent = new FilmsView();
    this._sortComponent = new SortView();
    this._listComponent = new FilmsListView(FilmListTitle.ALL);
    this._listByRatingComponent = new FilmsListExtraView(FilmListTitle.TOP_RATED);
    this._listByCommentsComponent = new FilmsListExtraView(FilmListTitle.MOST_COMMENTED);
    this._listEmptyComponent = new FilmsListEmptyView(FilmListTitle.EMPTY);
    this._showMoreComponent = new FilmsListShowMoreView();

    this._detailsPresenter = null;
    this._filmCardPresenters = [];

    this._handleFilmChange = this._handleFilmChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(films) {
    this._films = films.slice();
    this._sourcedFilms = films.slice();
    this._topRatedFilms = getFilmsByRating(films).slice(0, FilmListAmountInLine.EXTRA);
    this._topCommentedFilms = getFilmsByComments(films).slice(0, FilmListAmountInLine.EXTRA);
    this._detailsPresenter = new DetailsPresenter(this._handleFilmChange);

    this._render();
  }

  _renderSort() {
    render(this._container, this._sortComponent);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderShowMore(container, listContainer, renderingFilms) {
    render(container, this._showMoreComponent);

    this._showMoreComponent.setClickHandler(() => {
      this._renderCards(listContainer, renderingFilms, this._shownFilms, this._shownFilms + FilmListAmountInLine.BASE);
      this._shownFilms += FilmListAmountInLine.BASE;

      if (this._shownFilms >= renderingFilms.length) {
        remove(this._showMoreComponent);
      }
    });
  }

  _renderCards(container, films, from, to) {
    films
      .slice(from, to)
      .forEach((film) => {
        const filmCardPresenter = FilmCardPresenter.create(container, this._detailsPresenter, film, this._handleFilmChange);
        this._filmCardPresenters.push({
          id: film.id,
          presenter: filmCardPresenter,
        });
      });
  }

  _renderListEmpty() {
    render(this._container, this._listEmptyComponent);
  }

  _renderList(container, renderingFilms) {
    const listContainer = new FilmsListContainerView();
    render(container, listContainer);

    this._renderCards(listContainer, renderingFilms, 0, this._shownFilms);
    render(this._sectionComponent, container);

    if (this._shownFilms < renderingFilms.length) {
      this._renderShowMore(container, listContainer, renderingFilms);
    }
  }

  _renderSection() {
    if (this._films.length === 0) {
      this._renderListEmpty();
      return;
    }

    this._renderList(this._listComponent, this._films);
    this._renderList(this._listByCommentsComponent, this._topCommentedFilms);
    this._renderList(this._listByRatingComponent, this._topRatedFilms);

    render(this._container, this._sectionComponent);
  }

  _render() {
    this._renderSort();
    this._renderSection();
  }

  _sortFilms(sortType) {
    switch (sortType) {
      case SortType.DATE:
        this._films = getFilmsByRating(this._films);
        break;
      case SortType.RATING:
        this._films = getFilmsByRating(this._films);
        break;
      default:
        this._films = this._sourcedFilms.slice();
    }

    this._currentSortType = sortType;
  }

  _handleFilmChange(changedFilm) {
    this._films = updateItemById(this._films, changedFilm);
    this._sourcedFilms = updateItemById(this._sourcedFilms, changedFilm);
    this._topCommentedFilms = updateItemById(this._topCommentedFilms, changedFilm);
    this._topRatedFilms = updateItemById(this._topRatedFilms, changedFilm);
    this._filmCardPresenters
      .filter((presenterItem) => presenterItem.id === changedFilm.id)
      .forEach((presenterItem) => presenterItem.presenter.update(changedFilm));
    this._detailsPresenter.update(changedFilm);
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._sortFilms(sortType);
    this._renderList(this._listComponent, this._films);
  }

  static create(container, films) {
    const filmsPresenter = new this(container);
    filmsPresenter.init(films);
  }
}

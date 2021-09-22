import dayjs from 'dayjs';
import AbstractView from '@view/abstract.js';
import { DESCRIPTION_MAX_LENGTH } from '@const/films.js';
import { formatRuntime } from '@utils/format.js';

const createFilmCardTemplate = ( data ) => (`
  <article class="film-card">
    <h3 class="film-card__title">${data.name}</h3>

    <p class="film-card__rating">${data.rating}</p>

    <p class="film-card__info">
      <span class="film-card__year">${data.releaseYear}</span>
      <span class="film-card__duration">${data.runtimeText}</span>
      <span class="film-card__genre">${data.genre}</span>
    </p>

    <img src="./${data.poster}" alt="Poster for ${data.name}" class="film-card__poster">

    <p class="film-card__description">${data.description}</p>

    <a class="film-card__comments">${data.commentsAmount} ${data.commentsPostfix}</a>

    <div class="film-card__controls">
      <button class="
        film-card__controls-item
        film-card__controls-item--add-to-watchlist
        ${data.isInWatchlist ? 'film-card__controls-item--active' : ''}
      " type="button">Add to watchlist</button>

      <button class="
        film-card__controls-item
        film-card__controls-item--mark-as-watched
        ${data.isWatched ? 'film-card__controls-item--active' : ''}
      " type="button">Mark as watched</button>

      <button class="
        film-card__controls-item
        film-card__controls-item--favorite
        ${data.isFavorite ? 'film-card__controls-item--active' : ''}
      " type="button">Mark as favorite</button>
    </div>
  </article>
`);

export default class FilmCard extends AbstractView {
  constructor(film) {
    super();
    this._data = FilmCard.parseFilmToData(film);
    this._onCardClick = this._onCardClick.bind(this);
    this._onAddToWatchlistClick = this._onAddToWatchlistClick.bind(this);
    this._onMarkAsWatchedClick = this._onMarkAsWatchedClick.bind(this);
    this._onFavoriteClick = this._onFavoriteClick.bind(this);
  }

  setCardClickHandler(callback) {
    this._callback.clickCard = callback;
    this.getElement().querySelectorAll('.film-card__title, .film-card__poster, .film-card__comments').forEach((element) => {
      element.addEventListener('click', this._onCardClick);
    });
  }

  setWatchlistClickHandler(callback) {
    this._callback.clickWatchlist = callback;
    this.getElement().querySelector('.film-card__controls-item--add-to-watchlist').addEventListener('click', this._onAddToWatchlistClick);
  }

  setWatchedClickHandler(callback) {
    this._callback.clickWatched = callback;
    this.getElement().querySelector('.film-card__controls-item--mark-as-watched').addEventListener('click', this._onMarkAsWatchedClick);
  }

  setFavoriteClickHandler(callback) {
    this._callback.clickFavorite = callback;
    this.getElement().querySelector('.film-card__controls-item--favorite').addEventListener('click', this._onFavoriteClick);
  }

  getTemplate() {
    return createFilmCardTemplate(this._data);
  }

  _onCardClick(evt) {
    evt.preventDefault();
    this._callback.clickCard();
  }

  _onAddToWatchlistClick(evt) {
    evt.preventDefault();
    this._callback.clickWatchlist();
  }

  _onMarkAsWatchedClick(evt) {
    evt.preventDefault();
    this._callback.clickWatched();
  }

  _onFavoriteClick(evt) {
    evt.preventDefault();
    this._callback.clickFavorite();
  }

  static parseFilmToData(film) {
    return Object.assign(
      {},
      film,
      {
        releaseYear: dayjs(film.release).format('YYYY'),
        runtimeText: formatRuntime(film.runtime),
        genre: film.genres[0],
        commentsAmount: film.comments.length,
        commentsPostfix: film.comments.length === 1 ? 'comment' : 'comments',
        description: film.description.length > DESCRIPTION_MAX_LENGTH
          ? `${film.description.slice(0, DESCRIPTION_MAX_LENGTH - 1)}…`
          : film.description,
      },
    );
  }
}

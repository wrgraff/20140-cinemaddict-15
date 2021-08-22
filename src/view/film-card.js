import dayjs from 'dayjs';
import AbstractView from '@view/abstract.js';
import { DESCRIPTION_MAX_LENGTH } from '@const/films.js';
import { formatRuntime } from '@utils/format.js';

const createFilmCardTemplate = ( film ) => {
  const releaseYear = dayjs(film.release).format('YYYY');
  const description = film.description.length <= DESCRIPTION_MAX_LENGTH
    ? film.description
    : `${film.description.slice(0, DESCRIPTION_MAX_LENGTH - 1)}…`;

  return (`
    <article class="film-card">
      <h3 class="film-card__title">${film.name}</h3>

      <p class="film-card__rating">${film.rating.toFixed(1)}</p>

      <p class="film-card__info">
        <span class="film-card__year">${releaseYear}</span>
        <span class="film-card__duration">${formatRuntime(film.runtime)}</span>
        <span class="film-card__genre">${film.genres[0]}</span>
      </p>

      <img src="./${film.poster}" alt="Poster for ${film.name}" class="film-card__poster">

      <p class="film-card__description">${description}</p>

      <a class="film-card__comments">${film.comments.length} comment${film.comments.length !== 1 ? 's' : ''}</a>

      <div class="film-card__controls">
        <button class="
          film-card__controls-item
          film-card__controls-item--add-to-watchlist
          ${film.isInWatchlist ? 'film-card__controls-item--active' : ''}
        " type="button">Add to watchlist</button>

        <button class="
          film-card__controls-item
          film-card__controls-item--mark-as-watched
          ${film.isWatched ? 'film-card__controls-item--active' : ''}
        " type="button">Mark as watched</button>

        <button class="
          film-card__controls-item
          film-card__controls-item--favorite
          ${film.isFavorite ? 'film-card__controls-item--active' : ''}
        " type="button">Mark as favorite</button>
      </div>
    </article>
  `);
};

export default class FilmCard extends AbstractView {
  constructor(film) {
    super();
    this._film = film;
    this._onCardClick = this._onCardClick.bind(this);
  }

  getTemplate() {
    return createFilmCardTemplate(this._film);
  }

  setOnCardClick(callback) {
    this._callback.clickCard = callback;
    this.getElement().querySelectorAll('.film-card__title, .film-card__poster, .film-card__comments').forEach((element) => {
      element.addEventListener('click', this._onCardClick);
    });
  }

  _onCardClick(evt) {
    evt.preventDefault();
    this._callback.clickCard();
  }
}

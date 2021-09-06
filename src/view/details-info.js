import dayjs from 'dayjs';
import AbstractView from '@view/abstract.js';
import { formatRuntime } from '@utils/format.js';

const createDetailsInfoTemplate = (data) => (`
  <div class="film-details__info-wrap">
    <div class="film-details__poster">
      <img class="film-details__poster-img" src="./${data.poster}" alt="Poster for ${data.name}">

      <p class="film-details__age">${data.ageRating}+</p>
    </div>

    <div class="film-details__info">
      <div class="film-details__info-head">
        <div class="film-details__title-wrap">
          <h3 class="film-details__title">${data.name}</h3>
          <p class="film-details__title-original">Original: ${data.originalName}</p>
        </div>

        <div class="film-details__rating">
          <p class="film-details__total-rating">${data.rating.toFixed(1)}</p>
        </div>
      </div>

      <table class="film-details__table">
        <tr class="film-details__row">
          <td class="film-details__term">Director</td>
          <td class="film-details__cell">${data.director}</td>
        </tr>
        <tr class="film-details__row">
          <td class="film-details__term">Writers</td>
          <td class="film-details__cell">${data.writers.join(', ')}</td>
        </tr>
        <tr class="film-details__row">
          <td class="film-details__term">Actors</td>
          <td class="film-details__cell">${data.actors.join(', ')}</td>
        </tr>
        <tr class="film-details__row">
          <td class="film-details__term">Release Date</td>
          <td class="film-details__cell">${data.release}</td>
        </tr>
        <tr class="film-details__row">
          <td class="film-details__term">Runtime</td>
          <td class="film-details__cell">${data.runtime}</td>
        </tr>
        <tr class="film-details__row">
          <td class="film-details__term">Country</td>
          <td class="film-details__cell">${data.country}</td>
        </tr>
        <tr class="film-details__row">
          <td class="film-details__term">${data.genres.length > 1 ? 'Genres' : 'Genre'}</td>
          <td class="film-details__cell">
            ${data.genres.map((genre) => (`<span class="film-details__genre">${genre}</span>`)).join('')}
          </td>
        </tr>
      </table>

      <p class="film-details__film-description">${data.description}</p>
    </div>
  </div>
`);

export default class DetailsInfo extends AbstractView {
  constructor(film) {
    super();
    this._data = DetailsInfo.parseFilmToData(film);
  }

  getTemplate() {
    return createDetailsInfoTemplate(this._data);
  }

  static parseFilmToData(film) {
    return Object.assign(
      {},
      film,
      {
        release: dayjs(film.release).format('DD MMMM YYYY'),
        runtime: formatRuntime(film.runtime),
      },
    );
  }
}

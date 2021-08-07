import dayjs from 'dayjs';

export const createFilmCardTemplate = ( film ) => {
  const releaseYear = dayjs(film.release).format('YYYY');
  const runtimeHours = Math.round(film.runtime / 60);
  const runtimeMinutes = film.runtime % 60;
  const descriptionAnons = film.description.length <= 140
    ? film.description
    : `${film.description.slice(0, 139)}…`;

  return (`
    <article class="film-card">
      <h3 class="film-card__title">${film.name}</h3>

      <p class="film-card__rating">${film.rating.toFixed(1)}</p>

      <p class="film-card__info">
        <span class="film-card__year">${releaseYear}</span>
        <span class="film-card__duration">${runtimeHours}h ${runtimeMinutes}m</span>
        <span class="film-card__genre">${film.genres[0]}</span>
      </p>

      <img src="./images/posters/${film.poster}" alt="Poster for ${film.name}" class="film-card__poster">

      <p class="film-card__description">${descriptionAnons}</p>

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

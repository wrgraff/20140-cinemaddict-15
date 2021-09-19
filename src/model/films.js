import AbstractObserver from '@utils/abstract-observer.js';

export default class Films extends AbstractObserver {
  constructor() {
    super();
    this._items = [];
  }

  set(updateType, items) {
    this._items = items.slice();

    this._notify(updateType);
  }

  getAll() {
    return this._items;
  }

  isEmpty() {
    return this._items.length === 0;
  }

  updateById(updateType, updatedItem) {
    const index = this._items.findIndex((item) => item.id === updatedItem.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting film');
    }

    this._items = [
      ...this._items.slice(0, index),
      updatedItem,
      ...this._items.slice(index + 1),
    ];

    this._notify(updateType, updatedItem);
  }

  static adaptToClient(film) {
    const adaptedFilm = Object.assign(
      {},
      film,
      {
        name: film.film_info.title,
        originalName: film.film_info.alternative_title,
        poster: film.film_info.poster,
        rating: film.film_info.total_rating,
        director: film.film_info.director,
        writers: film.film_info.writers,
        actors: film.film_info.actors,
        release: new Date(film.film_info.release.date),
        runtime: film.film_info.runtime,
        country: film.film_info.release.release_country,
        genres: film.film_info.genre,
        description: film.film_info.description,
        ageRating: film.film_info.age_rating,
        watchedDate: new Date(film.user_details.watching_date),
        isInWatchlist: film.user_details.watchlist,
        isWatched: film.user_details.already_watched,
        isFavorite: film.user_details.favorite,
      },
    );

    delete adaptedFilm['film_info'];
    delete adaptedFilm['user_details'];

    return adaptedFilm;
  }

  static adaptCommentToClient(comment) {
    const adaptedComment = Object.assign(
      {},
      comment,
      {
        name: comment.author,
        text: comment.comment,
        date: new Date(comment.date),
      },
    );

    delete adaptedComment['author'];
    delete adaptedComment['comment'];

    return adaptedComment;
  }

  static adaptToServer(film) {
    const adaptedFilm = Object.assign(
      {},
      film,
      {
        'film_info': {
          'title': film.name,
          'alternative_title': film.originalName,
          'poster': film.poster,
          'total_rating': film.rating,
          'director': film.director,
          'writers': film.writers,
          'actors': film.actors,
          'release': {
            'date': film.release.toISOString(),
            'release_country': film.country,
          },
          'runtime': film.runtime,
          'genre': film.genres,
          'description': film.description,
          'age_rating': film.rating,
        },
        'user_details': {
          'watched_date': film.watchedDate.toISOString(),
          'watchlist': film.isInWatchlist,
          'already_watched': film.isWatched,
          'favorite': film.isFavorite,
        },
      },
    );

    delete adaptedFilm['name'];
    delete adaptedFilm['originalName'];
    delete adaptedFilm['poster'];
    delete adaptedFilm['rating'];
    delete adaptedFilm['ageRating'];
    delete adaptedFilm['director'];
    delete adaptedFilm['writers'];
    delete adaptedFilm['actors'];
    delete adaptedFilm['release'];
    delete adaptedFilm['country'];
    delete adaptedFilm['runtime'];
    delete adaptedFilm['genres'];
    delete adaptedFilm['description'];
    delete adaptedFilm['runtime'];
    delete adaptedFilm['rating'];
    delete adaptedFilm['watchedDate'];
    delete adaptedFilm['isInWatchlist'];
    delete adaptedFilm['isWatched'];
    delete adaptedFilm['isFavorite'];

    return adaptedFilm;
  }
}

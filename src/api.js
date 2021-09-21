import FilmsModel from './model/films.js';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

export default class Api {
  constructor(endpoint, authorization) {
    this._endPoint = endpoint;
    this._authorization = authorization;
  }

  getFilms() {
    return this._load({ url: 'movies' })
      .then(Api.toJSON)
      .then((films) => films.map(FilmsModel.adaptToClient));
  }

  updateFilm(film) {
    return this._load({
      url: `movies/${film.id}`,
      method: Method.PUT,
      body: JSON.stringify( FilmsModel.adaptToServer(film) ),
      headers: new Headers({'Content-Type': 'application/json'}),
    })
      .then(Api.toJSON)
      .then(FilmsModel.adaptToClient);
  }

  getCommentsById({ id }) {
    return this._load({ url: `comments/${id}` })
      .then(Api.toJSON)
      .then((comments) => comments.map(FilmsModel.adaptCommentToClient));
  }

  addComment(filmId, comment) {
    return this._load({
      url: `comments1111/${filmId}`,
      method: Method.POST,
      body: JSON.stringify( FilmsModel.adaptCommentToServer(comment) ),
      headers: new Headers({'Content-Type': 'application/json'}),
    })
      .then(Api.toJSON)
      .then(({ comments, movie }) => ({
        film: FilmsModel.adaptToClient(movie),
        comments: comments.map(FilmsModel.adaptCommentToClient),
      }));
  }

  deleteComment(commentId) {
    return this._load({
      url: `comments/${commentId}`,
      method: Method.DELETE,
    });
  }

  _load({ url, method = Method.GET, body = null, headers = new Headers() }) {
    headers.append('Authorization', this._authorization);

    return fetch( `${this._endPoint}/${url}`, { method, headers, body })
      .then(Api.checkStatus)
      .catch(Api.catchError);
  }

  static checkStatus(response) {
    if (!response.ok) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }

    return response;
  }

  static catchError(error) {
    throw error;
  }

  static toJSON(response) {
    return response.json();
  }
}

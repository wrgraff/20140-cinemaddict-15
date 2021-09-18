import FilmsModel from './model/films.js';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
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

import { render } from '@utils/render.js';
import FilmCardView from '@view/film-card.js';

export default class Film {
  constructor(container, detailsPresenter) {
    this._container = container;

    this._cardComponent = null;
    this._detailsPresenter = detailsPresenter;
  }

  init(film) {
    if (this._cardComponent !== null) {
      this._cardComponent.remove();
    }

    this._cardComponent = new FilmCardView(film);
    this._cardComponent.setOnCardClick(() => this._detailsPresenter.init(film));
    render(this._container, this._cardComponent);
  }

  static create(container, detailsPresenter, film) {
    const filmPresenter = new this(container, detailsPresenter);
    filmPresenter.init(film);
    return filmPresenter;
  }
}

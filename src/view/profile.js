import AbstractView from '@view/abstract.js';

const createProfileRatingTemplate = (isLoading, rank) => `<p class="profile__rating">${isLoading ? 'Loading...' : rank}</p>`;

const createProfileTemplate = (isLoading, rank) => (`
  <section class="header__profile profile">
    ${ rank !== '' ? createProfileRatingTemplate(isLoading, rank) : '' }
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>
`);

export default class Profile extends AbstractView {
  constructor(rank, isLoading = true) {
    super();
    this._rank = rank;
    this._isLoading = isLoading;
  }

  getTemplate() {
    return createProfileTemplate(this._isLoading, this._rank);
  }
}

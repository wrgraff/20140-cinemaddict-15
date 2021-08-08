import { RANKS } from '@const/statistic.js';

export const createStatisticRankTemplate = ( amount ) => {
  let textRank = '';

  for (const [key, value] of Object.entries( RANKS )) {
    if (amount > key) {
      textRank = value;
    }
  }

  return (`
    <p class="statistic__rank">
      Your rank
      <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
      <span class="statistic__rank-label">${textRank}</span>
    </p>
  `);
};

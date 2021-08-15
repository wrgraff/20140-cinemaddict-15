import dayjs from 'dayjs';
import { getRandomInteger, getRandomItems } from '@utils/random.js';

const names = [
  'The Dance of Life',
  'Sagebrush Trail',
  'The Man with the Golden Arm',
  'Santa Claus Conquers the Martians',
  'Popeye the Sailor Meets Sindbad the Sailor',
  'The Great Flamarion',
  'Made for Each Other',
];

const posters = [
  'images/posters/made-for-each-other.png',
  'images/posters/popeye-meets-sinbad.png',
  'images/posters/sagebrush-trail.jpg',
  'images/posters/santa-claus-conquers-the-martians.jpg',
  'images/posters/the-dance-of-life.jpg',
  'images/posters/the-great-flamarion.jpg',
  'images/posters/the-man-with-the-golden-arm.jpg',
];

const directors = [
  'Anthony Mann',
  'David Lynch',
  'Martin Scorsese',
  'Joel and Ethan Coen',
  'Steven Soderbergh',
  'Quentin Tarantino',
  'Aleksandr Sokurov',
  'Larry and Andy Wachowski',
  'Lars von Trier',
  'Stanley Kubrick',
];

const writers = [
  'Anne Wigton',
  'Heinz Herald',
  'Richard Weil',
  'Quentin Tarantino',
  'Joel and Ethan Coen',
  'Francis Ford Coppola',
  'Charlie Kaufman',
  'Woody Allen',
  'Stanley Kubrick',
  'Ricky Gervais',
];

const actors = [
  'Melissa McCarthy',
  'Catherine Deneuve',
  'Tilda Swinton',
  'Joaquin Phoenix',
  'Nicole Kidman',
  'Keanu Reeves',
  'Natalie Portman',
  'Lupita Nyong’o',
  'Ryan Gosling',
  'Bryan Cranston',
  'Cate Blanchett',
  'Christian Bale',
  'Robert Downey Jr.',
];

const countries = [
  'USA',
  'France',
  'China',
  'India',
  'UK',
  'Poland',
  'Nigeria',
  'Egypt',
  'Iran',
  'Japan',
  'Korea',
  'Hong Kong',
  'Turkey',
  'Pakistan',
  'Bangladesh',
  'Indonesia',
  'Trinidad and Tobago',
  'Nepal',
];

const genres = [
  'Musical',
  'Western',
  'Drama',
  'Comedy',
  'Cartoon',
  'Mystery',
  'Film-Noir',
];

const descriptions = [
  'The film opens following a murder at a cabaret in Mexico City in 1936, and then presents the events leading up to it in flashback. The Great Flamarion (Erich von Stroheim) is an arrogant, friendless, and misogynous marksman who displays his trick gunshot act in the vaudeville circuit. His show features a beautiful assistant, Connie (Mary Beth Hughes) and her drunken husband Al (Dan Duryea), Flamarions other assistant. Flamarion falls in love with Connie, the movies femme fatale, and is soon manipulated by her into killing her no good husband during one of their acts.',
  'Dreamy delivery girl Ramona captures Scott Pilgrim heart, but he must vanquish all seven of her evil exes in martial arts battles to win her love.',
  'In an alternate Earth, superheroes are commonplace. Now labeled outlaws, they must save themselves. And the world.',
  'Billionaire Bruce Wayne must once again don the cape of his alter ego, Batman, when Gotham is threatened by new foes such as Catwoman and Bane.',
  'Amid starvation, an offer of a meal and some escape. They’re in for a show, but will they live to see it through to the end?',
  'With chiseled good looks that belie his insanity, a businessman takes pathological pride in yuppie pursuits and indulges in sudden homicidal urges.',
  'When an organized-crime family patriarch barely survives an attempt on his life, his youngest son steps in to take care of the would-be killers.',
];

const ageRatings = [
  '0',
  '14',
  '18',
];

export const generateFilm = (commentsTotalAmount) => {
  const filmName = getRandomItems(names)[0];
  const filmCommentsAmount = getRandomInteger(0, 5);
  const filmComments = new Array(filmCommentsAmount).fill('').map(() => getRandomInteger(0, commentsTotalAmount));

  return {
    name: filmName,
    originalName: filmName,
    poster: getRandomItems(posters)[0],
    rating: getRandomInteger(0, 100) / 10,
    director: getRandomItems(directors)[0],
    writers: getRandomItems(writers, 3),
    actors: getRandomItems(actors, 3),
    release: dayjs(new Date(getRandomInteger(1906, 2020), getRandomInteger(1, 12), getRandomInteger(1, 31))).format('YYYY-MM-DD'),
    runtime: getRandomInteger(70, 120),
    country: getRandomItems(countries)[0],
    genres: getRandomItems(genres, 3),
    description: getRandomItems(descriptions)[0],
    ageRating: getRandomItems(ageRatings)[0],
    isInWatchlist: Boolean(getRandomInteger(0, 1)),
    isWatched: Boolean(getRandomInteger(0, 1)),
    isFavorite: Boolean(getRandomInteger(0, 1)),
    comments: filmComments,
  };
};

import dayjs from 'dayjs';
import { getRandomInteger, getRandomItems } from '@utils/random.js';
import { EMOTIONS } from '@const/comments.js';

const names = [
  'Max',
  'Lewis',
  'Valtteri',
  'Checo',
  'Yuki',
  'Nikita',
  'Fernando',
  'Nicholas',
  'Lando',
  'Antonio',
  'Lance',
  'Daniel',
  'Kimi',
  'Sebastian',
  'Charles',
  'George',
  'Pierre',
  'Carlos',
];

const surnames = [
  'Verstappen',
  'Hamilton',
  'Bottas',
  'Perez',
  'Tsunoda',
  'Mazespin',
  'Alonso',
  'Latifi',
  'Norris',
  'Giovinazzi',
  'Stroll',
  'Ricciardo',
  'Raikkonen',
  'Vettel',
  'Leclerc',
  'Russel',
  'Gasli',
  'Sainz',
];

const comments = [
  'Interesting setting and a good cast',
  'Booooooooooring',
  'Very very old. Meh',
  'Almost two hours? Seriously?',
  'laudantium enim quasi est quidem magnam voluptate ipsam eos tempora quo necessitatibus dolor quam autem quasi reiciendis et nam sapiente accusantium',
  'est natus enim nihil est…oluptatem reiciendis et',
  'quia molestiae reprehend…epturi deleniti ratione',
  'non et atque noccaecati …m deleniti ut occaecati',
  'harum non quasi et ratio…voluptates magni quo et',
  'doloribus at sed quis cu…s aspernatur dolorem in',
  'He is not used to turning off the car cause at Williams you just wait for it to break down first.',
  'I like how Bono is not used to saying p2 xddd.',
  'They sound like they are already good friends',
  'The only week we all become a Mercedes fan',
  'First time being out qualified by his team mate in F1..What an epic display of doing the job on the day..Nice One George..',
  'I see a lot of potential in george russell, both on his performance and how he is speaking and all what not, hes doing very good so far, i am expectig him to be in the top five and between 2 nd and 3rd',
  'This guy went from chasing down Hamilton for an autograph almost a decade ago, to filling in for Hamilton in his 7th WDC and WCC car and locking out front row with Bottas.',
];

export const generateComment = ( {index} ) => ({
  id: index,
  date: dayjs(
    new Date(
      getRandomInteger(1906, 2020),
      getRandomInteger(1, 12),
      getRandomInteger(1, 31),
      getRandomInteger(0, 23),
      getRandomInteger(0, 60),
    )).format('YYYY-MM-DD HH:MM'),
  name: `${getRandomItems(names)[0]} ${getRandomItems(surnames)[0]}`,
  text: getRandomItems(comments)[0],
  emotion: getRandomItems(EMOTIONS)[0],
});

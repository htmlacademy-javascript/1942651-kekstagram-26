const NAMES = [
  'Олег',
  'Любамир',
  'Аристарх',
  'Слава',
  'Свят',
  'Роберт'
];

const DESCPTIONS = [
  'описание 1',
  'описание 2',
  'описание 3',
  'описание 4',
  'описание 5',
  'описание 6'
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

let id = 0;

const checkMaxLength = (string, maxLength) => string.length <= maxLength;


//https://myrusakov.ru/js-random-numbers.html
const getRandom = (min, max) =>Math.floor(Math.random() * (max - min + 1)) + min;

const getRandomArrayElement = (elements) => elements[getRandom(0, elements.length -1)];

const createComments = () => ({
  id: getRandom(1,  666),
  avatar: `img/avatar-${getRandom(1,  6)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES)
});

const createDescription = () => ({
  id: ++id,
  url: `photos/${id}.jpg`,
  description: getRandomArrayElement(DESCPTIONS),
  likes: getRandom(15, 200),
  comments: Array.from({length: getRandom(1, 25)}, createComments)
});
const photoDescription = Array.from({length: 25}, createDescription);
export {photoDescription};
export {checkMaxLength};

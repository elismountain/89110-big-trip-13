import {getRandomArrayElements} from "../mocks/random.js";
import {getRandomArrayElement} from "../mocks/random.js";
import {getRandomInteger} from "../mocks/random.js";
import {TYPES} from "../const.js";
import {CITIES} from "../mocks/const.js";

const DESCRIPTION = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;
const PHOTOS_MAX_COUNT = 10;
const PRICE_MAX = 100;
const PRICE_MIN = 1;
const EVENTS_COUNT = 4;

// от одного до 5 предложений. до точки
export const DESCRIPTION_ARRAY = DESCRIPTION.split(`. `);
export const generateDescription = () => {
  return getRandomArrayElements(DESCRIPTION_ARRAY, 3);
};

// от 1 до 10 фото случайно
export const generatePhotosArray = () => {
  const photosCount = getRandomInteger(1, PHOTOS_MAX_COUNT);
  const photos = [];
  for (let i = 0; i < photosCount; i++) {
    const RANDOM_PHOTO_URL = `http://picsum.photos/300/150?r=${Math.random()}`;
    photos.push(RANDOM_PHOTO_URL);
  }
  return photos;
};


export const OFFERS = [
  {name: `Add luggage`, type: `luggage`, cost: 10},
  {name: `Switch to comfort class`, type: `comfort`, cost: 150},
  {name: `Add meal`, type: `meal`, cost: 2},
  {name: `Choose seats`, type: `seats`, cost: 9},
];

const generateAddOptions = () => {
  return getRandomArrayElements(OFFERS, 2);
};

const getRandomDate = () => {
  const targetDate = new Date();
  const sign = Math.random() > 0.5 ? 1 : -1;
  const diffValue = sign * getRandomInteger(0, 7);
  targetDate.setDate(targetDate.getDate() + diffValue);
  return targetDate;
};

const getRandomNextDate = (date) => {
  date.setDate(date.getDate() + getRandomInteger(0, 2));
  date.setHours(date.getHours() + getRandomInteger(0, 24));
  date.setMinutes(date.getMinutes() + getRandomInteger(0, 60));
  return date;
};

export const generateEvent = () => {
  const randomDate = getRandomDate();

  return {
    type: getRandomArrayElement(TYPES),
    city: getRandomArrayElement(CITIES),
    photos: generatePhotosArray(),
    description: generateDescription(),
    price: getRandomInteger(PRICE_MIN, PRICE_MAX),
    startTime: new Date(randomDate),
    endTime: new Date(getRandomNextDate(randomDate)),
    options: generateAddOptions(),
    isFavorite: getRandomInteger(0, 1) === 1 // строгое сравнение
  };
};

export const generateEvents = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateEvent);
};

export const events = generateEvents(EVENTS_COUNT);

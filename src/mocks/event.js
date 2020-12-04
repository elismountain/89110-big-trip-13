import {getRandomArrayElements, getRandomArrayElement, getRandomInteger} from "../mocks/random.js";
import {formatDateTime} from "../utils/date.js";
import {TYPES, CITIES, DESCRIPTION, OFFER_TYPES, OTHER_OPTIONS} from "../mocks/const.js";

const PHOTOS_MAX_COUNT = 10;
const PRICE_MAX = 500;
const PRICE_MIN = 5;
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

const generateId = () => {
  return Date.now() + parseInt(Math.random() * 10000, 10);
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

    offers: {
      offerType: OFFER_TYPES[getRandomInteger(OFFER_TYPES.length - 1)],
      title: OTHER_OPTIONS[getRandomInteger(OTHER_OPTIONS.length - 1)],
      price: getRandomInteger(PRICE_MIN, PRICE_MAX),
      checked: Boolean(getRandomInteger())
    },
    destination: {
      description: generateDescription(),
      photos: generatePhotosArray()
    },
    startTime: new Date(randomDate),
    endTime: new Date(getRandomNextDate(randomDate)),
    options: generateAddOptions(),
    isFavorite: getRandomInteger(0, 1) === 1,
    id: generateId(),
    mainPrice: getRandomInteger(500, 5000),
    date: formatDateTime()
  };
};

export const generateEventsArrey = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateEvent);
};

export const events = generateEventsArrey(EVENTS_COUNT);

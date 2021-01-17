import {getRandomArrayElement, getRandomInteger} from "../mocks/random.js";
import {OFFERS, DESTINATIONS, WAYPOINT_TYPES} from "../mocks/const.js";
const WAYPOINTS_COUNT = 4;
import {nanoid} from 'nanoid';

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

const getRandomOffersByWaypointType = (offers, waypointType) => {
  const selectedOffers = [];
  for (let i = 0; i < offers.length; i++) {
    if (offers[i].type === waypointType) {
      for (let j = 0; j < offers[i].offers.length; j++) {
        if (getRandomInteger(0, 1)) {
          selectedOffers.push(offers[i].offers[j]);
        }
      }
    }
  }
  return selectedOffers;
};

export const generateWaypoint = () => {
  const randomDate = getRandomDate();
  const waypointType = getRandomArrayElement(WAYPOINT_TYPES);

  const waypoint = {
    type: waypointType,
    destination: getRandomArrayElement(DESTINATIONS),
    options: getRandomOffersByWaypointType(OFFERS, waypointType),
    startTime: new Date(randomDate),
    endTime: new Date(getRandomNextDate(randomDate)),
    isFavorite: getRandomInteger(0, 1) === 1,
    id: nanoid(),
    price: getRandomInteger(500, 5000),
  };
  return waypoint;
};

export const generateWaypointsArray = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateWaypoint);
};

export const waypoints = generateWaypointsArray(WAYPOINTS_COUNT);

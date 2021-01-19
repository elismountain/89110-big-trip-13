import {getRandomInteger, getRandomItems} from "../mocks/random.js";
// import {OFFERS, DESTINATIONS, WAYPOINT_TYPES} from "../mocks/const.js";
// const WAYPOINTS_COUNT = 4;
import {nanoid} from 'nanoid';
import dayjs from 'dayjs';


// const getRandomDate = () => {
//   const targetDate = new Date();
//   const sign = Math.random() > 0.5 ? 1 : -1;
//   const diffValue = sign * getRandomInteger(0, 7);
//   targetDate.setDate(targetDate.getDate() + diffValue);
//   return targetDate;
// };

// const getRandomNextDate = (date) => {
//   date.setDate(date.getDate() + getRandomInteger(0, 2));
//   date.setHours(date.getHours() + getRandomInteger(0, 24));
//   date.setMinutes(date.getMinutes() + getRandomInteger(0, 60));
//   return date;
// };

// const getRandomOffersByWaypointType = (offers, waypointType) => {
//   const selectedOffers = [];
//   for (let i = 0; i < offers.length; i++) {
//     if (offers[i].type === waypointType) {
//       for (let j = 0; j < offers[i].offers.length; j++) {
//         if (getRandomInteger(0, 1)) {
//           selectedOffers.push(offers[i].offers[j]);
//         }
//       }
//     }
//   }
//   return selectedOffers;
// };

// ======================================================================

const waypointTypeInfoMap = new Map(
    [
      [
        `taxi`,
        {
          title: `Taxi`,
          image: `img/icons/taxi.png`,
          offers: new Set([`uber`])
        }
      ],
      [
        `bus`,
        {
          title: `Bus`,
          image: `img/icons/bus.png`,
          offers: new Set()
        }
      ],
      [
        `train`,
        {
          title: `Train`,
          image: `img/icons/train.png`,
          offers: new Set()
        }
      ],
      [
        `ship`,
        {
          title: `Ship`,
          image: `img/icons/ship.png`,
          offers: new Set()
        }
      ],
      [
        `transport`,
        {
          title: `Transport`,
          image: `img/icons/transport.png`,
          offers: new Set()
        }
      ],
      [
        `drive`,
        {
          title: `Drive`,
          image: `img/icons/drive.png`,
          offers: new Set([`car`])
        }
      ],
      [
        `flight`,
        {
          title: `Flight`,
          image: `img/icons/flight.png`,
          offers: new Set([`luggage`, `comfort`])
        }
      ],
      [
        `check-in`,
        {
          title: `Check-In`,
          image: `img/icons/check-in.png`,
          offers: new Set([`breakfast`])
        }
      ],
      [
        `sightseeing`,
        {
          title: `Sightseeing`,
          image: `img/icons/sightseeing.png`,
          offers: new Set([`tickets`, `lunch`])
        }
      ],
      [
        `restaurant`,
        {
          title: `Restaurant`,
          image: `img/icons/restaurant.png`,
          offers: new Set()
        }
      ],
    ]
);

const offerInfoMap = new Map(
    [
      [`uber`, {title: `Order Uber`, price: 20}],
      [`car`, {title: `Rent a car`, price: 200}],
      [`luggage`, {title: `Add luggage`, price: 50}],
      [`comfort`, {title: `Switch to comfort`, price: 80}],
      [`breakfast`, {title: `Add breakfast`, price: 50}],
      [`tickets`, {title: `Book tickets`, price: 40}],
      [`lunch`, {title: `Lunch in city`, price: 30}]
    ]
);

const generateDestination = () => {
  const destinations = [...destinationInfoMap.keys()];
  const randomIndex = getRandomInteger(0, destinations.length - 1);
  return destinations[randomIndex];
};

const generatePhotos = () => {
  const randomSize = getRandomInteger(1, 3);
  const photos = new Array(randomSize).fill().map(() => `http://picsum.photos/248/152?r=${Math.random()}`);
  return photos;
};

const generateDescription = () => {
  const sampleDescription = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;
  const descriptions = Array.from(sampleDescription.matchAll(/([^.]*)\.\s*/g), (m) => m[1]);

  const randomDescriptions = getRandomItems(descriptions);
  return `${randomDescriptions.join(`. `)}.`;
};

const generateDestinationInfo = () => {
  const destinations = [
    `Amsterdam`,
    `Chamonix`,
    `Geneva`,
    `Tel Aviv`,
    `Washington`,
    `San Francisco`
  ];

  const destinationInfo = destinations.map(
      (destination) => [destination, {description: generateDescription(), photos: generatePhotos()}]
  );

  return new Map(destinationInfo);
};

const destinationInfoMap = generateDestinationInfo();

export const getDataForAllDestinations = () => {
  return destinationInfoMap;
};

const generateType = () => {
  const types = Array.from(waypointTypeInfoMap.keys());

  const randomIndex = getRandomInteger(0, types.length - 1);
  return types[randomIndex];
};

const generateOffers = (type) => {
  const eventTypeData = waypointTypeInfoMap.get(type);
  const offers = Array.from(eventTypeData.offers);

  if (offers.length > 0) {
    const randomSize = getRandomInteger(1, offers.length);
    offers.length = randomSize;
  }

  return new Set(offers);
};

const generateDate = (offsetFromNow = 0, offsetUnit = `h`) => {
  return dayjs().add(offsetFromNow, offsetUnit);
};

const generatePrice = () => {
  const upper = 1000;
  const lower = 100;
  const price = getRandomInteger(lower, upper);
  return price;
};

export const getDataForAllEventTypes = () => {
  return waypointTypeInfoMap;
};

export const getDataForAllOffers = () => {
  return offerInfoMap;
};

export const generateWaypoint = () => {
  const waypointType = generateType();

  const maxDaysOffset = 3;
  const randomOffsetDays = getRandomInteger(-maxDaysOffset, maxDaysOffset);

  const maxHoursOffset = 23;
  const randomOffsetHours = getRandomInteger(0, maxHoursOffset);

  const maxMinutesOffset = 59;
  const randomOffsetMinutes = getRandomInteger(0, maxMinutesOffset);

  const generatedDate = generateDate();

  const startTime = dayjs(generatedDate)
    .add(randomOffsetDays, `d`)
    .add(randomOffsetHours, `h`)
    .add(randomOffsetMinutes, `m`);

  const endTime = dayjs(startTime).add(Math.abs(randomOffsetDays), `d`).add(Math.abs(randomOffsetHours), `h`).add(Math.abs(randomOffsetMinutes), `m`);

  const waypoint = {
    id: nanoid(),
    destination: generateDestination(),
    price: generatePrice(),
    waypointType,
    startTime,
    endTime,
    options: generateOffers(waypointType),
    isFavorite: Boolean(getRandomInteger(0, 1))
  };
  return waypoint;
};

//
// ===================================================================================================
//
//
// export const generateWaypoint = () => {
//   const randomDate = getRandomDate();
//   const waypointType = getRandomArrayElement(WAYPOINT_TYPES);
//
//   const waypoint = {
// type: waypointType,
// destination: getRandomArrayElement(DESTINATIONS),
//  options: getRandomOffersByWaypointType(OFFERS, waypointType),
//  startTime: new Date(randomDate),
//  endTime: new Date(getRandomNextDate(randomDate)),
//  isFavorite: getRandomInteger(0, 1) === 1,
//  id: nanoid(),
//   price: getRandomInteger(500, 5000),
//   };
//   return waypoint;
// };
//
// export const generateWaypointsArray = (count) => {
//   return new Array(count)
//     .fill(``)
//     .map(generateWaypoint);
// };
//
// export const waypoints = generateWaypointsArray(WAYPOINTS_COUNT);

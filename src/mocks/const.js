import {getRandomInteger} from "../mocks/random.js";

export const CITIES = [`London`, `Glasgow`, `Belfast`, `Leeds`, `York`];
export const OFFER_TITLES = [`Order Uber`, `Meal`, `Choose seats`, `Travel by train`, `Switch to comfort`, `Rent a car`, `Breakfast`, `Lunch in city`];
export const WAYPOINT_TYPES = [`check-in`, `restaurant`, `sightseeing`, `taxi`, `bus`, `train`, `ship`, `transport`, `drive`, `flight`];

export const MESSAGE = {
  LOADING: `Loading...`,
  NO_POINTS: `Click New Event to create your first point`,
};

export const DESTINATIONS = [
  {name: `London`,
    description: `The capital of Great Britain`,
    photos: [
      `http://picsum.photos/300/150?r=${Math.random()}`,
      `http://picsum.photos/300/150?r=${Math.random()}`,
      `http://picsum.photos/300/150?r=${Math.random()}`
    ]
  },

  {name: `Glasgow`,
    description: ``,
    photos: []
  },

  {name: `Belfast`,
    description: `The capital of Northen Ireland `,
    photos: [
      `http://picsum.photos/300/150?r=${Math.random()}`
    ]
  },
];

export const OFFERS = [
  {type: WAYPOINT_TYPES[3],
    offers: [
      {title: OFFER_TITLES[4], price: getRandomInteger(500, 5000)},
      {title: OFFER_TITLES[0], price: getRandomInteger(500, 5000)}
    ]
  },

  {type: WAYPOINT_TYPES[9],
    offers: [
      {title: OFFER_TITLES[1], price: getRandomInteger(500, 5000)},
      {title: OFFER_TITLES[2], price: getRandomInteger(500, 5000)},
      {title: OFFER_TITLES[4], price: getRandomInteger(500, 5000)},
      {title: OFFER_TITLES[4], price: getRandomInteger(500, 5000)}
    ]
  },

  {type: WAYPOINT_TYPES[1],
    offers: [
      {title: OFFER_TITLES[0], price: getRandomInteger(500, 5000)},
      {title: OFFER_TITLES[6], price: getRandomInteger(500, 5000)},
      {title: OFFER_TITLES[7], price: getRandomInteger(500, 5000)}
    ]
  },

  {type: WAYPOINT_TYPES[2],
    offers: []
  }
];

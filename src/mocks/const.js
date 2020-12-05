import {getRandomInteger} from "../mocks/random.js";

export const CITIES = [`London`, `Glasgow`, `Belfast`, `Leeds`, `York`];
export const OFFER_TITLES = [`Order Uber`, `Meal`, `Choose seats`, `Travel by train`, `Switch to comfort`, `Rent a car`, `Breakfast`, `Lunch in city`];
export const DESCRIPTION = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;
export const WAYPOINT_TYPES = [`check-in`, `restaurant`, `sightseeing`, `taxi`, `bus`, `train`, `ship`, `transport`, `drive`, `flight`];

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
    photos: [
      `http://picsum.photos/300/150?r=${Math.random()}`
    ]
  },

  {name: `Belfast`,
    description: `The capital of Northen Ireland `,
    photos: [
      ``
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

//
// export const OFFERS: [
//   {type: OFFER_TYPES[0],
//     title: OTHER_OPTIONS[getRandomInteger(OTHER_OPTIONS.length - 1)],
//     price: getRandomInteger(PRICE_MIN, PRICE_MAX),
//   },
//
//   { type: OFFER_TYPES[1],
//     title: OTHER_OPTIONS[getRandomInteger(OTHER_OPTIONS.length - 1)],
//     price: getRandomInteger(PRICE_MIN, PRICE_MAX),
//   },
//
//   {type: OFFER_TYPES[2],
//     title: OTHER_OPTIONS[getRandomInteger(OTHER_OPTIONS.length - 1)],
//     price: getRandomInteger(PRICE_MIN, PRICE_MAX),
//   }
// ]

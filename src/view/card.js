import {PLACES} from "../mocks/const.js";

import {
  formatDateTime,
  formatDuration
} from "../utils/date.js";


const createOfferTemplates = (offers) => {
  return offers.map(({name, cost}) => {
    return (
      `<li class="event__offer">
        <span class="event__offer-title">${name}</span>
        &plus;
        &euro;&nbsp;<span class="event__offer-price">${cost}</span>
       </li>`
    );
  }).join(``);
};

export const createCardTemplate = (card) => {
  const {type, city, price, startTime, endTime, options, isFavorite} = card;

  return (
    `<li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="${formatDateTime(startTime).format(`YYYY-MM-DD`)}">${formatDateTime(startTime).format(`MMM D`)}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${card.type.toLowerCase()}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${card.type} ${PLACES.includes(type) ? `in` : `to`} ${city}</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${formatDateTime(startTime).format(`YYYY-MM-DDTHH:mm:ss`)}">${formatDateTime(startTime).format(`HH:mm`)}</time>
            &mdash;
            <time class="event__end-time" datetime="${formatDateTime(endTime).format(`YYYY-MM-DDTHH:mm:ss`)}">${formatDateTime(endTime).format(`HH:mm`)}</time>
          </p>
          <p class="event__duration">${formatDuration(endTime - startTime)}</p>
        </div>

        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${price}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
        ${createOfferTemplates(options)}
        </ul>

        <button class="event__favorite-btn ${isFavorite ? `event__favorite-btn--active` : `` }" type="button">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
};

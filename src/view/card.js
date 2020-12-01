import {PLACES} from "../const.js";
import {castTimeDateFormat} from "../utils/date.js";
import {getDuration} from "../utils/date.js";
import {humanizeDate} from "../utils/date.js";

const createOfferTemplates = (arrays) => {
  return arrays.map(({name, cost}) => {
    return (
      `<li class="event__offer">
        <span class="event__offer-title">${name}</span>
        &plus;
        &euro;&nbsp;<span class="event__offer-price">${cost}</span>
       </li>`
    );
  }).join(`\n`);
};

export const createCardTemplate = (card) => {
  const {type, city, price, startTime, endTime, options, isFavorite} = card;
  const {days, hours, minutes} = getDuration(endTime - startTime);
  const date = humanizeDate();

  return (
    `<li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="${date}">${date}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${type} ${PLACES.includes(type) ? `in` : `to`} ${city}</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${startTime.toISOString()}">${castTimeDateFormat(startTime.getHours())}:${castTimeDateFormat(startTime.getMinutes())}</time>
            &mdash;
            <time class="event__end-time" datetime="${startTime.toISOString()}">${castTimeDateFormat(endTime.getHours())}:${castTimeDateFormat(endTime.getMinutes())}</time>
          </p>
          <p class="event__duration">${days === 0 ? `` : `${castTimeDateFormat(days)}D`} ${days + hours === 0 ? `` : `${castTimeDateFormat(hours)}H`} ${castTimeDateFormat(minutes)}M</p>
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

import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import {waypointTypes} from '../utils/const.js';
import {formatDate, formatDuration} from '../utils/waypoint.js';
import AbstractView from "./abstract.js";

dayjs.extend(duration);

const createWaypointOfferTemplates = ({title, price}) => {
  return `<li class="event__offer">
  <span class="event__offer-title">${title}</span>
  &plus;
  &euro;&nbsp;<span class="event__offer-price">${price}</span>
  </li>`;
};

const createWaypointOffersTemplate = (offers) => {
  return offers.length > 0 ? `<h4 class="visually-hidden">Offers:</h4>
    <ul class="event__selected-offers">
    ${Array.from(offers).map((offerValue) => createWaypointOfferTemplates(offerValue)).join(``)}
  </ul>` : ``;
};

const createCardTemplate = (waypoint) => {

  const {type, startTime, endTime, destination, price, isFavorite, offers} = waypoint;

  const offersTemplate = createWaypointOffersTemplate(offers);


  const formattedDuration = formatDuration(startTime, endTime);

  const typeIcon = waypointTypes.get(type).src;

  const favoriteClassName = isFavorite ? `event__favorite-btn event__favorite-btn--active` : `event__favorite-btn`;

  return (
    `<li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="${formatDate(startTime, `YYYY-MM-DD`)}">${formatDate(startTime, `MMM D`)}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="${typeIcon}" alt="Event type icon">
        </div>
        <h3 class="event__title">${type} ${destination.name}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${formatDate(startTime, `YYYY-MM-DDTHH:mm`)}">${formatDate(startTime, `HH:mm`)}</time>
            &mdash;
            <time class="event__end-time" datetime="${formatDate(endTime, `YYYY-MM-DDTHH:mm`)}">${formatDate(endTime, `HH:mm`)}</time>
          </p>
          <p class="event__duration">${formattedDuration}</p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${price}</span>
        </p>
        ${offersTemplate}
        <button class="${favoriteClassName}" type="button">
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


export default class TripWaypoint extends AbstractView {
  constructor(waypoint) {
    super();
    this._waypoint = waypoint;

    this._onRollupButtonClick = this._onRollupButtonClick.bind(this);
    this._onFavoriteClick = this._onFavoriteClick.bind(this);
  }

  getTemplate() {
    return createCardTemplate(this._waypoint);
  }

  setRollupButtonClickHandler(callback) {
    this._callback.clickCard = callback;
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._onRollupButtonClick);
  }

  setFavoriteClickHandler(callback) {
    this._callback.clickFavorite = callback;
    this.getElement().querySelector(`.event__favorite-btn`)
      .addEventListener(`click`, this._onFavoriteClick);
  }

  _onRollupButtonClick(evt) {
    evt.preventDefault();
    this._callback.clickCard();
  }

  _onFavoriteClick(evt) {
    evt.preventDefault();
    this._callback.clickFavorite();
  }
}

import {formatDateTime} from "../utils/date.js";
import Abstract from "./abstract.js";

const createOptionsTemplate = (destinations) => {
  return destinations
    .map((item) => {
      return `<option value="${item.name}"></option>`;
    }).join(``);
};

const createWaypointTypeTemplate = (types, selectedType) => {
  return types
          .map((waypointType, index) => {
            return `<div class="event__type-item">
              <input id="event-type-${waypointType}-1-${index}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${waypointType}" ${waypointType === selectedType ? `checked` : ``}>
              <label class="event__type-label  event__type-label--${waypointType}" for="event-type-${waypointType}-1">${waypointType}</label>
            </div>`;
          }).join(``);
};

const createOfferSelectorTemplate = (allOffers, selectedOptions) => {
  const offersList = allOffers.map((offer) => {
    return `
            <div class="event__offer-selector">
              <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.title}-1" type="checkbox" name="event-offer-${offer.title}" ${selectedOptions.includes(offer) ? `checked` : ``}>
              <label class="event__offer-label" for="event-offer-${offer.title}-1">
                <span class="event__offer-title">Add ${offer.title}</span>
                &plus;&euro;&nbsp;
                <span class="event__offer-price">${offer.price}</span>
              </label>
            </div>`;
  }).join(``);

  return `<h3 class="event__section-title  event__section-title--offers">Offers</h3>
            <div class="event__available-offers">
              ${offersList};
            </div>`;
};

const createDestinationPhotosTemplate = (waypoint) => {
  return waypoint.destination.photos.map((item) => {
    return `<img class="event__photo" src="${item}" alt="Event photo">`;
  }).join(``);
};

const createDestinationsTemplate = (waypoint) => {
  return (`<section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${waypoint.destination.description}</p>

      <div class="event__photos-container">
        <div class="event__photos-tape">
        ${createDestinationPhotosTemplate(waypoint)}
        </div>
      </div>
    </section>`
  );
};


const getOffersByWaypointType = (offers, waypointType) => {
  const result = offers.find((item) => {
    return item.type === waypointType;
  });

  return result === undefined ? [] : result.offers;
};


const createEditFormTemplate = (waypoint, allDestinations, waypointTypes, offers) => {

  const destinationsSelector = createOptionsTemplate(allDestinations);
  const needHideDestination = waypoint.destination.description.length === 0 && waypoint.destination.photos.length === 0;
  const waypointTypeTemplate = createWaypointTypeTemplate(waypointTypes, waypoint.type);
  const needHideOfferSelector = waypoint.options.length === 0;
  const offerSelectorTemplate = createOfferSelectorTemplate(getOffersByWaypointType(offers, waypoint.type), waypoint.options);

  return `<ol class="trip-events__item">
  <form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${waypoint.type.toLowerCase()}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>
            ${waypointTypeTemplate}

          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
          ${waypoint.type}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${waypoint.destination.name}" list="destination-list-1">
        <datalist id="destination-list-1">
          ${destinationsSelector}
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${formatDateTime(waypoint.startTime).format(`YYYY/MM/DD HH:mm`)}">
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${formatDateTime(waypoint.endTime).format(`YYYY/MM/DD HH:mm`)}">
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="number" name="event-price" min="0" value="${waypoint.price}">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Cancel</button>
    </header>
    <section class="event__details">
      <section class="event__section  event__section--offers">
          ${needHideOfferSelector ? `` : offerSelectorTemplate}
      </section>
      ${needHideDestination ? `` : createDestinationsTemplate(waypoint)}
    </section>
  </form>
</ol>`;
};


export default class Form extends Abstract {

  constructor(waypoint, destinations, waypointTypes, offers) {
    super();
    this._element = null;
    this._waypoint = waypoint;
    this._destinations = destinations;
    this._waypointTypes = waypointTypes;
    this._offers = offers;
    this._clickHandler = this._clickHandler.bind(this);
  }

  getTemplate() {
    return createEditFormTemplate(this._waypoint, this._destinations, this._waypointTypes, this._offers);
  }

  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.click();
  }

  setClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().querySelector(`form`).addEventListener(`click`, this._clickHandler);
  }
}

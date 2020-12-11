import {formatDateTime} from "../utils/date.js";
import {createElement} from "../utils/render.js";

const createOptionsTemplate = (destinations) => {
  return destinations
    .map((item) => {
      return `<option value="${item}"></option>`;
    }).join(``);
};

const createWaypointTypeTemplate = (types) => {
  return types
          .map((waypointType, index) => {
            return `<div class="event__type-item">
              <input id="event-type-${waypointType}-1-${index}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${waypointType}" ${waypointType === types ? `checked` : ``}>
              <label class="event__type-label  event__type-label--${waypointType}" for="event-type-${waypointType}-1">${waypointType}</label>
            </div>`;
          }).join(``);
};

const createOfferSelectorTemplate = (offers) => {
  return offers
          .map((offer, isChecked) => {
            return `<div class="event__offer-selector">
              <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.title}-1" type="checkbox" name="event-offer-${offer.title}" ${isChecked ? `checked` : ``}>
              <label class="event__offer-label" for="event-offer-${offer.title}-1">
                <span class="event__offer-title">Add ${offer.title}</span>
                &plus;&euro;&nbsp;
                <span class="event__offer-price">${offer.price}</span>
              </label>
            </div>`;
          }).join(``);
};


const getOffersByWaypointType = (offers, waypointType) => {
  for (let i = 0; i < offers.length; i++) {
    if (offers[i].type === waypointType) {
      return offers[i].offers;
    }
  }
  return [];
};


const createEditFormTemplate = (waypoint, destinations, waypointTypes, offers) => {
  const destinationsTemplate = createOptionsTemplate(destinations);
  const waypointTypeTemplate = createWaypointTypeTemplate(waypointTypes);
  const offerSelectorTemplate = createOfferSelectorTemplate(getOffersByWaypointType(offers, waypoint.type));

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
          ${destinationsTemplate}
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
        <input class="event__input  event__input--price" id="event-price-1" type="number" name="event-price" value="${waypoint.price}">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Cancel</button>
    </header>
    <section class="event__details">
      <section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>

        <div class="event__available-offers">
          ${offerSelectorTemplate}
        </div>
      </section>
    </section>
  </form>
</ol>`;
};


export default class Form {
  constructor(waypoint, destinations, waypointTypes, offers) {
    this._element = null;
    this._waypoint = waypoint;
    this._destinations = destinations;
    this._waypointTypes = waypointTypes;
    this._offers = offers;
  }

  getTemplate() {
    return createEditFormTemplate(this._waypoint, this._destinations, this._waypointTypes, this._offers);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

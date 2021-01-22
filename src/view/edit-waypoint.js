import {formatDateTime} from "../utils/event.js";
import AbstractView from "./abstract.js";
// import dayjs from 'dayjs';

// const EMPTY_EVENT = {
//   type: ``,
//   startTime: dayjs().startOf(`day`),
//   endTime: dayjs().endOf(`day`),
//   destination: ``,
//   price: 0,
//   offers: []
// };

// const DeleteButtonLabel = {
//   ADD: `Cancel`,
//   EDIT: `Delete`
// };

const createOptionsTemplate = (destinations) => {
  return destinations
    .map((item) => {
      return `<option value="${item.name}"></option>`;
    }).join(``);
};

const createWaypointTypeTemplate = (types, selectedType) => {
  return types
          .map((type, index) => {
            const upperCaseType = type.charAt(0).toUpperCase() + type.slice(1);
            return `<div class="event__type-item">
              <input id="event-type-${type}-1-${index}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${type === selectedType ? `checked` : ``}>
              <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${upperCaseType}</label>
            </div>`;
          }).join(``);
};

const createOfferSelectorTemplate = (allOffers, selectedOptions) => {

  const compareOffers = (item1, item2) => {
    return item1.price === item2.price && item1.title === item2.title;
  };

  const mergedOffers = [];

  const isOfferSelected = (offer) => {
    mergedOffers.find((item) => {
      return compareOffers(item, offer);
    });
  };

  const merge = (offers) => {
    offers.forEach((item1) => {
      const isDuplicate = mergedOffers.find((item2) => {
        return compareOffers(item1, item2);
      });
      if (!isDuplicate) {
        mergedOffers.push(item1);
      }
    });
  };

  merge(allOffers);
  merge(selectedOptions);

  const offersListTemplate = allOffers.map((offer) => {
    return `<div class="event__offer-selector">
              <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.title}-1" type="checkbox" name="event-offer-${offer.title}" ${isOfferSelected(offer) ? `checked` : ``}>
              <label class="event__offer-label" for="event-offer-${offer.title}-1">
                <span class="event__offer-title">Add ${offer.title}</span>
                &plus;&euro;&nbsp;
                <span class="event__offer-price">${offer.price}</span>
              </label>
            </div>`;
  }).join(``);

  return `<h3 class="event__section-title  event__section-title--offers">Offers</h3>
            <div class="event__available-offers">
              ${offersListTemplate};
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


const getOffersByWaypointType = (offers, type) => {
  const result = offers.find((item) => {
    return item.type === type;
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


export default class EditWaypoint extends AbstractView {

  constructor(waypoint, destinations, waypointTypes, offers) {
    super();
    this._waypoint = waypoint;
    this._destinations = destinations;
    this._waypointTypes = waypointTypes;
    this._offers = offers;

    this._onFormSubmitHandler = this._onFormSubmitHandler.bind(this);
    this._onRollupButtonClickHandler = this._onRollupButtonClickHandler.bind(this);
    this._onDeleteClickHandler = this._onDeleteClickHandler.bind(this);
  }

  getTemplate() {
    return createEditFormTemplate(this._waypoint, this._destinations, this._waypointTypes, this._offers);
  }

  _onRollupButtonClickHandler(event) {
    event.preventDefault();
    this._callback.submit(this._waypoint);
  }

  setRollupButtonClickHandler(callback) {
    this._callback.click = callback;

    this.getElement()
      .querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, this._onRollupButtonClickHandler);
  }

  setFormSubmitHandler(callback) {
    this._callback.submitForm = callback;
    this.getElement().querySelector(`form`).addEventListener(`submit`, this._onFormSubmitHandler);
  }

  _onFormSubmitHandler(event) {
    event.preventDefault();
    this._callback.submitForm();
  }

  setDeleteClickHandler(callback) {
    this._callback.deleteClick = callback;
    this.getElement()
  .querySelector(`.event__reset-btn`)
  .addEventListener(`click`, this._onDeleteClickHandler);
  }

  _onDeleteClickHandler(event) {
    event.preventDefault();
    this._callback.click();
  }
}

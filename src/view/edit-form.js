import {formatDateTime} from "../utils/date.js";
import {CITIES, TYPES, OFFER_TYPES} from '../mocks/const.js';

const createOptionsTemplate = (local) => {
  return local
    .map((item) => {
      return `<option value="${item}"></option>`;
    }).join(``);
};

const createEventTypeTemplate = (element) => {
  return element
          .map((item) => {
            return `<div class="event__type-item">
              <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">
              <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">${item}</label>
            </div>`;
          }).join(``);
};

const createOfferSelectorTemplate = (element) => {
  return element
          .map((item) => {
            return `<div class="event__offer-selector">
              <input class="event__offer-checkbox  visually-hidden" id="event-offer-${item}-1" type="checkbox" name="event-offer-${item}">
              <label class="event__offer-label" for="event-offer-${item}-1">
                <span class="event__offer-title">Add ${item}</span>
                &plus;&euro;&nbsp;
                <span class="event__offer-price">30</span>
              </label>
            </div>`;
          }).join(``);
};


export const createEditFormTemplate = (item) => {
  const optionsTemplate = createOptionsTemplate(CITIES);
  const eventTypeTemplate = createEventTypeTemplate(TYPES);
  const offerSelectorTemplate = createOfferSelectorTemplate(OFFER_TYPES);
  const {date: {startTime, endTime}, mainPrice, type, city} = item;

  return `<li class="trip-events__item">
  <form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${item.type.toLowerCase()}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>
            ${eventTypeTemplate}

          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
          ${type}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${city}" list="destination-list-1">
        <datalist id="destination-list-1">
          ${optionsTemplate}
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${formatDateTime(startTime).format(`YYYY/MM/DD HH:mm`)}">
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${formatDateTime(endTime).format(`YYYY/MM/DD HH:mm`)}">
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${mainPrice}">
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
</li>`;
};

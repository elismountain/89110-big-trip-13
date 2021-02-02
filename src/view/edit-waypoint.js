import SmartView from './smart.js';
import {formatDate} from '../utils/waypoint.js';
import dayjs from 'dayjs';
import he from 'he';
import flatpickr from 'flatpickr';
import '../../node_modules/flatpickr/dist/flatpickr.min.css';

export const EMPTY_WAYPOINT = {
  city: {
    name: ``,
    text: ``,
    photos: ``,
  },
  eventType: {
    type: `taxi`,
    image: `taxi`,
  },
  startTime: new Date(),
  endTime: new Date(),
  price: 0,
  isFavorite: false,
  offers: [
    {
      title: ``,
      price: ``,
    }
  ],
};

export const createWaypointEditTemplate = (state, destinations, offers) => {

  const {
    city,
    eventType,
    startTime,
    endTime,
    price,
    isDisabled,
    isSaving,
    isDeleting
  } = state;

  if (eventType && offers && !eventType.type) {
    eventType.type = offers[0].type;
  }

  const createOffers = () => {
    const names = Object.values(offers).map((item) => item);
    const type = names.find((offer) => offer.type === eventType.type);

    if (type) {
      const list = type.offers.slice().map((offer) => {
        let isChecked;

        if (eventType.offers) {
          isChecked = eventType.offers.some((item) => item.title === offer.title);
        }

        return `<div class="event__offer-selector">
            <input
              class="event__offer-checkbox visually-hidden"
              id="event-offer-${offer.title}"
              type="checkbox"
              name="event-offer-${offer.title}"
              data-name="${offer.title}"
              ${isChecked ? `checked` : ``}
              ${isDisabled ? `disabled` : ``}
            >
            <label class="event__offer-label" for="event-offer-${offer.title}">
              <span class="event__offer-title">${offer.title}</span>
              &plus;&euro;&nbsp;
              <span class="event__offer-price">${offer.price}</span>
            </label>
          </div>
        `;
      });
      return list.join(``);
    } else {
      return ``;
    }
  };

  const createOffersTemplate = () => {
    const names = Object.values(offers).map((item) => item);
    const type = names.find((offer) => offer.type === eventType.type);
    return `
    ${type && type.offers.length ? `<section class="event__section event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>
        <div class="event__available-offers">
          ${offersTemplate}
        </div>
      </section>
      ` : ``}`;
  };

  const createDestinationsTemplate = () => {
    return `
    ${city && city.text ? `<section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    <p class="event__destination-description">${he.encode(city.text)}</p>
    </section>
    ` : ``}`;
  };

  const createPhotosTemplate = () => {
    return `
    ${city && city.photos ? `
      <div class="event__photos-container">
        <div class="event__photos-tape">
        ${city.photos.map(({src}) => `
          <img class="event__photo" src="${src}" alt="Event photo">
        `).join(``)}
        </div>
      </div>
    ` : ``}`;
  };

  const createTypesMenuTemplate = (currentType) => {
    const types = Object.values(offers).map((item) => item);

    return `
      ${types.map(({type}) => `
        <div class="event__type-item">
          <input
            id="event-type-${type}"
            class="event__type-input visually-hidden"
            type="radio"
            name="event-type"
            value="${type}"
            ${isDisabled ? `disabled` : ``}
            ${currentType === type ? `checked` : ``}
          >
          <label
            class="event__type-label event__type-label--${type}"
            for="event-type-${type}"
          >
            ${type}
          </label>
        </div>
      `).join(``)}
    `;
  };

  const createDestinationList = () => {
    const names = Object.values(destinations).map((destination) => destination.name);
    const list = names.map((name) => {
      return `<option value="${name}"></option>`;
    });

    return list.join(``);
  };

  let offersTemplate;

  if (offers) {
    offersTemplate = createOffers();
  }

  const offersSection = createOffersTemplate();
  const destinationSection = createDestinationsTemplate();
  const photosSection = createPhotosTemplate();
  const eventTypeItems = createTypesMenuTemplate(state.eventType.type);
  const destinationList = createDestinationList();

  let deleteButtonLabel = `Delete`;

  if (!state.id) {
    deleteButtonLabel = `Cancel`;
  } else if (isDeleting) {
    deleteButtonLabel = `Deleting`;
  }

  return `<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${eventType.type.toLowerCase()}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Event type</legend>
              ${eventTypeItems}
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${eventType.type}
          </label>
          <input
            class="event__input event__input--destination"
            id="event-destination-1"
            type="text"
            name="event-destination"
            value="${city.name}"
            list="destination-list-1"
          >
          <datalist id="destination-list-1">
            ${destinationList}
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input
            class="event__input event__input--time"
            id="event-start-time-1"
            type="text"
            name="event-start-time"
            data-time="start"
            value="${formatDate(startTime)}"
          >
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input
            class="event__input event__input--time"
            id="event-end-time-1"
            type="text"
            name="event-end-time"
            data-time="end"
            value="${formatDate(endTime)}"
          >
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input
            class="event__input event__input--price"
            id="event-price-1"
            type="number"
            name="event-price"
            value="${price}"
          >
        </div>

        <button
          class="event__save-btn  btn  btn--blue"
          type="submit"
          ${isDisabled ? `disabled` : ``}
        >
          ${isSaving ? `Saving...` : `Save`}
        </button>
        <button
          class="event__reset-btn"
          type="reset"
          ${isDisabled ? `disabled` : ``}
        >
          ${deleteButtonLabel}
        </button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>

      <section class="event__details">
        ${offersSection}
        ${destinationSection}
        ${photosSection}
      </section>


    </form>
  </li>
  `;
};

export default class EditWaypoint extends SmartView {

  constructor(destinations, offers, waypoint = EMPTY_WAYPOINT) {
    super();
    this._state = waypoint;
    this._datepicker = null;

    this._destinations = Object.assign({}, destinations);
    this._offers = Object.assign({}, offers);

    this._onFormSubmitHandler = this._onFormSubmitHandler.bind(this);
    this._onResetButtonClickHandler = this._onResetButtonClickHandler.bind(this);
    this._onRollupButtonClickHandler = this._onRollupButtonClickHandler.bind(this);
    this._onDestinationInputHandler = this._onDestinationInputHandler.bind(this);
    this._onWaypointTypeChangeHandler = this._onWaypointTypeChangeHandler.bind(this);
    this._onPriceInputHandler = this._onPriceInputHandler.bind(this);
    this._onOfferToggleHandler = this._onOfferToggleHandler.bind(this);
    this._dateFromCloseHandler = this._dateFromCloseHandler.bind(this);
    this._dateToCloseHandler = this._dateToCloseHandler.bind(this);
    this._setInnerHandlers();
    this._setDatepicker();
  }

  _setDatepicker() {
    if (this._datepickerStart) {
      this._datepickerStart.destroy();
      this._datepickerStart = null;
    }

    if (this._datepickerEnd) {
      this._datepickerEnd.destroy();
      this._datepickerEnd = null;
    }

    this._datepickerStart = flatpickr(
        this.getElement().querySelector(`[data-time="start"]`),
        {
          minDate: `today`,
          dateFormat: `d/m/y H:i`,
          enableTime: true,
          defaultDate: this._state.startTime,
          onChange: this._dateFromCloseHandler,
        }
    );

    this._datepickerEnd = flatpickr(
        this.getElement().querySelector(`[data-time="end"]`),
        {
          minDate: this._data.startTime,
          dateFormat: `d/m/y H:i`,
          enableTime: true,
          defaultDate: this._state.endTime,
          onChange: this._dateToCloseHandler,
        }
    );
  }

  _dateFromCloseHandler([userDate]) {
    this.updateData({
      startTime: dayjs(userDate).toDate()
    });
  }

  _dateToCloseHandler([userDate]) {
    this.updateData({
      endTime: dayjs(userDate).toDate()
    });
  }

  removeElement() {
    super.removeElement();

    if (this._datepickerStart) {
      this._datepickerStart.destroy();
      this._datepickerStart = null;
    }

    if (this._datepickerEnd) {
      this._datepickerEnd.destroy();
      this._datepickerEnd = null;
    }
  }

  reset(waypoint) {
    this.updateData(
        EditWaypoint.parseEventToData(waypoint)
    );
  }

  getTemplate() {
    return createWaypointEditTemplate(this._state, this._destinations, this._offers);
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.setFormSubmitHandler(this._callback.submitForm);
    this.setResetButtonClickHandler(this._callback.resetButtonClick);
    this._setDatepicker();
    // this.setRollupButtonClickHandler(this._callback.clickRollupButton);
    // this._onRollupButtonClickHandler();
  }

  _onPriceInputHandler(evt) {
    evt.preventDefault();
    this.updateData({
      price: evt.target.value,
    }, true);
  }

  _onDestinationInputHandler(evt) {
    evt.preventDefault();
    const destinations = this._destinations;
    const cities = Object.keys(destinations).map(function (key) {
      return destinations[key];
    });
    const city = cities.find((element) => element.name === evt.target.value);

    const name = evt.target.value;
    let photos = [];
    let text = ``;

    const eventElement = document.querySelector(`.event--edit`);
    const destinationElement = eventElement.querySelector(`.event__destination-description`);
    const photosElement = eventElement.querySelector(`.event__photos-tape`);

    if (city) {
      photos = city.pictures;
      text = city.description;

      this.updateData({
        city: {
          name,
          text,
          photos,
        }
      });
    } else if (destinationElement) {
      destinationElement.textContent = `Description not found`;
      photosElement.textContent = ``;
    }
  }

  _onWaypointTypeChangeHandler(evt) {
    evt.preventDefault();
    const type = evt.target.value;

    this.updateData({
      eventType: {
        type,
        offers: [],
      },
    });
  }

  _onFormSubmitHandler(evt) {
    evt.preventDefault();

    const names = Object.values(this._offers).map((item) => item);
    const type = names.find((offer) => offer.type === this._state.eventType.type);
    let checkedOffers = [];

    const findCheckedElements = () => {
      this.getElement().querySelectorAll(`.event__offer-checkbox`)
        .forEach((item, i) => {
          if (item.checked) {
            checkedOffers.push(type.offers[i]);
          }
        });
    };

    if (type.offers) {
      findCheckedElements();
    }

    this.updateData({
      eventType: {
        type: this._state.eventType.type,
        offers: checkedOffers,
      },
    });
    this._callback.submitForm(this._state);
  }

  _onRollupButtonClickHandler() {
    this._callback.clickRollupButton();
  }

  setFormSubmitHandler(callback) {
    this._callback.submitForm = callback;
    this.getElement().querySelector(`form`).addEventListener(`submit`, this._onFormSubmitHandler);
  }

  setRollupButtonClickHandler(callback) {
    this._callback.clickRollupButton = callback;
    this.getElement().querySelector(`.event--edit .event__rollup-btn`).addEventListener(`click`, this._onRollupButtonClickHandler);
  }

  _onResetButtonClickHandler(evt) {
    evt.preventDefault();
    this._callback.resetButtonClick(EditWaypoint.parseDataToEvent(this._state));
  }

  setResetButtonClickHandler(callback) {
    this._callback.resetButtonClick = callback;
    this.getElement().querySelector(`.event__reset-btn`).addEventListener(`click`, this._onResetButtonClickHandler);
  }

  _setInnerHandlers() {
    const isOffers = document.querySelector(`.event__available-offers`);

    this.getElement()
      .querySelector(`.event__input--price`)
      .addEventListener(`input`, this._onPriceInputHandler);
    this.getElement()
      .querySelector(`.event__input--destination`)
      .addEventListener(`input`, this._onDestinationInputHandler);
    this.getElement()
      .querySelector(`[data-time="start"]`)
      .addEventListener(`input`, this._dateFromCloseHandler);
    this.getElement()
      .querySelector(`[data-time="end"]`)
      .addEventListener(`input`, this._dateToCloseHandler);
    this.getElement()
      .querySelector(`.event__type-group`)
      .addEventListener(`change`, this._onWaypointTypeChangeHandler);
    if (isOffers) {
      this.getElement()
        .querySelector(`.event__available-offers`)
        .addEventListener(`change`, this._onOfferToggleHandler);
    }
  }

  static parseEventToData(waypoint) {
    return Object.assign(
        {},
        waypoint,
        {
          isDisabled: false,
          isSaving: false,
          isDeleting: false
        }
    );
  }

  static parseDataToEvent(state) {
    state = Object.assign({}, state);

    delete state.isDisabled;
    delete state.isSaving;
    delete state.isDeleting;

    return state;
  }
}

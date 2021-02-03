import SmartView from './smart.js';
import {formatDate} from '../utils/waypoint.js';
import {waypointTypes} from '../utils/const.js';
import dayjs from 'dayjs';
import {nanoid} from 'nanoid';
import he from 'he';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const EMPTY_WAYPOINT = {
  type: waypointTypes.keys().next().value,
  startTime: dayjs().startOf(`day`).toDate(),
  endTime: dayjs().endOf(`day`).toDate(),
  destination: ``,
  price: 0,
  isFavorite: false,
  offers: []
};

const DeleteButtonLabel = {
  ADD: `Cancel`,
  EDIT: `Delete`
};

const createOffersTemplate = (waypoints, isDisabled) => {
  const offersObject = Array.from(waypoints)[0][1];
  const offers = Object.entries(offersObject);
  if (offers && (offers.length > 0)) {
    offers.pop();
  }
  return offers && (offers.length > 0) ? `<section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
    <div class="event__available-offers">
      ${Array.from(offers).map(([key, value]) => `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${key}-1" type="checkbox" data-offer-key="${key}" name="event-offer-${key}" ${value.selected ? `checked` : ``} ${isDisabled ? `disabled` : ``}>
        <label class="event__offer-label" for="event-offer-${key}-1">
          <span class="event__offer-title">${value.title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${value.price}</span>
        </label>
      </div>`).join(``)}
    </div>
  </section>` : ``;
};

const createDestinationsTemplate = (destination) => {
  return destination ? `<section class="event__section  event__section--destination">
  <h3 class="event__section-title  event__section-title--destination">Destination</h3>
  <p class="event__destination-description">${destination.description ? destination.description : ``}</p>
  ${destination.photos && (destination.photos.length > 0) ? `<div class="event__photos-container">
    <div class="event__photos-tape">
    ${destination.photos.map((photo) => `<img class="event__photo" src="${photo.src}" alt="${photo.description}">`).join(``)}
    </div>
  </div>` : ``}
</section>` : ``;
};

const createAvailableDestinationsTemplate = (availableDestinations) => {
  return availableDestinations.length > 0 ? `<datalist id="destination-list-1">
    ${availableDestinations.map((destination) => `
    <option value="${destination}"></option>
    `).join(``)}
  </datalist>` : ``;
};


const createTypesMenuTemplate = (types, waypointType) => {
  return `<div class="event__type-list">
    <fieldset class="event__type-group">
      <legend class="visually-hidden">Event type</legend>
      ${Array.from(types).map(([key, value]) => `<div class="event__type-item">
      <input id="event-type-${key}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${key}" ${key === waypointType ? `checked` : ``}>
      <label class="event__type-label  event__type-label--${key}" for="event-type-${key}-1">${value.title}</label>
    </div>`).join(``)}
    </fieldset>
  </div>`;
};

const createWaypointEditTemplate = (state) => {
  const {type, startTime, endTime, offers, destination, availableDestinations, price, deleteButtonLabel, isDisabled, isSaving, isDeleting} = state;


  const typesMenuTemplate = createTypesMenuTemplate(waypointTypes);

  const offersTemplate = createOffersTemplate(offers, isDisabled);

  const destinationInfoTemplate = createDestinationsTemplate(destination);

  const availableDestinationsTemplate = createAvailableDestinationsTemplate(availableDestinations);

  return `<ol class="trip-events__item">
  <form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="${waypointTypes.get(type).src}" alt="Event type icon">
        </label>
      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox" ${isDisabled ? `disabled` : ``}>
      ${typesMenuTemplate}
    </div>
    <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
          ${type}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination ? he.encode(destination.name) : ``}" list="destination-list-1" autocomplete="off" ${isDisabled ? `disabled` : ``}>
          ${availableDestinationsTemplate}
      </div>
      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${formatDate(startTime, `DD/MM/YY HH:mm`)}" ${isDisabled ? `disabled` : ``}>
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${formatDate(endTime, `DD/MM/YY HH:mm`)}" ${isDisabled ? `disabled` : ``}>
      </div>
      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}" pattern="\\d+" required autocomplete="off" ${isDisabled ? `disabled` : ``}>
      </div>
      <button class="event__save-btn  btn  btn--blue" type="submit" ${isDisabled ? `disabled` : ``}>${isSaving ? `Saving...` : `Save`}</button>
      <button class="event__reset-btn" type="reset" ${isDisabled ? `disabled` : ``}>${isDeleting ? `Deleting...` : deleteButtonLabel}</button>
      <button class="event__rollup-btn" type="button" ${isDisabled ? `disabled` : ``}>
      <span class="visually-hidden">Open event</span>
      </button>
    </header>
    <section class="event__details">
    <section class="event__details">
    ${offersTemplate}
    ${destinationInfoTemplate}
  </section>
  </form>
</ol>`;
};

export default class EditWaypoint extends SmartView {

  constructor(offers, destinations, waypoint = EMPTY_WAYPOINT) {
    super();
    this._offers = offers;
    this._destinations = destinations;
    this._state = EditWaypoint.parsePointToState(waypoint, this._offers, this._destinations);
    this._destinationOptions = this._buildDestinationOptions();
    this._dateFromPicker = null;
    this._dateToPicker = null;

    this._onRollupButtonClick = this._onRollupButtonClick.bind(this);
    this._onFormSubmit = this._onFormSubmit.bind(this);
    this._onWaypointTypeListChange = this._onWaypointTypeListChange.bind(this);
    this._onPriceInput = this._onPriceInput.bind(this);
    this._onAvailableOffersToggle = this._onAvailableOffersToggle.bind(this);
    this._onDestinationInput = this._onDestinationInput.bind(this);
    this._onResetButtonClick = this._onResetButtonClick.bind(this);
    this._onDateFromClose = this._onDateFromClose.bind(this);
    this._onDateToClose = this._onDateToClose.bind(this);


    this._setInnerHandlers();
    this._validateAll();
    this._setDateFromPicker();
    this._setDateToPicker();
  }

  getTemplate() {
    return createWaypointEditTemplate(this._state);
  }

  _setDateFromPicker() {
    if (this._dateFromPicker) {
      this._dateFromPicker.destroy();
      this._dateFromPicker = null;
    }

    this._dateFromPicker = flatpickr(
        this.getElement().querySelector(`input[name='event-start-time']`),
        {
          enableTime: true,
          [`time_24hr`]: true,
          dateFormat: `d/m/y H:i`,
          defaultDate: this._state.startTime,
          maxDate: dayjs(this._state.endTime).second(0).subtract(1, `m`).toDate(),
          onClose: this._onDateFromClose,
        }
    );
  }

  _setDateToPicker() {
    if (this._dateToPicker) {
      this._dateToPicker.destroy();
      this._dateToPicker = null;
    }

    this._dateToPicker = flatpickr(
        this.getElement().querySelector(`input[name='event-end-time']`),
        {
          enableTime: true,
          [`time_24hr`]: true,
          dateFormat: `d/m/y H:i`,
          defaultDate: this._state.startTime,
          minDate: dayjs(this._state.endTime).second(0).add(1, `m`).toDate(),
          onClose: this._onDateToClose,
        }
    );
  }

  reset(waypoint) {
    this.updateData(EditWaypoint.parsePointToState(waypoint, this._offers, this._destinations));
  }

  restoreHandlers() {
    this._destinationOptions = this._buildDestinationOptions();
    this._setInnerHandlers();
    this.setRollupButtonClickHandler(this._callback.clickRollupButton);
    this.setFormSubmitHandler(this._callback.submitForm);
    this.setResetButtonClickHandler(this._callback.resetButtonClick);
    this._setDateFromPicker();
    this._setDateToPicker();
    this._validateAll();
  }

  setRollupButtonClickHandler(callback) {
    this._callback.clickRollupButton = callback;

    this.getElement()
      .querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, this._onRollupButtonClick);
  }

  setFormSubmitHandler(callback) {
    this._callback.submitForm = callback;
    this.getElement().querySelector(`form`).addEventListener(`submit`, this._onFormSubmit);
  }

  setResetButtonClickHandler(callback) {
    this._callback.resetButtonClick = callback;
    this.getElement()
  .querySelector(`.event__reset-btn`)
  .addEventListener(`click`, this._onResetButtonClick);
  }

  _buildDestinationOptions() {
    const destinations = this.getElement().querySelector(`#destination-list-1`);
    const options = Array.from(destinations.options).map((option) => option.value);
    return new Set(options);
  }

  _validateDestination() {
    const destinationElement = this.getElement().querySelector(`.event__input--destination`);
    if (!this._destinationOptions.has(destinationElement.value)) {
      destinationElement.setCustomValidity(`You have to select a destination from the provided destinations list`);
      return false;
    }

    destinationElement.setCustomValidity(``);
    return true;
  }

  _validateAll() {
    this._validateDestination();
    const isValidElement = this.getElement().querySelector(`.event--edit`).checkValidity();
    const saveButtonElement = this.getElement().querySelector(`.event__save-btn`);

    saveButtonElement.disabled = !isValidElement;
    return isValidElement;
  }

  _setInnerHandlers() {
    this.getElement()
      .querySelector(`.event__type-list`)
      .addEventListener(`change`, this._onWaypointTypeListChange);
    const priceElement = this.getElement().querySelector(`.event__input--price`);
    priceElement.addEventListener(`input`, this._onPriceInput);

    const availableOffersElement = this.getElement().querySelector(`.event__available-offers`);
    if (availableOffersElement) {
      availableOffersElement.addEventListener(`change`, this._onAvailableOffersToggle);
    }

    const destinationElement = this.getElement().querySelector(`.event__input--destination`);
    destinationElement.addEventListener(`input`, this._onDestinationInput);
  }

  _onDateFromClose([userDate]) {
    this.updateData(
        {
          startTime: dayjs(userDate).second(0).toDate(),
        },
        true
    );
    this._setDateToPicker();
  }

  _onDateToClose([userDate]) {
    this.updateData(
        {
          endTime: dayjs(userDate).second(0).toDate(),
        },
        true
    );
    this._setDateFromPicker();
  }

  _onRollupButtonClick(evt) {
    evt.preventDefault();
    this._callback.clickRollupButton(EditWaypoint.parseStateToWaypoint(this._state));
  }

  _onFormSubmit(evt) {
    evt.preventDefault();
    this._callback.submitForm(EditWaypoint.parseStateToWaypoint(this._state));
  }

  _onResetButtonClick(evt) {
    evt.preventDefault();
    this._callback.resetButtonClick(EditWaypoint.parseStateToWaypoint(this._state));
  }

  _onDestinationInput(evt) {
    evt.preventDefault();
    this._validateAll();

    const destination = this._destinations.get(evt.target.value);

    if (!destination || evt.target.value === this._state.destination.name) {
      return;
    }

    this.updateData(
        {destination: Object.assign({}, destination, {name: evt.target.value})}
    );
  }

  _onAvailableOffersToggle(evt) {
    if (evt.target.tagName !== `INPUT`) {
      return;
    }
    evt.preventDefault();

    const offers = new Map(this._state.offers);
    const offer = offers.get(evt.target.dataset.offerKey);
    offer.selected = !offer.selected;
    this.updateData({
      offers
    });
  }

  _onWaypointTypeListChange(evt) {

    if (evt.target.tagName !== `INPUT`) {
      return;
    }
    evt.preventDefault();
    this.updateData({
      type: evt.target.value,
      offers: EditWaypoint._createOfferSelectionForType(
          [],
          this._offers.get(evt.target.value)
      )
    });
  }

  _onPriceInput(evt) {
    evt.preventDefault();
    this._validateAll();
    this.updateData({
      price: parseInt(evt.target.value, 10)
    }, true);
  }

  static parsePointToState(waypoint, offers, destinations) {
    const deleteButtonLabel = (waypoint === EMPTY_WAYPOINT) ? DeleteButtonLabel.ADD : DeleteButtonLabel.EDIT;

    const offersForType = offers.get(waypoint.type);

    const offerSelectionMap = EditWaypoint._createOfferSelectionForType(waypoint.offers, offersForType);

    const availableDestinations = [...destinations.get().keys()];

    return Object.assign(
        {},
        waypoint,
        {
          offers: offerSelectionMap,
          availableDestinations,
          deleteButtonLabel,
          isDisabled: false,
          isSaving: false,
          isDeleting: false
        }
    );
  }

  static parseStateToWaypoint(state) {
    const waypoint = Object.assign({}, state);

    const offers = [];

    state.offers.forEach((value) => {
      if (value.selected) {
        const {title, price} = value;
        offers.push({title, price});
      }
    });

    waypoint.offers = offers;

    delete waypoint.allDestinations;
    delete waypoint.deleteButtonLabel;
    delete waypoint.isDisabled;
    delete waypoint.isSaving;
    delete waypoint.isDeleting;

    return waypoint;
  }

  static _createOfferSelectionForType(selectedOffers, allOffersForTypes) {
    const offerSelectionMap = new Map();

    allOffersForTypes.forEach((value) => {
      const offer = selectedOffers.find((selectedOffer) => selectedOffer.title === value.title);

      let isSelected = false;

      if (offer) {
        isSelected = true;
      }

      offerSelectionMap.set(nanoid(), Object.assign({}, value, {selected: isSelected}));
    });

    return offerSelectionMap;
  }
}

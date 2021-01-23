import {formatDateTime} from "../utils/event.js";
import AbstractView from "./abstract.js";
import dayjs from 'dayjs';
import {nanoid} from 'nanoid';
import {waypointTypeInfoMap} from '../mocks/waypoint.js';

const EMPTY_WAYPOINT = {
  type: waypointTypeInfoMap.keys().next().value,
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


const createEditFormTemplate = (state) => {
  const {waypoint, type, destination, allDestinations, waypointTypes, offers, startTime, endTime, deleteButtonLabel, price} = state;
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
          <img class="event__type-icon" width="17" height="17" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
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
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination.name}" list="destination-list-1">
        <datalist id="destination-list-1">
          ${destinationsSelector}
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
        <input class="event__input  event__input--price" id="event-price-1" type="number" name="event-price" min="0" value="${price}">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">${deleteButtonLabel}</button>
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
    //
    this._state = EditWaypoint.parsePointToState(waypoint, this._offers, this._destinations);
    this._destinationOptions = this._buildDestinationOptions();
    this._onWaypointTypeChangeHandler = this._onWaypointTypeChangeHandler.bind(this);
    this._onPriceInputHandler = this._onPriceInputHandler.bind(this);

    this._onOfferToggleHandler = this._onOfferToggleHandler.bind(this);

    this._onDeleteClickHandler = this._onDeleteClickHandler.bind(this);
    this._onFormSubmitHandler = this._onFormSubmitHandler.bind(this);
    this._onRollupButtonClickHandler = this._onRollupButtonClickHandler.bind(this);

    this._onDestinationInputHandler = this._onDestinationInputHandler.bind(this);

    this._setInnerHandlers();
    this._validateAll();
  }

  getTemplate() {
    return createEditFormTemplate(this._waypoint, this._destinations, this._waypointTypes, this._offers);
  }

  restoreHandlers() {
    this._destinationOptions = this._buildDestinationOptions();
    this._setInnerHandlers();
    this.setRollupButtonClickHandler(this._callback.rollupButtonClick);
    this.setFormSubmitHandler(this._callback.submitForm);
    this.setDeleteClickHandler(this._callback.deleteClick);
    this._validateAll();
  }

  _setInnerHandlers() {
    this.getElement()
      .querySelector(`.event__type-list`)
      .addEventListener(`change`, this._onWaypointTypeChangeHandler);
    const priceElement = this.getElement().querySelector(`.event__input--price`);
    priceElement.addEventListener(`input`, this._onPriceInputHandler);

    const offersRendered = this.getElement().querySelector(`.event__available-offers`);
    if (offersRendered) {
      offersRendered.addEventListener(`change`, this._onOfferToggleHandler);
    }

    const destinationElement = this.getElement().querySelector(`.event__input--destination`);
    destinationElement.addEventListener(`input`, this._onDestinationInputHandler);
  }

  _onRollupButtonClickHandler(event) {
    event.preventDefault();
    this._callback.rollupButtonClick(this._waypoint);
  }


  setRollupButtonClickHandler(callback) {
    this._callback.rollupButtonClick = callback;

    this.getElement()
      .querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, this._onRollupButtonClickHandler);
  }

  _buildDestinationOptions() {
    const destinations = this.getElement().querySelector(`#destination-list-1`);
    const options = Array.from(destinations.options).map((option) => option.value);
    return new Set(options);
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
    const isValid = this.getElement().querySelector(`.event--edit`).checkValidity();
    const saveButton = this.getElement().querySelector(`.event__save-btn`);

    saveButton.disabled = !isValid;
    return isValid;
  }

  _onDeleteClickHandler(event) {
    event.preventDefault();
    this._callback.deleteClick(EditWaypoint.parseStateToPoint(this._state));
  }

  _onDestinationInputHandler(event) {
    event.preventDefault();

    this._validateAll();

    let destination = this._destinations.get(event.target.value);

    if (!destination || event.target.value === this._state.destination.name) {
      return;
    }

    this.updateData(
        {destination: Object.assign({}, destination, {name: event.target.value})}
    );
  }

  _offerToggleHandler(event) {
    if (event.target.tagName !== `INPUT`) {
      return;
    }
    event.preventDefault();

    const offers = new Map(this._state.offers);
    const offer = offers.get(event.target.dataset.offerKey);
    offer.selected = !offer.selected;
    this.updateData({
      offers
    });
  }


  _onWaypointTypeChangeHandler(event) {

    if (event.target.tagName !== `INPUT`) {
      return;
    }
    event.preventDefault();
    this.updateData({
      type: event.target.value,
      offers: EditWaypoint._createOfferSelectionForType(
          [],
          this._offers.get(event.target.value)
      )
    });
  }

  _onPriceInputHandler(event) {
    event.preventDefault();

    this._validateAll();

    this.updateData({
      price: parseInt(event.target.value, 10)
    }, true);
  }


  static parsePointToState(waypoint, offers, destinations) {
    const deleteButtonLabel = (waypoint === EMPTY_WAYPOINT) ? DeleteButtonLabel.ADD : DeleteButtonLabel.EDIT;

    const offersForType = offers.get(waypoint.type);

    const offerSelectionMap = EditWaypoint._createOfferSelectionForType(waypoint.offers, offersForType);

    const allDestinations = [...destinations.keys()];

    return Object.assign(
        {},
        waypoint,
        {
          offers: offerSelectionMap,
          allDestinations,
          deleteButtonLabel,
          isDisabled: false,
          isSaving: false,
          isDeleting: false
        }
    );
  }

  static parseStateToPoint(state) {
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

  static _createOfferSelectionForType(selectedOffers, allOffersForType) {
    const offerSelectionMap = new Map();

    allOffersForType.forEach((value) => {
      const findOffer = selectedOffers.find((selectedOffer) => selectedOffer.title === value.title);

      let isSelected = false;

      if (findOffer) {
        isSelected = true;
      }

      offerSelectionMap.set(nanoid(), Object.assign({}, value, {selected: isSelected}));
    });

    return offerSelectionMap;
  }
}

import TripWaypointView from './view/trip-waypoint.js';
import EditWaypointView from './view/edit-waypoint.js';
import {isEscapeKey} from './utils/dom-event.js';
import {render, replace, remove, RenderPosition} from './utils/render.js';

import {OFFERS, DESTINATIONS, WAYPOINT_TYPES} from './mocks/const.js';
// import {waypoints} from './mocks/waypoint.js';
const destinations = DESTINATIONS;
const waypointTypes = WAYPOINT_TYPES;
const offers = OFFERS;

const Mode = {
  DEFAULT: `DEFAULT`,
  EDITING: `EDITING`
};

export default class Waypoint {
  constructor(waypointListContainer, changeData, changeMode) {
    this._waypointListContainer = waypointListContainer;
    this._waypointComponent = null;
    this._waypointEditComponent = null;
    this._changeData = changeData;
    this._changeMode = changeMode;
    this._mode = Mode.DEFAULT;

    this._handleClickRollupButtonUp = this._handleClickRollupButtonUp.bind(this); //
    this._handleClickRollupButtonDown = this._handleClickRollupButtonDown.bind(this); //
    this._handleEscKeyDown = this._handleEscKeyDown.bind(this); //
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
  }

  init(waypoint) {
    this._waypoint = waypoint;

    const prevWaypointComponent = this._waypointComponent;
    const prevWaypointEditComponent = this._waypointEditComponent;

    this._waypointComponent = new TripWaypointView(waypoint);
    this._waypointEditComponent = new EditWaypointView(waypoint, destinations, waypointTypes, offers);

    this._waypointComponent.setRollupButtonClickHandler(this._handleClickRollupButtonDown);
    this._waypointComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._waypointEditComponent.setRollupButtonClickHandler(this._handleClickRollupButtonUp);
    this._waypointEditComponent.setFormSubmitHandler(this._handleFormSubmit);

    if ((prevWaypointComponent === null) || (prevWaypointEditComponent === null)) {
      render(this._waypointListContainer, this._waypointComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._mode === Mode.DEFAULT) {
      replace(this._waypointComponent, prevWaypointComponent);
    }

    if (this._mode === Mode.EDITING) {
      replace(this._waypointEditComponent, prevWaypointEditComponent);
    }

    remove(prevWaypointComponent);
    remove(prevWaypointEditComponent);
  }

  _handleClickRollupButtonUp() {
    this._switchToDisplay();
  }

  _handleClickRollupButtonDown() {
    this._switchToEdit();
  }

  _handleEscKeyDown(evt) {
    isEscapeKey(evt, () => this._switchToDisplay());
  }

  _handleFormSubmit(tripEvent) {
    this._changeData(tripEvent);
    this._switchToDisplay();
  }

  _handleFavoriteClick() {
    this._changeData(Object.assign({}, this._waypoint, {isFavorite: !this._waypoint.isFavorite}));
  }

  _switchToEdit() {
    replace(this._waypointEditComponent, this._waypointComponent);
    document.addEventListener(`keydown`, this._handleEscKeyDown);
    this._changeMode();
    this._mode = Mode.EDITING;
  }

  _switchToDisplay() {
    replace(this._waypointComponent, this._waypointEditComponent);
    document.removeEventListener(`keydown`, this._handleEscKeyDown);
    this._mode = Mode.DEFAULT;
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._switchToDisplay();
    }
  }

  destroy() {
    remove(this._waypointComponent);
    remove(this._waypointEditComponent);
  }
}

//
//     const tripEventsElement = document.querySelector(`.trip-events`);
//     render(tripEventsElement, new EditEventView(waypoints[0], destinations, waypointTypes, offers).getElement(), RenderPosition.BEFOREEND);
//
//     const renderWaypoint = (waypointListElement, waypoint) => {
//       const waypointComponent = new TripEventView(waypoint);
//       const waypointEditComponent = new EditEventView(waypoint, destinations, waypointTypes, offers);
//       const replaceCardToForm = () => {
//         replace(waypointEditComponent, waypointComponent);
//       };
//
//       const replaceFormToCard = () => {
//         replace(waypointComponent, waypointEditComponent);
//       };
//
//       const escKeyDownHandler = (evt) => {
//         if (isEscapeKey(evt)) {
//           evt.preventDefault();
//           replaceFormToCard();
//           document.removeEventListener(`keydown`, escKeyDownHandler);
//         }
//       };
//
//       waypointComponent.setRollupButtonClickHandler(() => {
//         replaceCardToForm();
//         document.addEventListener(`keydown`, escKeyDownHandler);
//       });
//
//       waypointEditComponent.setFormSubmitHandler(() => {
//         replaceFormToCard();
//         document.removeEventListener(`keydown`, escKeyDownHandler);
//       });
//
//       render(waypointListElement, waypointComponent.getElement());
//     };
//   }
// }

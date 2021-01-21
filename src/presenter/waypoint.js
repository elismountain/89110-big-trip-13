import TripWaypointView from '../view/trip-waypoint.js';
import EditWaypointView from '../view/edit-waypoint.js';
import {isEscapeKey} from '../utils/dom-event.js';
import {render, replace, remove, RenderPosition} from '../utils/render.js';

const Mode = {
  DEFAULT: `DEFAULT`,
  EDITING: `EDITING`
};

export default class Waypoint {
  constructor(waypointListElements, changeData, changeMode) {
    this._waypointListElements = waypointListElements;
    this._waypointComponent = null;
    this._waypointEditComponent = null;
    this._changeData = changeData;
    this._changeMode = changeMode;
    this._mode = Mode.DEFAULT;

    this._setRollupButtonClickHandlerUp = this._setRollupButtonClickHandlerUp.bind(this);
    this._setRollupButtonClickHandlerDown = this._setRollupButtonClickHandlerDown.bind(this);
    this._handleEscKeyDown = this._handleEscKeyDown.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
  }

  init(waypointTypeInfoMap, offerInfoMap) {
    const prevWaypointComponent = this._waypointComponent;
    const prevWaypointEditComponent = this._waypointEditComponent;

    this._waypointComponent = new TripWaypointView(offerInfoMap);
    this._waypointEditComponent = new EditWaypointView(waypointTypeInfoMap, offerInfoMap);

    this._waypointComponent.setRollupButtonClickHandler(this._setRollupButtonClickHandlerUp);
    this._waypointComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._waypointEditComponent.setRollupButtonClickHandler(this._setRollupButtonClickHandlerDown);
    this._waypointEditComponent.setFormSubmitHandler(this._handleFormSubmit);

    if ((prevWaypointComponent === null) || (prevWaypointEditComponent === null)) {
      render(this._waypointListElements, this._waypointComponent, RenderPosition.BEFOREEND);
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

  _setRollupButtonClickHandlerUp() {
    this._switchToDisplay();
  }

  _setRollupButtonClickHandlerDown() {
    this._switchToEdit();
  }

  _handleEscKeyDown(evt) {
    isEscapeKey(evt, () => this._switchToDisplay());
  }

  _handleFormSubmit(waypoint) {
    this._changeData(waypoint);
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

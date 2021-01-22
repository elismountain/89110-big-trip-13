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

    this._onRollupButtonClickHandlerUp = this._onRollupButtonClickHandlerUp.bind(this);
    this._onRollupButtonClickHandlerDown = this._onRollupButtonClickHandlerDown.bind(this);
    this._onKeyDown = this._onKeyDown.bind(this);
    this._onFormSubmitHandler = this._onFormSubmitHandler.bind(this);
    this._onFavoriteClickHandler = this._onFavoriteClickHandler.bind(this);
  }

  init(waypointTypeInfoMap, offerInfoMap) {
    const prevWaypointComponent = this._waypointComponent;
    const prevWaypointEditComponent = this._waypointEditComponent;

    this._waypointComponent = new TripWaypointView(offerInfoMap);
    this._waypointEditComponent = new EditWaypointView(waypointTypeInfoMap, offerInfoMap);

    this._waypointComponent.setRollupButtonClickHandler(this._onRollupButtonClickHandlerUp);
    this._waypointComponent.setFavoriteClickHandler(this._onFavoriteClickHandler);
    this._waypointEditComponent.setRollupButtonClickHandler(this._onRollupButtonClickHandlerDown);
    this._waypointEditComponent.setFormSubmitHandler(this._onFormSubmitHandler);

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

  _onRollupButtonClickHandlerUp() {
    this._switchToDisplay();
  }

  _onRollupButtonClickHandlerDown() {
    this._switchToEdit();
  }

  _onKeyDown(evt) {
    isEscapeKey(evt, () => this._switchToDisplay());
  }

  _onFormSubmitHandler(waypoint) {
    this._changeData(waypoint);
    this._switchToDisplay();
  }

  _onFavoriteClickHandler() {
    this._changeData(Object.assign({}, this._waypoint, {isFavorite: !this._waypoint.isFavorite}));
  }

  _switchToEdit() {
    replace(this._waypointEditComponent, this._waypointComponent);
    document.addEventListener(`keydown`, this._onKeyDown);
    this._changeMode();
    this._mode = Mode.EDITING;
  }

  _switchToDisplay() {
    replace(this._waypointComponent, this._waypointEditComponent);
    document.removeEventListener(`keydown`, this._onKeyDown);
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

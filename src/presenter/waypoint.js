import TripWaypointView from '../view/trip-waypoint.js';
import EditWaypointView from '../view/edit-waypoint.js';
import {isEscEvent, isOnline} from '../utils/common.js';
import {toast} from '../utils/toast/toast.js';
import {render, replace, remove, RenderPosition} from '../utils/render.js';
import {UserAction, UpdateType} from '../utils/const.js';

const Mode = {
  DEFAULT: `DEFAULT`,
  EDITING: `EDITING`
};

export const State = {
  SAVING: `SAVING`,
  DELETING: `DELETING`,
  ABORTING: `ABORTING`
};

export default class Waypoint {
  constructor(listOfWaypoints, changeData, changeMode, _destinationsModel, _offersModel) {
    this._listOfWaypoints = listOfWaypoints;
    this._waypointComponent = null;
    this._waypointEditComponent = null;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this.destinations = Object.assign({}, _destinationsModel.getDestinations());
    this.offers = Object.assign({}, _offersModel.getOffers());

    this._mode = Mode.DEFAULT;


    this._handleClickRollupButtonUp = this._handleClickRollupButtonUp.bind(this);
    this._handleClickRollupButtonDown = this._handleClickRollupButtonDown.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleWaypointEditResetButtonClick = this._handleWaypointEditResetButtonClick.bind(this);
  }

  init(waypoint, destinations, offers) {
    this._waypoint = waypoint;
    this._offers = offers;
    this._destinations = destinations;

    const prevWaypointComponent = this._waypointComponent;
    const prevWaypointEditComponent = this._waypointEditComponent;

    this._waypointComponent = new TripWaypointView(waypoint);
    this._waypointEditComponent = new EditWaypointView(this.destinations, this.offers, waypoint);

    this._waypointComponent.setRollupButtonClickHandler(this._handleClickRollupButtonUp);
    this._waypointComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._waypointEditComponent.setRollupButtonClickHandler(this._handleClickRollupButtonDown);
    this._waypointEditComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._waypointEditComponent.setResetButtonClickHandler(this._handleWaypointEditResetButtonClick);

    if ((prevWaypointComponent === null) || (prevWaypointEditComponent === null)) {
      render(this._listOfWaypoints, this._waypointComponent, RenderPosition.BEFOREEND);
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


  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._switchToDisplay();
    }
  }

  setViewState(state) {
    const resetFormState = () => {
      this._waypointEditComponent.updateData({
        isDisabled: false,
        isSaving: false,
        isDeleting: false
      });
    };

    switch (state) {
      case State.SAVING:
        this._waypointEditComponent.updateData({
          isDisabled: true,
          isSaving: true
        });
        break;
      case State.DELETING:
        this._waypointEditComponent.updateData({
          isDisabled: true,
          isDeleting: true
        });
        break;
      case State.ABORTING:
        this._waypointComponent.shake(resetFormState);
        this._waypointEditComponent.shake(resetFormState);
        break;
    }
  }

  destroy() {
    remove(this._waypointComponent);
    remove(this._waypointEditComponent);
  }

  _switchToEdit() {
    replace(this._waypointEditComponent, this._waypointComponent);
    document.addEventListener(`keydown`, this._escKeyDownHandler);
    this._changeMode();
    this._mode = Mode.EDITING;
  }

  _switchToDisplay() {
    replace(this._waypointComponent, this._waypointEditComponent);
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
    this._mode = Mode.DEFAULT;
  }

  _handleClickRollupButtonUp() {
    this._switchToDisplay();
  }

  _handleClickRollupButtonDown() {
    if (!isOnline()) {
      toast(`You can't edit while offline`);
      return;
    }
    this._switchToEdit();
  }

  _escKeyDownHandler(evt) {
    isEscEvent(evt, () => {
      this._switchToDisplay();
    });
  }

  _handleFormSubmit(waypoint) {
    if (!isOnline()) {
      toast(`You can't save while offline`);
      return;
    }

    this._changeData(
        UserAction.UPDATE_POINT,
        UpdateType.MINOR,
        waypoint
    );
  }

  _handleFavoriteClick() {
    this._changeData(
        UserAction.UPDATE_POINT,
        UpdateType.MINOR,
        Object.assign({}, this._waypoint, {isFavorite: !this._waypoint.isFavorite}));
  }

  _handleWaypointEditResetButtonClick(waypoint) {
    if (!isOnline()) {
      toast(`You can't delete while offline`);
      return;
    }

    this._changeData(
        UserAction.DELETE_POINT,
        UpdateType.MINOR,
        waypoint
    );
  }
}

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
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
  }

  init(waypoint, offersModel, destinationsModel) {
    this._waypoint = waypoint;
    this._offersModel = offersModel;
    this._destinationsModel = destinationsModel;

    const prevWaypointComponent = this._waypointComponent;
    const prevWaypointEditComponent = this._waypointEditComponent;

    this._waypointComponent = new TripWaypointView(waypoint);
    this._waypointEditComponent = new EditWaypointView(this._offersModel.getOffers(), this._destinationsModel.getDestinations(), waypoint);

    this._waypointComponent.setRollupButtonClickHandler(this._onRollupButtonClickHandlerUp);
    this._waypointComponent.setFavoriteClickHandler(this._onFavoriteClickHandler);
    this._waypointEditComponent.setRollupButtonClickHandler(this._onRollupButtonClickHandlerDown);
    this._waypointEditComponent.setFormSubmitHandler(this._onFormSubmitHandler);
    this._waypointEditComponent.setDeleteClickHandler(this._onDeleteClickHandler);

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
    document.addEventListener(`keydown`, this._onKeyDown);
    this._changeMode();
    this._mode = Mode.EDITING;
  }

  _switchToDisplay() {
    replace(this._waypointComponent, this._waypointEditComponent);
    document.removeEventListener(`keydown`, this._onKeyDown);
    this._mode = Mode.DEFAULT;
  }

  _onRollupButtonClickHandlerUp() {
    this._switchToDisplay();
  }

  _onRollupButtonClickHandlerDown() {
    if (!isOnline()) {
      toast(`You can't edit while offline`);
      return;
    }
    this._switchToEdit();
  }

  _onKeyDown(evt) {
    isEscEvent(evt, () => {
      this._switchToDisplay();
    });
  }

  _onFormSubmitHandler(waypoint) {
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

  _onFavoriteClickHandler() {
    this._changeData(
        UserAction.UPDATE_POINT,
        UpdateType.MINOR,
        Object.assign({}, this._waypoint, {isFavorite: !this._waypoint.isFavorite}));
  }

  _handleDeleteClick(waypoint) {
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

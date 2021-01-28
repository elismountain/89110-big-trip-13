import EditWaypointView from '../view/edit-waypoint.js';
import {render, RenderPosition, remove} from '../utils/render.js';
import {UpdateType, UserAction} from '../utils/const.js';
import {isOnline} from '../utils/common.js';
import {toast} from '../utils/toast/toast.js';
import {isEscEvent} from '../utils/common.js';

export default class WaypointNew {
  constructor(waypointListElements, changeData) {
    this._waypointListElements = waypointListElements;
    this._changeData = changeData;

    this._waypointEditComponent = null;
    this._destroyCallback = null;

    this._onFormSubmitHandler = this._onFormSubmitHandler.bind(this);
    this._onRollupButtonClickHandler = this._onRollupButtonClickHandler.bind(this);
    this._onDeleteClickHandler = this._onDeleteClickHandler.bind(this);
    this._onKeyDown = this._onKeyDown.bind(this);
  }

  init(offersModel, destinationsModel, callback) {
    this._destroyCallback = callback;

    if (this._waypointEditComponent !== null) {
      return;
    }

    this._waypointEditComponent = new EditWaypointView(offersModel.getOffers(), destinationsModel.getDestinations());
    this._eventEditComponent.setFormSubmitHandler(this._onFormSubmitHandler);
    this._eventEditComponent.setDeleteClickHandler(this._onDeleteClickHandler);
    this._eventEditComponent.setRollupButtonClickHandler(this._onRollupButtonClickHandler);

    render(this._pointListContainer, this._pointEditComponent, RenderPosition.AFTERBEGIN);

    document.addEventListener(`keydown`, this._onKeyDown);
  }

  destroy() {
    if (this._waypointEditComponent === null) {
      return;
    }

    if (this._destroyCallback !== null) {
      this._destroyCallback();
    }

    remove(this._waypointEditComponent);
    this._waypointEditComponent = null;

    document.removeEventListener(`keydown`, this._onKeyDown);
  }

  setSaving() {
    this._waypointEditComponent.updateData({
      isDisabled: true,
      isSaving: true
    });
  }

  setAborting() {
    const resetFormState = () => {
      this._waypointEditComponent.updateData({
        isDisabled: false,
        isSaving: false,
        isDeleting: false
      });
    };

    this._waypointEditComponent.shake(resetFormState);
  }

  _onFormSubmitHandler(waypoint) {
    if (!isOnline()) {
      toast(`You can't save while offline`);
      return;
    }

    this._changeData(
        UserAction.ADD_EVENT,
        UpdateType.MINOR,
        waypoint
    );
  }


  _onDeleteClickHandler() {
    this.destroy();
  }

  _onKeyDown(event) {
    isEscEvent(event, () => {
      this.destroy();
    });
  }

  _onRollupButtonClickHandler() {
    this.destroy();
  }
}

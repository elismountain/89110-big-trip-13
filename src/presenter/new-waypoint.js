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

    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleClickRollupButtonUp = this._handleClickRollupButtonUp.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
    this._handleEscKeyDown = this._handleEscKeyDown.bind(this); _handleEscKeyDown
  }

  init(offersModel, destinationsModel, callback) {
    this._destroyCallback = callback;

    if (this._waypointEditComponent !== null) {
      return;
    }

    this._waypointEditComponent = new EditWaypointView(offersModel.getOffers(), destinationsModel.getDestinations());
    this._eventEditComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._eventEditComponent.setDeleteClickHandler(this._handleDeleteClick);
    this._eventEditComponent.setRollupButtonClickHandler(this._handleClickRollupButtonUp);

    render(this._pointListContainer, this._pointEditComponent, RenderPosition.AFTERBEGIN);

    document.addEventListener(`keydown`, this._handleEscKeyDown);
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

    document.removeEventListener(`keydown`, this._handleEscKeyDown);
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

  _handleFormSubmit(waypoint) {
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


  _handleDeleteClick() {
    this.destroy();
  }

  _handleEscKeyDown(event) {
    isEscEvent(event, () => {
      this.destroy();
    });
  }

  _handleClickRollupButtonUp() {
    this.destroy();
  }
}

import EditWaypointView from '../view/edit-waypoint.js';
import {render, RenderPosition, remove} from '../utils/render.js';
import {UpdateType, UserAction} from '../utils/const.js';
import {isOnline} from '../utils/common.js';
import {toast} from '../utils/toast/toast.js';
import {isEscEvent} from '../utils/common.js';

export default class WaypointNew {
  constructor(cardsListElement, changeData) {
    this._cardsListElement = cardsListElement;
    this._changeData = changeData;

    this._cardEditElement = null;
    this._destroyCallback = null;
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._handleClickRollupButtonUp = this._handleClickRollupButtonUp.bind(this);
  }

  init(offersModel, destinationsModel, callback) {
    this._destroyCallback = callback;

    if (this._cardEditElement !== null) {
      return;
    }

    this._cardEditElement = new EditWaypointView(offersModel.getOffers(), destinationsModel.getDestinations());
    this._cardEditElement.setFormSubmitHandler(this._handleFormSubmit);
    this._cardEditElement.setResetButtonClickHandler(this._handleDeleteClick);
    this._cardEditElement.setRollupButtonClickHandler(this._handleClickRollupButtonUp);

    render(this._cardsListElement, this._cardEditElement, RenderPosition.AFTERBEGIN);

    document.addEventListener(`keydown`, this._escKeyDownHandler);

  }

  destroy() {
    if (this._cardEditElement === null) {
      return;
    }

    if (this._destroyCallback !== null) {
      this._destroyCallback();
    }

    remove(this._cardEditElement);
    this._cardEditElement = null;

    document.removeEventListener(`keydown`, this._escKeyDownHandler);
  }

  setSaving() {
    this._cardEditElement.updateData({
      isDisabled: true,
      isSaving: true
    });
  }

  setAborting() {
    const resetFormState = () => {
      this._cardEditElement.updateData({
        isDisabled: false,
        isSaving: false,
        isDeleting: false
      });
    };

    this._cardEditElement.shake(resetFormState);
  }

  _handleFormSubmit(waypoint) {
    if (!isOnline()) {
      toast(`You can't save while offline`);
      return;
    }

    this._changeData(
        UserAction.ADD_WAYPOINT,
        UpdateType.MINOR,
        waypoint
    );
  }

  _handleDeleteClick() {
    this.destroy();
  }

  _escKeyDownHandler(evt) {
    isEscEvent(evt, () => {
      this.destroy();
    });
  }

  _handleClickRollupButtonUp() {
    this.destroy();
  }
}

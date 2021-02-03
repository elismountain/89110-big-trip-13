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

    this._cardEdit = null;
    this._destroyCallback = null;
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._handleClickRollupButtonUp = this._handleClickRollupButtonUp.bind(this);
  }

  init(offersModel, destinationsModel, callback) {
    this._destroyCallback = callback;

    if (this._cardEdit !== null) {
      return;
    }

    this._cardEdit = new EditWaypointView(offersModel, destinationsModel);
    this._cardEdit.setFormSubmitHandler(this._handleFormSubmit);
    this._cardEdit.setResetButtonClickHandler(this._handleDeleteClick);
    this._cardEdit.setRollupButtonClickHandler(this._handleClickRollupButtonUp);

    render(this._cardsListElement, this._cardEdit, RenderPosition.AFTERBEGIN);

    document.addEventListener(`keydown`, this._onEscKeyDown);

  }

  destroy() {
    if (this._cardEdit === null) {
      return;
    }

    if (this._destroyCallback !== null) {
      this._destroyCallback();
    }

    remove(this._cardEdit);
    this._cardEdit = null;

    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  setSaving() {
    this._cardEdit.updateData({
      isDisabled: true,
      isSaving: true
    });
  }

  setAborting() {
    const resetFormState = () => {
      this._cardEdit.updateData({
        isDisabled: false,
        isSaving: false,
        isDeleting: false
      });
    };

    this._cardEdit.shake(resetFormState);
  }

  _handleFormSubmit(waypoint) {
    if (!isOnline()) {
      toast(`You can't save while offline`);
      return;
    }

    this._changeData(
        UserAction.ADD_POINT,
        UpdateType.MINOR,
        waypoint
    );
  }

  _handleDeleteClick() {
    this.destroy();
  }

  _onEscKeyDown(evt) {
    isEscEvent(evt, () => {
      this.destroy();
    });
  }

  _handleClickRollupButtonUp() {
    this.destroy();
  }
}

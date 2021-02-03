import TripWaypointView from '../view/trip-waypoint.js';
import EditWaypointView from '../view/edit-waypoint.js';
import {isEscEvent, isOnline} from '../utils/common.js';
import {toast} from '../utils/toast/toast.js';
import {render, replace, remove, RenderPosition} from '../utils/render.js';
import {UserAction, UpdateType, State} from '../utils/const.js';

const Mode = {
  DEFAULT: `DEFAULT`,
  EDITING: `EDITING`
};


export default class Waypoint {
  constructor(cardsListElement, changeData, changeMode) {
    this._cardsListElement = cardsListElement;
    this._card = null;
    this._cardEdit = null;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._mode = Mode.DEFAULT;

    this._handleClickRollupButtonUp = this._handleClickRollupButtonUp.bind(this);
    this._handleClickRollupButtonDown = this._handleClickRollupButtonDown.bind(this);
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleWaypointEditResetButtonClick = this._handleWaypointEditResetButtonClick.bind(this);
  }

  init(waypoint, destinations, offers) {
    this._waypoint = waypoint;
    this._offers = offers;
    this._destinations = destinations;

    const prevWaypointComponent = this._card;
    const prevWaypointEditComponent = this._cardEdit;

    this._card = new TripWaypointView(waypoint);
    this._cardEdit = new EditWaypointView(this._destinations, this._offers, waypoint);

    this._card.setRollupButtonClickHandler(this._handleClickRollupButtonUp);
    this._card.setFavoriteClickHandler(this._handleFavoriteClick);
    this._cardEdit.setRollupButtonClickHandler(this._handleClickRollupButtonDown);
    this._cardEdit.setFormSubmitHandler(this._handleFormSubmit);
    this._cardEdit.setResetButtonClickHandler(this._handleWaypointEditResetButtonClick);

    if ((prevWaypointComponent === null) || (prevWaypointEditComponent === null)) {
      render(this._cardsListElement, this._card, RenderPosition.BEFOREEND);
      return;
    }

    if (this._mode === Mode.DEFAULT) {
      replace(this._card, prevWaypointComponent);
    }

    if (this._mode === Mode.EDITING) {
      replace(this._card, prevWaypointEditComponent);
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
      this._cardEdit.updateData({
        isDisabled: false,
        isSaving: false,
        isDeleting: false
      });
    };

    switch (state) {
      case State.SAVING:
        this._cardEdit.updateData({
          isDisabled: true,
          isSaving: true
        });
        break;
      case State.DELETING:
        this._cardEdit.updateData({
          isDisabled: true,
          isDeleting: true
        });
        break;
      case State.ABORTING:
        this._card.shake(resetFormState);
        this._cardEdit.shake(resetFormState);
        break;
    }
  }

  destroy() {
    remove(this._card);
    remove(this._cardEdit);
  }

  _switchToEdit() {
    replace(this._cardEdit, this._card);
    document.addEventListener(`keydown`, this._onEscKeyDown);
    this._changeMode();
    this._mode = Mode.EDITING;
  }

  _switchToDisplay() {
    this._cardEdit.reset(this._waypoint);
    replace(this._card, this._cardEdit);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    this._mode = Mode.DEFAULT;
  }

  _handleClickRollupButtonUp() {
    this._switchToEdit();
  }

  _handleClickRollupButtonDown() {
    if (!isOnline()) {
      toast(`You can't edit while offline`);
      return;
    }
    this._switchToDisplay();
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

  _onEscKeyDown(evt) {
    isEscEvent(evt, () => {
      this._switchToDisplay();
    });
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

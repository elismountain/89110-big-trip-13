import EditWaypointView from '../view/edit-waypoint.js';
import {render, RenderPosition, remove} from '../utils/render.js';
import {UpdateType, UserAction} from '../utils/const.js';
import {isEscapeKey} from '../utils/dom-event.js';
import {nanoid} from 'nanoid';

export default class WaypointNew {
  constructor(waypointListElements, changeData) {
    this._waypointListElements = waypointListElements;
    this._changeData = changeData;

    this._waypointEditComponent = null;

    this._onFormSubmitHandler = this._onFormSubmitHandler.bind(this);
    this._onRollupButtonClickHandler = this._onRollupButtonClickHandler.bind(this);
    this._onDeleteClickHandler = this._onDeleteClickHandler.bind(this);

    //  Дописать binds
  }

  init(dataListModel) {
    if (this._waypointEditComponent !== null) {
      return;
    }

    this._dataListModel = dataListModel;

    this._waypointEditComponent = new EditWaypointView();
    this._eventEditComponent.setFormSubmitHandler(this._onFormSubmitHandler);
    this._eventEditComponent.setDeleteClickHandler(this._onDeleteClickHandler);
    this._eventEditComponent.setRollupButtonClickHandler(this._onRollupButtonClickHandler);

    // дописть binds

    render(this._pointListContainer, this._pointEditComponent, RenderPosition.AFTERBEGIN);

    document.addEventListener(`keydown`, this._handleEscKeyDown);
  }

  destroy() {
    if (this._waypointEditComponent === null) {
      return;
    }

    remove(this._waypointEditComponent);
    this._waypointEditComponent = null;

    document.removeEventListener(`keydown`, this._handleKeydown);
  }

  _onFormSubmitHandler(waypoint) {
    this._changeData(
        UserAction.ADD_EVENT,
        UpdateType.MINOR,
        Object.assign({id: nanoid()}, waypoint)
    );
    this.destroy();
  }

  _onDeleteClickHandler() {
    this.destroy();
  }

  _handleKeydown(event) {
    isEscapeKey(event, () => {
      this.destroy();
    });
  }

  _onRollupButtonClickHandler() {
    this.destroy();
  }
}

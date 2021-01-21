import EventEditView from '../view/edit-waypoint.js';
import {render, RenderPosition, remove} from '../utils/render.js';
import {UpdateType} from '../utils/const.js';
import {isEscapeKey} from '../utils/dom-event.js';
import {nanoid} from 'nanoid';

export default class WaypointNew {
  constructor(waypointListElements, changeData) {
    this._waypointListElements = waypointListElements;
    this._changeData = changeData;

    this._waypointEditComponent = null;

    //  Дописать binds
  }

  init(dataListModel) {
    if (this._pointEditComponent !== null) {
      return;
    }

    this._waypointEditComponent = new EventEditView();

    // дописть binds

    render(this._pointListContainer, this._pointEditComponent, RenderPosition.AFTERBEGIN);

    document.addEventListener(`keydown`, this._onEscKeyDown);
  }

  destroy() {
    if (this._waypointEditComponent === null) {
      return;
    }

    remove(this._waypointEditComponent);
    this._waypointEditComponent = null;

    document.removeEventListener(`keydown`, this._handleEscKeyDown);
  }

  _handleFormSubmit() {
  }
}

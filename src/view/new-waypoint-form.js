import {createElement} from "../utils/render.js";

export const createNewWaypointTemplate = () => {
  return (
    `<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>`
  );
};


export default class WaypointButton {
  constructor(task) {
    this._element = null;
    this._task = task;
  }

  getTemplate() {
    return createNewWaypointTemplate(this._task);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

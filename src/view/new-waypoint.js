import {createElement} from "../utils/render.js";

const createNewWaypointTemplate = () => {
  return (
    `<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>`
  );
};


export default class NewWaypoint {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createNewWaypointTemplate();
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

import {createElement} from "../utils/render.js";

const createTripCostTemplate = () => {
  return (
    `<p class="trip-info__cost">
      Total: &euro;&nbsp; <span class="trip-info__cost-value">1230</span>
    </p>`
  );
};

export default class Cost {
  constructor(point) {
    this._element = null;
    this._point = point;
  }

  getTemplate() {
    return createTripCostTemplate(this._point);
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

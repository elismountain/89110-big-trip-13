import {
  formatDateTime
} from "../utils/date.js";

import {
  createElement
} from "../utils/render.js";

const createTripInfoTemplate = (startTime, endTime) => {
  return (
    `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">Amsterdam &mdash; Chamonix &mdash; Geneva</h1>

        <p class="trip-info__dates">${formatDateTime(startTime).format(`MMM D`)}&nbsp;&mdash;&nbsp;${formatDateTime(endTime).format(`D`)}</p>
      </div>
    </section>`
  );
};


export default class TripInfo {
  constructor(point) {
    this._element = null;
    this._task = point;
  }

  getTemplate() {
    return createTripInfoTemplate(this._task);
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

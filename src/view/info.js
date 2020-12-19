import {
  formatDateTime
} from "../utils/date.js";

import Abstract from "./abstract.js";

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


export default class Info extends Abstract {
  constructor(startTime, endTime) {
    super();
    this._start = startTime;
    this._end = endTime;
  }

  getTemplate() {
    return createTripInfoTemplate(this._start, this._end);
  }
}

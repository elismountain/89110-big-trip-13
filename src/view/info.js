import {formatDateTime} from '../utils/event.js';
import AbstractView from "./abstract.js";

const createTripInfoTemplate = ({startTime, endTime, destination}) => {
  if (destination.length > 3) {
    destination.splice(1, destination.length - 2, `...`);
  }

  const tripInfoTitle = destination.join(` &mdash; `);

  return (
    `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${tripInfoTitle}</h1>

        <p class="trip-info__dates">${formatDateTime(startTime).format(`MMM D`)}&nbsp;&mdash;&nbsp;${formatDateTime(endTime).format(`D`)}</p>
      </div>
    </section>`
  );
};


export default class Info extends AbstractView {
  constructor(tripInfo) {
    super();
    this._tripInfo = tripInfo;
  }

  getTemplate() {
    return createTripInfoTemplate(this._tripInfo);
  }
}

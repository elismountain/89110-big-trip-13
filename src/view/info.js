import {formatDate} from '../utils/waypoint.js';
import AbstractView from "./abstract.js";

const INFO_DESTINATIONS = 3;

const createTripInfoTemplate = (data, isLoading) => {

  let tripInfoTitle = ``;

  if (isLoading) {
    tripInfoTitle = `Loading trip summary...`;
  }

  if (data === null && !isLoading) {
    tripInfoTitle = `Trip doesn't contain any points`;
  }

  if (isLoading || data === null) {
    return `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${tripInfoTitle}</h1>
      </div>
    </section>`;
  }

  const {startTime, endTime, destinations} = data;


  if (destinations.length > INFO_DESTINATIONS) {
    destinations.splice(1, destinations.length - 2, `...`);
  }

  tripInfoTitle = destinations.join(` &mdash; `);

  return (
    `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${tripInfoTitle}</h1>

        <p class="trip-info__dates">${formatDate(startTime, `MMM DD`)}&nbsp;&mdash;&nbsp;${formatDate(endTime, `DD`)}</p>
      </div>
    </section>`
  );
};

export default class Info extends AbstractView {
  constructor(data, isLoading) {
    super();
    this._isLoading = isLoading;
    this._data = data;
  }

  getTemplate() {
    return createTripInfoTemplate(this._data, this._isLoading);
  }
}

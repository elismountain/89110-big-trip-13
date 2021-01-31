import {formatDate} from '../utils/waypoint.js';
import AbstractView from "./abstract.js";

const createTripInfoTemplate = (tripInfo, isLoading) => {
  let tripInfoTitle = ``;

  if (isLoading) {
    tripInfoTitle = `Loading trip summary...`;
  }

  if (tripInfo === null && !isLoading) {
    tripInfoTitle = `Trip doesn't contain any points`;
  }

  if (isLoading || tripInfo === null) {
    return `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${tripInfoTitle}</h1>
      </div>
    </section>`;
  }

  const {startTime, endTime, destinations} = tripInfo;


  if (destinations.length > 3) {
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
  constructor(tripInfo, isLoading) {
    super();
    this._isLoading = isLoading;
    this._tripInfo = tripInfo;
  }

  getTemplate() {
    return createTripInfoTemplate(this._tripInfo, this._isLoading);
  }
}

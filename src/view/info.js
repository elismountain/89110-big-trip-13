import {formatDate} from '../utils/waypoint.js';
import AbstractView from "./abstract.js";

export const INFO_DESTINATIONS = 3;

const createTripInfoTemplate = (info, isLoading) => {

  let tripInfoTitle = ``;

  if (isLoading) {
    tripInfoTitle = `Loading trip summary...`;
  }

  if (info === null && !isLoading) {
    tripInfoTitle = `Trip doesn't contain any points`;
  }

  if (isLoading || info === null) {
    return `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${tripInfoTitle}</h1>
      </div>
    </section>`;
  }

  const {startTime, endTime, destinations} = info;


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
  constructor(info, isLoading) {
    super();
    this._isLoading = isLoading;
    this._info = info;
  }

  getTemplate() {
    return createTripInfoTemplate(this._info, this._isLoading);
  }
}

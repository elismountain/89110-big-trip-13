import {formatDate} from '../utils/waypoint.js';
import AbstractView from "./abstract.js";

const MAX_ITEMS_TO_SHOW = 3;

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

  const titleDestinations = destinations.length > MAX_ITEMS_TO_SHOW ?
    [destinations[0], `...`, destinations[destinations.length - 1]] : [...destinations];

  tripInfoTitle = titleDestinations.join(` &mdash; `);

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
    this._tripInfo = tripInfo;
    this._isLoading = isLoading;
  }

  getTemplate() {
    return createTripInfoTemplate(this._tripInfo, this._isLoading);
  }
}

import dayjs from "dayjs";
import AbstractView from "./abstract.js";
import {sortByDate} from '../utils/common.js';

export const INFO_DESTINATIONS = 3;

const createTripInfoTemplate = (waypoints) => {
  let sortedDate = [];
  let dates = ``;
  let totalPrice = Number(0);
  let titleText = ``;

  if (waypoints.length >= INFO_DESTINATIONS) {
    sortedDate.push(waypoints.sort(sortByDate));

    const waypointFirst = sortedDate[0][0];
    const waypointLast = sortedDate[0][sortedDate[0].length - 1];
    const waypointFirstCity = waypointFirst.city.name;
    const waypointLastCity = waypointLast.city.name;
    const waypointFirstDate = dayjs(waypointFirst.startTime).format(`D MMM`);
    const waypointLastDate = dayjs(waypointLast.endTime).format(`D MMM`);

    if (waypoints.length <= INFO_DESTINATIONS) {
      titleText = `${waypointFirstCity} &mdash; ${waypointLastCity}`;
    } else {
      titleText = `${waypointFirstCity} &mdash; ... &mdash; ${waypointLastCity}`;
    }

    if (waypointFirstDate && waypointLastDate) {
      dates = `${waypointFirstDate} &mdash; ${waypointLastDate}`;
    } else {
      dates = ``;
    }

    waypoints.forEach((item) => {
      totalPrice += item.price;
      item.eventType.offers.forEach((offer) => {
        totalPrice += offer.price;
      });
    });
  }

  return `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${titleText}</h1>

      <p class="trip-info__dates">${dates}</p>
    </div>

    <p class="trip-info__cost">
      Total: &euro;&nbsp;
      <span class="trip-info__cost-value">
        ${totalPrice}
      </span>
    </p>
  </section>`;
};

export default class Info extends AbstractView {
  constructor(waypoints) {
    super();
    this._waypoints = waypoints;
  }

  getTemplate() {
    return createTripInfoTemplate(this._waypoints);
  }
}

import dayjs from 'dayjs';
import duration from "dayjs/plugin/duration";
import OFFERS from "../mocks/const.js";
dayjs.extend(duration);

const getDuration = (time) => dayjs.duration(time).$d;

const castTimeDateFormat = (value) => String(value).padStart(2, `0`);

export const formatDateTime = (date) => (date) ? dayjs(date) : dayjs();

export const formatDuration = (time) => {
  const {days, hours, minutes} = getDuration(time);
  let result = ``;
  if (days !== 0) {
    result = castTimeDateFormat(days) + `D ` + castTimeDateFormat(hours) + `H ` + castTimeDateFormat(minutes) + `M`;
  } else if (hours !== 0) {
    result = castTimeDateFormat(hours) + `H ` + castTimeDateFormat(minutes) + `M`;
  } else {
    result = castTimeDateFormat(minutes) + `M`;
  }

  return result;
};

const getDestinationsForTrip = (waypoints) => {

  if (!waypoints || waypoints.length === 0) {
    return null;
  }

  const destinations = [];
  waypoints.forEach((evt) => destinations.push(evt.destination));
  return destinations;
};

export const getTripInfo = (waypoints) => {

  if (!waypoints || waypoints.length === 0) {
    return null;
  }

  const eventsByDateAsc = waypoints.slice().sort(sortEventDateAsc);

  return {
    startDate: eventsByDateAsc[0].startDate,
    finishDate: eventsByDateAsc[eventsByDateAsc.length - 1].finishDate,
    destinations: getDestinationsForTrip(eventsByDateAsc)
  };
};

export const getTripPrice = (waypoints) => {
  if (!waypoints || waypoints.length === 0) {
    return 0;
  }


  const totalPriceForEvents = waypoints.reduce((total, waypoint) => {
    const priceForEventOffers = Array.from(waypoint.offers).reduce((sum, offer) => sum + OFFERS.get(offer).price, 0);
    return waypoint.price + priceForEventOffers + total;
  }, 0);

  return totalPriceForEvents;
};

export const sortEventDateAsc = (lhsEvent, rhsEvent) => {
  return dayjs(lhsEvent.startDate).diff(dayjs(rhsEvent.startDate));
};

export const sortEventPriceDesc = (lhsEvent, rhsEvent) => {
  return rhsEvent.price - lhsEvent.price;
};

export const sortEventDurationDesc = (lhsEvent, rhsEvent) => {
  const lhsDurationMs = dayjs.duration(dayjs(lhsEvent.finishDate).diff(dayjs(lhsEvent.startDate))).asMilliseconds();
  const rhsDurationMs = dayjs.duration(dayjs(rhsEvent.finishDate).diff(dayjs(rhsEvent.startDate))).asMilliseconds();

  return rhsDurationMs - lhsDurationMs;
};

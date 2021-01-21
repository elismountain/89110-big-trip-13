import dayjs from 'dayjs';
import duration from "dayjs/plugin/duration";
// import OFFERS from "../mocks/const.js";
import {getDataForAllOffers} from '../mocks/waypoint.js';
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

  const waypointsByDateAsc = waypoints.slice().sort(sortWaypointDateAsc);

  return {
    startTime: waypointsByDateAsc[0].startTime,
    endTime: waypointsByDateAsc[waypointsByDateAsc.length - 1].endTime,
    destination: getDestinationsForTrip(waypointsByDateAsc)
  };
};

export const getTripPrice = (waypoints) => {
  if (!waypoints || waypoints.length === 0) {
    return 0;
  }

  const offersData = getDataForAllOffers();

  const totalPriceForWaypoints = waypoints.reduce((total, waypoint) => {
    const priceForWaypointsOffers = Array.from(waypoint.offers).reduce((sum, offer) => sum + offersData.get(offer).price, 0);
    return waypoint.price + priceForWaypointsOffers + total;
  }, 0);

  return totalPriceForWaypoints;
};

export const sortWaypointDateAsc = (lhsWaypoint, rhsWaypoint) => {
  return dayjs(lhsWaypoint.startTime).diff(dayjs(rhsWaypoint.startTime));
};

export const sortWaypointPriceDesc = (lhsWaypoint, rhsWaypoint) => {
  return rhsWaypoint.price - lhsWaypoint.price;
};

export const sortWaypointDurationDesc = (lhsWaypoint, rhsWaypoint) => {
  const lhsDurationMs = dayjs.duration(dayjs(lhsWaypoint.endTime).diff(dayjs(lhsWaypoint.startTime))).asMilliseconds();
  const rhsDurationMs = dayjs.duration(dayjs(rhsWaypoint.endTime).diff(dayjs(rhsWaypoint.startTime))).asMilliseconds();

  return rhsDurationMs - lhsDurationMs;
};

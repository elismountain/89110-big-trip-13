import dayjs from 'dayjs';
import duration from "dayjs/plugin/duration";
dayjs.extend(duration);

export const humanizeDate = (date, formatter = `YYYY-MM-DD`) => {
  return dayjs(date).format(formatter);
};

const getDestinationsForTrip = (waypoints) => {
  if (!waypoints || waypoints.length === 0) {
    return null;
  }

  const destinations = waypoints.map((waypoint) => waypoint.destination.name);

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

  const totalPriceForWaypoints = waypoints.reduce((total, waypoint) => {
    const priceForWaypointOffers = waypoint.offers.reduce((sum, offer) => sum + offer.price, 0);
    return waypoint.price + priceForWaypointOffers + total;
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


export const isPastDate = (date) => {
  return date === null ? false : dayjs().isAfter(date);
};

export const isFutureDate = (date) => {
  return date === null ? false : dayjs().isBefore(date, `day`) || dayjs().isSame(date, `day`);
};


export const formatDuration = (dateFrom, dateTo) => {
  const durationInMs = dayjs.duration(dayjs(dateTo).diff(dayjs(dateFrom)));

  return formatDurationMs(durationInMs.asMilliseconds());
};

export const formatDurationMs = (ms) => {
  const durationToFormat = dayjs.duration(ms);

  const days = durationToFormat.days();
  const hours = durationToFormat.hours();
  const minutes = durationToFormat.minutes();

  let template;

  if (days) {
    template = `DD[D] HH[H] mm[M]`;
  } else if (hours) {
    template = `HH[H] mm[M]`;
  } else {
    template = `mm[M]`;
  }

  const durationBeforeFormat = `0000-00-${days} ${hours}:${minutes}`;
  const formattedDuration = dayjs(durationBeforeFormat).format(template);
  return formattedDuration;
};
//
//
// //
//
// import {getDataForAllOffers} from '../mocks/waypoint.js';
//
//
// const getDuration = (time) => dayjs.duration(time).$d;
//
// const castTimeDateFormat = (value) => String(value).padStart(2, `0`);
//
// export const formatDateTime = (date) => (date) ? dayjs(date) : dayjs();
//
// export const formatDuration = (time) => {
//   const {days, hours, minutes} = getDuration(time);
//   let result = ``;
//   if (days !== 0) {
//     result = castTimeDateFormat(days) + `D ` + castTimeDateFormat(hours) + `H ` + castTimeDateFormat(minutes) + `M`;
//   } else if (hours !== 0) {
//     result = castTimeDateFormat(hours) + `H ` + castTimeDateFormat(minutes) + `M`;
//   } else {
//     result = castTimeDateFormat(minutes) + `M`;
//   }
//
//   return result;
// };
//
// const getDestinationsForTrip = (waypoints) => {
//
//   if (!waypoints || waypoints.length === 0) {
//     return null;
//   }
//
//   const destinations = [];
//   waypoints.forEach((event) => destinations.push(event.destination));
//   return destinations;
// };
//
//
//
// export const getTripPrice = (waypoints) => {
//   if (!waypoints || waypoints.length === 0) {
//     return 0;
//   }
//
//   const offersData = getDataForAllOffers();
//
//
//
//
//
//
//
//

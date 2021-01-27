import {FilterType} from '..utils/const.js';
import {isPastDate, isFutureDate} from './waypoint.js';

export const filter = {
  [FilterType.EVERYTHING]: (waypoints) => waypoints.filter((waypoint) => waypoint),
  [FilterType.FUTURE]: (waypoints) => waypoints.filter((waypoint) => isPointUnexpired(waypoint.startTime)),
  [FilterType.PAST]: (waypoints) => waypoints.filter((waypoint) => isPointExpired(waypoint.endTime))
};

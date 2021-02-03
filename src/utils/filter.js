import {FilterType} from '../utils/const.js';
import {isPastDate, isFutureDate} from '../utils/waypoint.js';

export const filter = {
  [FilterType.EVERYTHING]: (waypoints) => waypoints.slice(),
  [FilterType.FUTURE]: (waypoints) => waypoints.filter((waypoint) => isFutureDate(waypoint.startTime)),
  [FilterType.PAST]: (waypoints) => waypoints.filter((waypoint) => isPastDate(waypoint.endTime))
};

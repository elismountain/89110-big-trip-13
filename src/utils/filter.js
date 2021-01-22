import {FilterType} from '..utils/const.js';

import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
dayjs.extend(isSameOrBefore);

export const isPointExpired = (endEventDate) => {
  return endEventDate === null ? false : dayjs().isAfter(endEventDate, `D`);
};

export const isPointUnexpired = (endStartDate) => {
  return endStartDate === null ? false : dayjs().isSameOrBefore(endStartDate, `D`);
};

export const filter = {
  [FilterType.EVERYTHING]: (waypoints) => waypoints.filter((waypoint) => waypoint),
  [FilterType.FUTURE]: (waypoints) => waypoints.filter((waypoint) => isPointUnexpired(waypoint.startTime)),
  [FilterType.PAST]: (waypoints) => waypoints.filter((waypoint) => isPointExpired(waypoint.endTime))
};

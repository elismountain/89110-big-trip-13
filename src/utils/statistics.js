import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

export const getUniqueItems = (items) => [...new Set(items)];

export const getWayointTypes = (waypoints) => getUniqueItems(waypoints.map((waypoint) => waypoint.type));

const sumPrice = (waypoints) => waypoints.reduce((total, waypoint) => waypoint.price + total, 0);

export const sumPriceByType = (waypoints, type) => {
  return sumPrice(waypoints.filter((waypoint) => waypoint.type === type));
};

const getWaypointDurationInMs = (waypoint) => {
  return dayjs.duration(dayjs(waypoint.startTime).diff(dayjs(waypoint.endTime))).asMilliseconds();
};

const sumWaypointDurationsInMs = (waypoints) => waypoints.reduce((totalMs, waypoint) =>
  totalMs + getWaypointDurationInMs(waypoint), 0);

export const countDurationByWaypointType = (waypoints, type) => {
  const totalDurationInMs = sumWaypointDurationsInMs(waypoints.filter((waypoint) => waypoint.type === type));
  return totalDurationInMs;
};

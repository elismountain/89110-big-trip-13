import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

export const getUniqueItems = (items) => [...new Set(items)];

export const getPointTypes = (waypoints) => getUniqueItems(waypoints.map((waypoint) => waypoint.type));

const sumPrice = (waypoints) => waypoints.reduce((total, waypoint) => waypoint.price + total, 0);

export const sumPriceByType = (waypoints, type) => {
  return sumPrice(waypoints.filter((waypoint) => waypoint.type === type));
};

const getPointDurationInMs = (waypoint) => {
  return dayjs.duration(dayjs(waypoint.dateTo).diff(dayjs(waypoint.dateFrom))).asMilliseconds();
};

const sumPointDurationsInMs = (waypoints) => waypoints.reduce((totalMs, waypoint) =>
  totalMs + getPointDurationInMs(waypoint), 0);

export const countDurationByPointType = (waypoints, type) => {
  const totalDurationInMs = sumPointDurationsInMs(waypoints.filter((waypoint) => waypoint.type === type));
  return totalDurationInMs;
};

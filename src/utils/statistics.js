import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

// export const getUniqueItems = (items) => [...new Set(items)];
//
// export const getWayointTypes = (waypoints) => getUniqueItems(waypoints.map((waypoint) => waypoint.type));
//
// const sumPrice = (waypoints) => waypoints.reduce((total, waypoint) => waypoint.price + total, 0);
//
// export const sumPriceByType = (waypoints, type) => {
//   return sumPrice(waypoints.filter((waypoint) => waypoint.type === type));
// };
//
// const getWaypointDurationInMs = (waypoint) => {
//   return dayjs.duration(dayjs(waypoint.startTime).diff(dayjs(waypoint.endTime))).asMilliseconds();
// };
//
// const sumWaypointDurationsInMs = (waypoints) => waypoints.reduce((totalMs, waypoint) =>
//   totalMs + getWaypointDurationInMs(waypoint), 0);
//
// export const countDurationByWaypointType = (waypoints, type) => {
//   const totalDurationInMs = sumWaypointDurationsInMs(waypoints.filter((waypoint) => waypoint.type === type));
//   return totalDurationInMs;
// };

export const getTypes = (waypoints) => {
  let lookup = {};
  let items = waypoints;
  let result = [];

  for (let i = 0; i < items.length; i++) {
    let item = items[i];
    let type = item.eventType.type;

    if (!(type in lookup)) {
      lookup[type] = 1;
      result.push(type);
    }
  }

  return result.sort();
};

export const calculateCost = (waypoints) => {
  const labels = getTypes(waypoints);
  const costs = new Map();
  labels.forEach((type) => {
    costs.set(type, 0);
  });
  waypoints.forEach((waypoint) => {
    costs.set(waypoint.eventType.type, costs.get(waypoint.eventType.type) + waypoint.price);
  });
  return costs;
};

export const calculateUniqType = (waypoints) => {
  const labels = getTypes(waypoints);
  const uniqType = new Map();
  labels.forEach((type) => {
    uniqType.set(type, 0);
  });
  waypoints.forEach((waypoint) => {
    uniqType.set(waypoint.eventType.type, uniqType.get(waypoint.eventType.type) + 1);
  });
  return uniqType;
};

export const calculateTime = (waypoints) => {
  const labels = getTypes(waypoints);
  let times = new Map();
  labels.forEach((type) => {
    times.set(type, 0);
  });
  waypoints.forEach((waypoint) => {
    const travelHours = Math.floor((waypoint.startTime - waypoint.startTime) / 3600000 / 24);
    times.set(waypoint.eventType.type, times.get(waypoint.eventType.type) + travelHours);
  });
  return times;
};

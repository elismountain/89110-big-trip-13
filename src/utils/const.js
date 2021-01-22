import {isPastDate, isFutureDate} from '../utils/event.js';

export const SortType = {
  DAY: `sort-day`,
  EVENT: `sort-event`,
  TIME: `sort-time`,
  PRICE: `sort-price`,
  OFFER: `sort-offer`
};

export const UserAction = {
  UPDATE_EVENT: `UPDATE_EVENT`,
  ADD_EVENT: `ADD_EVENT`,
  DELETE_EVENT: `DELETE_EVENT`
};

export const FilterType = {
  EVERYTHING: `everything`,
  FUTURE: `future`,
  PAST: `past`
};

export const UpdateType = {
  PATCH: `PATCH`,
  MINOR: `MINOR`,
  MAJOR: `MAJOR`
};

export const filter = {
  [FilterType.EVERYTHING]: (waypoints) => waypoints.slice(),
  [FilterType.FUTURE]: (waypoints) => waypoints.filter((waypoint) => isFutureDate(waypoint.startTime)),
  [FilterType.PAST]: (waypoints) => waypoints.filter((waypoint) => isPastDate(waypoint.endTime))
};

import Observer from '../utils/observer.js';

export default class Waypoints extends Observer {
  constructor() {
    super();
    this._points = [];
  }

  set(updateType, waypoints) {
    this._points = waypoints.slice();
    this._notify(updateType);
  }

  get() {
    return this._points;
  }

  update(updateType, update) {
    const index = this._points.findIndex((waypoint) => waypoint.id === update.id);

    if (index === -1) {
      throw new Error(`Can't update a non existing point`);
    }

    this._points = [
      ...this._points.slice(0, index),
      update,
      ...this._points.slice(index + 1)
    ];

    this._notify(updateType, update);
  }

  add(updateType, update) {
    this._points = [
      update,
      ...this._points
    ];

    this._notify(updateType, updateType);
  }

  delete(updateType, update) {
    const index = this._points.findIndex((waypoint) => waypoint.id === update.id);

    if (index === -1) {
      throw new Error(`Can't delete a non existing point`);
    }

    this._points = [
      ...this._points.slice(0, index),
      ...this._points.slice(index + 1)
    ];

    this._notify(updateType, update);
  }

  static adaptToClient(waypoint) {
    const destination = Object.assign({}, waypoint.destination, {photos: waypoint.destination.pictures});
    delete destination.pictures;

    const adaptedWaypoint = Object.assign(
        {},
        waypoint,
        {
          startTime: waypoint.date_from !== null ? new Date(waypoint.date_from) : waypoint.date_from,
          endTime: waypoint.date_to !== null ? new Date(waypoint.date_to) : waypoint.date_to,
          destination,
          price: waypoint.base_price,
          isFavorite: waypoint.is_favorite
        }
    );

    delete adaptedWaypoint.date_from;
    delete adaptedWaypoint.date_to;
    delete adaptedWaypoint.base_price;
    delete adaptedWaypoint.is_favorite;

    return adaptedWaypoint;
  }

  static adaptToServer(waypoint) {
    const destination = Object.assign({}, waypoint.destination, {pictures: waypoint.destination.photos});
    delete destination.photos;

    const adaptedWaypoint = Object.assign(
        {},
        waypoint,
        {
          "date_from": waypoint.startTime instanceof Date ? waypoint.startTime.toISOString() : null,
          "date_to": waypoint.endTime instanceof Date ? waypoint.endTime.toISOString() : null,
          "destination": destination,
          "base_price": waypoint.price,
          "is_favorite": waypoint.isFavorite,
          "offers": waypoint.offers
        }
    );

    delete adaptedWaypoint.startTime;
    delete adaptedWaypoint.endTime;
    delete adaptedWaypoint.price;
    delete adaptedWaypoint.isFavorite;

    return adaptedWaypoint;
  }
}

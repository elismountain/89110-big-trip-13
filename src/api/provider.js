import WaypointsModel from '../model/waypoints.js';
import {isOnline} from '../utils/common.js';

const getSyncedWaypoints = (items) => {
  return items.filter(({success}) => success)
  .map(({payload}) => payload.waypoint);
};

const createStoreStructure = (items) => {
  if (items instanceof Map) {
    return Object.fromEntries(items.entries());
  }
  return items.reduce((accumulator, current) => {
    return Object.assign({}, accumulator, {
      [current.id]: current,
    });
  }, {});
};

export default class Provider {
  constructor(api, storeWaypoints, storeOffers, storeDestinations) {
    this._api = api;
    this._storeWaypoints = storeWaypoints;
    this._storeOffers = storeOffers;
    this._storeDestinations = storeDestinations;
  }

  getOffers() {
    if (isOnline()) {
      return this._api.getOffers()
      .then((offers) => {
        const items = createStoreStructure(offers);
        this._storeOffers.setItems(items);
        return offers;
      });
    }

    const storeOffers = this._storeOffers.getItems();

    return Promise.resolve(new Map(Object.entries(storeOffers)));
  }

  getDestinations() {
    if (isOnline()) {
      return this._api.getDestinations()
      .then((destinations) => {
        const items = createStoreStructure(destinations);
        this._storeDestinations.setItems(items);
        return destinations;
      });
    }

    const storeDestinations = this._storeDestinations.getItems();

    return Promise.resolve(new Map(Object.entries(storeDestinations)));
  }

  getWaypoints() {
    if (isOnline()) {
      return this._api.getWaypoints()
      .then((waypoints) => {
        const items = createStoreStructure(waypoints.map(WaypointsModel.adaptToServer));
        this._storeWaypoints.setItems(items);
        return waypoints;
      });
    }

    const storeWaypoints = Object.values(this._storeWaypoints.getItems());

    return Promise.resolve(storeWaypoints.map(WaypointsModel.adaptToClient));
  }

  updateWaypoint(waypoint) {
    if (isOnline()) {
      return this._api.updateWaypoint(waypoint)
      .then((updatedWaypoint) => {
        this._storeWaypoints.setItem(updatedWaypoint.id, WaypointsModel.adaptToServer(Object.assign({}, waypoint)));
        return updatedWaypoint;
      });
    }

    this._storeWaypoints.setItem(waypoint.id, WaypointsModel.adaptToServer(Object.assign({}, waypoint)));

    return Promise.resolve(waypoint);
  }

  addWaypoint(waypoint) {
    if (isOnline()) {
      return this._api.addWaypoint(waypoint)
      .then((newWaypoint) => {
        this._storeWaypoints.setItem(newWaypoint.id, WaypointsModel.adaptToServer(newWaypoint));
        return newWaypoint;
      });
    }

    return Promise.reject(new Error(`Adding new point failed`));
  }

  deleteWaypoint(waypoint) {
    if (isOnline()) {
      return this._api.deleteWaypoint(waypoint)
      .then(() => this._storeWaypoints.removeItem(waypoint.id));
    }

    return Promise.reject(new Error(`Deleting task failed`));
  }

  sync() {
    if (isOnline()) {
      const storeWaypoints = Object.values(this._storeWaypoints.getItems());

      return this._api.sync(storeWaypoints)
      .then((response) => {
        const createdWaypoints = getSyncedWaypoints(response.created);
        const updatedWaypoints = getSyncedWaypoints(response.updated);

        const items = createStoreStructure([...createdWaypoints, ...updatedWaypoints]);

        this._storeWaypoints.setItems(items);
      });
    }

    return Promise.reject(new Error(`Sync data failed`));
  }
}

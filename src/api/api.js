import OffersModel from '../model/offers.js';
import DestinationsModel from '../model/destinations.js';
import WaypointsModel from '../model/waypoints.js';

const Method = {
  GET: `GET`,
  PUT: `PUT`,
  POST: `POST`,
  DELETE: `DELETE`
};

const SuccessHTTPStatusRange = {
  MIN: 200,
  MAX: 299
};

export default class Api {
  constructor(endWaypoint, authorization) {
    this._endWaypoint = endWaypoint;
    this._authorization = authorization;
  }

  getWaypoints() {
    return this._load({url: `points`})
    .then(Api.toJSON)
    .then((waypoints) => waypoints.map(WaypointsModel.adaptToClient));
  }

  addWaypoint(waypoint) {
    return this._load({
      url: `points`,
      method: Method.POST,
      body: JSON.stringify(WaypointsModel.adaptToServer(waypoint)),
      headers: new Headers({"Content-Type": `application/json`})
    })
    .then(Api.toJSON)
    .then(WaypointsModel.adaptToClient);
  }

  deleteWaypoint(waypoint) {
    return this._load({
      url: `points/${waypoint.id}`,
      method: Method.DELETE
    });
  }

  updateWaypoint(waypoint) {
    return this._load({
      url: `points/${waypoint.id}`,
      method: Method.PUT,
      body: JSON.stringify(WaypointsModel.adaptToServer(waypoint)),
      headers: new Headers({"Content-Type": `application/json`})
    })
    .then(Api.toJSON)
    .then(WaypointsModel.adaptToClient);
  }

  getOffers() {
    return this._load({url: `offers`})
    .then(Api.toJSON)
    .then(OffersModel.adaptToClient);
  }

  getDestinations() {
    return this._load({url: `destinations`})
    .then(Api.toJSON)
    .then(DestinationsModel.adaptToClient);
  }

  sync(data) {
    return this._load({
      url: `points/sync`,
      method: Method.POST,
      body: JSON.stringify(data),
      headers: new Headers({"Content-Type": `application/json`})
    })
    .then(Api.toJSON);
  }

  _load({
    url,
    method = Method.GET,
    body = null,
    headers = new Headers()
  }) {
    headers.append(`Authorization`, this._authorization);

    return fetch(
        `${this._endWaypoint}/${url}`,
        {method, body, headers}
    )
    .then(Api.checkStatus)
    .catch(Api.catchError);
  }

  static checkStatus(response) {
    if (
      response.status < SuccessHTTPStatusRange.MIN ||
      response.status > SuccessHTTPStatusRange.MAX
    ) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }

    return response;
  }

  static toJSON(response) {
    return response.json();
  }

  static catchError(err) {
    throw err;
  }
}

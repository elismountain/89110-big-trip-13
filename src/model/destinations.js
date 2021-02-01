import Observer from '../utils/observer.js';

export default class Destinations extends Observer {
  constructor() {
    super();
    this._destinations = new Map();
  }

  setDestinations(destinations) {
    this._destinations = new Map(destinations);
  }

  getDestinations() {
    return this._destinations;
  }

  static adaptToClient(destinations) {
    const adaptedDestinations = new Map();

    destinations.forEach((destination) =>
      adaptedDestinations.set(destination.name, {
        description: destination.description,
        photos: [...destination.pictures]
      }));
    return adaptedDestinations;
  }
}

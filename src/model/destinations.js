import Observer from '../utils/observer.js';

export default class Destinations extends Observer {
  constructor() {
    super();
    this._items = new Map();
  }

  set(destinations) {
    this._items = new Map(destinations);
  }

  get() {
    return this._items;
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

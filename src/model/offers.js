import Observer from '../utils/observer.js';

export default class Offers extends Observer {
  constructor() {
    super();
    this._items = new Map();
  }

  set(offers) {
    this._items = new Map(offers);
  }

  get() {
    return this._items;
  }

  static adaptToClient(offers) {
    const adaptedOffers = new Map();

    offers.forEach((offer) => adaptedOffers.set(offer.type, [...offer.offers]));

    return adaptedOffers;
  }
}

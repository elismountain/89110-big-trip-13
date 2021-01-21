import Subject from '../utils/subject.js';

export default class DataList extends Subject {
  constructor() {
    super();
    this._offers = new Map();
    this._types = new Map();
    this._destinations = new Map();
  }

  setData(offers, types, destinations) {
    this.setOffers(offers);
    this.setTypes(types);
    this.setDestinations(destinations);
  }

  setOffers(offers) {
    this._offers = new Map(offers);
  }

  getOffers() {
    return this._offers;
  }

  setTypes(types) {
    this._types = new Map(types);
  }

  getTypes() {
    return this._types;
  }

  setDestinations(destinations) {
    this._destinations = new Map(destinations);
  }

  getDestinations() {
    return this._destinations;
  }
}

import Observer from '../utils/observer.js';

export default class DataList extends Observer {
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

  static adaptOffersToClient(serverOffers) {
    if (!serverOffers || serverOffers.length === 0) {
      return new Map();
    }

    const clientOffers = new Map();

    serverOffers.forEach((serverOffer) => {
      serverOffer.offers.forEach((offer) => clientOffers.set(offer.title, {title: offer.title, price: offer.price, pointTypeKey: serverOffer.type}));
    });

    return clientOffers;
  }

  static adaptDestinationsToClient(serverDestinations) {
    if (!serverDestinations || serverDestinations.length === 0) {
      return new Map();
    }

    const clientDestinations = new Map();
    serverDestinations.forEach((serverDestination) => {
      const photos = serverDestination.pictures.map((picture) => picture.src);
      clientDestinations.set(serverDestination.name, {description: serverDestination.description, photos});
    });

    return clientDestinations;
  }
}

export default class Observer {
  constructor() {
    this._observers = [];
  }

  attach(observer) {
    this._observers.push(observer);
  }

  detach(observer) {
    this._observers = this._observers.filter((existingObserver) => existingObserver !== observer);
  }

  _notify(waypoint, payload) {
    this._observers.forEach((observer) => observer(waypoint, payload));
  }
}

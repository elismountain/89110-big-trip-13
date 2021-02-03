import Abstract from './abstract.js';

export default class Smart extends Abstract {
  constructor() {
    super();
    this._state = {};
  }

  updateData(update, isStateUpdateOnly) {
    if (!update) {
      return;
    }

    this._state = Object.assign(
        {},
        this._state,
        update
    );

    if (isStateUpdateOnly) {
      return;
    }

    this.updateElement();
  }

  updateElement() {
    const prevElement = this.getElement();

    const parent = prevElement.parentElement;
    this.removeElement();

    const newElement = this.getElement();
    parent.replaceChild(newElement, prevElement);

    this.restoreHandlers();
  }

  restoreHandlers() {
    throw new Error(`Abstract method not implemented restoreHandlers`);
  }
}

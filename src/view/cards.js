import {
  createElement
} from "../utils/render.js";

const createCardsTemplate = () => {
  return (
    `<ul class="trip-events__list"></ul>`
  );
};


export default class Cards {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createCardsTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

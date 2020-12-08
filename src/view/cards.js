import {
  createElement
} from "../utils/render.js";

const createCardsTemplate = () => {
  return (
    `<ul class="trip-events__list"></ul>`
  );
};


export default class CreateCardsList {
  constructor(task) {
    this._element = null;
    this._task = task;
  }

  getTemplate() {
    return createCardsTemplate(this._task);
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

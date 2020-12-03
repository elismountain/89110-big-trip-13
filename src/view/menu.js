import {generateMenuItems} from "../mocks/menu.js";
import {createElement} from "../utils/render.js";

const generateMenuMarkup = generateMenuItems().map((menu) => {
  const {title, isChecked} = menu;
  return (
    `<a class="trip-tabs__btn ${isChecked ? `trip-tabs__btn--active` : ``}" href="#">${title}</a>`
  );
}).join(``);


export const createMenuTemplate = () => {
  return (
    `<nav class="trip-controls__trip-tabs  trip-tabs">
        ${generateMenuMarkup}
     </nav>`
  );
};

export default class SiteMenu {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createMenuTemplate();
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

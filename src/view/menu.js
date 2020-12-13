import {createElement} from "../utils/render.js";

const createMenuTemplate = (menuTabs) => {
  const menuMarkup = menuTabs.map((menu) => {
    const {title, isChecked} = menu;
    return (
      `<a class="trip-tabs__btn ${isChecked ? `trip-tabs__btn--active` : ``}" href="#">${title}</a>`
    );
  }).join(``);

  return (
    `<nav class="trip-controls__trip-tabs  trip-tabs">
        ${menuMarkup}
     </nav>`
  );
};

export default class Menu {
  constructor(menuTabs) {
    this._element = null;
    this._menus = menuTabs;
  }

  getTemplate() {
    return createMenuTemplate(this._menus);
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

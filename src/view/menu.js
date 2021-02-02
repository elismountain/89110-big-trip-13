import AbstractView from "./abstract.js";
import {MenuItem} from '../utils/const.js';

export const createMenuTemplate = () => {
  return `<nav class="trip-controls__trip-tabs  trip-tabs">
    <a class="trip-tabs__btn  trip-tabs__btn--active" href="#" data-key="${MenuItem.TABLE}">Table</a>
    <a class="trip-tabs__btn" href="#" data-key="${MenuItem.STATISTICS}">Stats</a>
  </nav>`;
};

export default class Menu extends AbstractView {
  constructor() {
    super();
    this._onMenuClickHandler = this._onMenuClickHandler.bind(this);
  }

  getTemplate() {
    return createMenuTemplate();
  }

  setMenuClickHandler(callback) {
    this._callback.clickMenu = callback;
    this.getElement().addEventListener(`click`, this._onMenuClickHandler);
  }

  _onMenuClickHandler(evt) {
    evt.preventDefault();
    this._callback.clickMenu(evt.target.dataset.key);
  }

  setMenuItem(menuItem) {
    const items = this.getElement().querySelectorAll(`.trip-tabs__btn`);

    if (items === null) {
      return;
    }

    items.forEach((item) => {
      if (item.dataset.key === menuItem) {
        item.classList.add(`trip-tabs__btn--active`);
      } else {
        item.classList.remove(`trip-tabs__btn--active`);
      }
    });
  }
}

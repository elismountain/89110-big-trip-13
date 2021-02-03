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
    this._onClick = this._onClick.bind(this);
  }

  getTemplate() {
    return createMenuTemplate();
  }

  setClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().addEventListener(`click`, this._onClick);
  }

  setItem(menuItem) {
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

  _onClick(evt) {
    evt.preventDefault();
    this._callback.click(evt.target.dataset.key);
  }
}

import {createElement} from "../utils/render.js";

export const createFilterTemplate = (filterTabs) => {
  const generateFilterMarkup = filterTabs.map((filter) => {
    const {title, isChecked} = filter;
    const id = title.toLowerCase();
    return (
      `<div class="trip-filters__filter">
         <input id="${id}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${id}" ${isChecked ? `checked` : ``}>
         <label class="trip-filters__filter-label" for="filter-${id}">${title}</label>
       </div>`
    );
  }).join(``);

  return (
    `<form class="trip-filters" action="#" method="get">
              ${generateFilterMarkup}
              <button class="visually-hidden" type="submit">Accept filter</button>
            </form>`
  );
};

export default class SiteFilter {
  constructor(task) {
    this._element = null;
    this._task = task;
  }

  getTemplate() {
    return createFilterTemplate(this._task);
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

import Abstract from "./abstract.js";

const createFilterTemplate = (filterTabs) => {
  const filterMarkup = filterTabs.map((filter) => {
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
              ${filterMarkup}
              <button class="visually-hidden" type="submit">Accept filter</button>
            </form>`
  );
};

export default class Filter extends Abstract {
  constructor(filterTabs) {
    super();
    this._filter = filter;
  }

  getTemplate() {
    return createFilterTemplate(this._filter);
  }
}

import {generateFilters} from "../mocks/filter.js";

const generateFilterMarkup = generateFilters().map((filter) => {
  const {title, isChecked} = filter;
  const id = title.toLowerCase();
  return (
    `<div class="trip-filters__filter">
       <input id="${id}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${id}" ${isChecked ? `checked` : ``}>
       <label class="trip-filters__filter-label" for="filter-${id}">${title}</label>
     </div>`
  );
}).join(``);


export const createFilterTemplate = () => {
  return (
    `<form class="trip-filters" action="#" method="get">
              ${generateFilterMarkup}
              <button class="visually-hidden" type="submit">Accept filter</button>
            </form>`
  );
};

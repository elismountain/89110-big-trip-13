import {generateFilters} from "../mocks/filter";

const generateFilterMarkup = generateFilters().map((el) => {
  let {title, isChecked} = el;
  return (
    `<div class="trip-filters__filter">
       <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything" ${isChecked ? `checked` : ``}>
       <label class="trip-filters__filter-label" for="filter-everything">${title}</label>
     </div>`
  );
}).join(`\n`);


export const createFilterTemplate = () => { // Фильтры
  return (
    `<form class="trip-filters" action="#" method="get">
              ${generateFilterMarkup}
              <button class="visually-hidden" type="submit">Accept filter</button>
            </form>`
  );
};

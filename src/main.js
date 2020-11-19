
import {editFormTemplate} from "./view/edit-form.js";
import {createTripInfoTemplate} from "./view/trip-info/js";
import {createTripCostTemplate} from "./view/trip-cost/js";
import {createMenuTemplate} from "./view/menu.js";
import {createSortTemplate} from "./view/sort/js";
import {createFilterTemplate} from "./view/filter.js";
import {createCardTemplate} from "./view/create-card.js";
import {addNewPointTemplate} from "./view/add-new-point.js";


const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

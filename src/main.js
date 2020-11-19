
import {editFormTemplate} from "./view/edit-form.js";
import {createTripInfoTemplate} from "./view/trip-info.js";
import {createMenuTemplate} from "./view/menu.js";
import {createFilterTemplate} from "./view/filter.js";
import {createCardTemplate} from "./view/create-card.js";
import {addNewPointTemplate} from "./view/add-new-point.js";
import {createTripCostTemplate} from "./view/trip-cost.js";
import {createSortTemplate} from "./view/sort.js";

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};


const tripEventsElement = document.querySelector(`.trip-events`);
render(tripEventsElement, editFormTemplate(), `beforeend`);

const tripInfoElement = document.querySelector(`.trip-main__trip-info`);
render(tripInfoElement, createTripInfoTemplate(), `afterbegin`);

const tripControlsElement = document.querySelector(`.trip-main__trip-controls`);
render(tripControlsElement, createFilterTemplate(), `beforeend`);

const tripControlsMenuElement = tripControlsElement.querySelector(`h2`);
render(tripControlsMenuElement, createMenuTemplate(), `afterend`);
render(tripNewPointTemplate, addNewPointTemplate(), `beforeend`);

const tripNewPointTemplate = document.querySelector(`.trip-main__event-add-btn`);
render(tripEventsElement, createCardTemplate(), `beforeend`);

const tripCostTemplate = document.querySelector(`.trip-info__cost`);
render(tripCostTemplate, createTripCostTemplate(), `beforeend`);

const tripSortTemplate = document.querySelector(`.trip-events__trip-sort`);
render(tripSortTemplate, createSortTemplate(), `beforeend`);


import {createEditFormTemplate} from "./view/edit-form.js";
import {createTripInfoTemplate} from "./view/trip-info.js";
import {createMenuTemplate} from "./view/menu.js";
import {createFilterTemplate} from "./view/filter.js";
import {createCardTemplate} from "./view/card.js";
import {createNewPointTemplate} from "./view/new-point.js";
import {createTripCostTemplate} from "./view/trip-cost.js";
import {createSortTemplate} from "./view/sort.js";


const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};


const tripEventsElement = document.querySelector(`.trip-events`);
render(tripEventsElement, createEditFormTemplate(), `beforeend`);
render(tripEventsElement, createEditFormTemplate(), `beforeend`);
render(tripEventsElement, createEditFormTemplate(), `beforeend`);

const tripInfoElement = document.querySelector(`.trip-main__trip-info`);
render(tripInfoElement, createTripInfoTemplate(), `afterbegin`);

const tripControlsElement = document.querySelector(`.trip-main__trip-controls`);
render(tripControlsElement, createFilterTemplate(), `beforeend`);

const tripControlsMenuElement = tripControlsElement.querySelector(`h2`);
render(tripControlsMenuElement, createMenuTemplate(), `afterend`);


const tripNewPointElement = document.querySelector(`.trip-main__event-add-btn`);
render(tripNewPointElement, createNewPointTemplate(), `beforeend`);

const tripCardElement = document.querySelector(`.trip-events__item`);
render(tripCardElement, createCardTemplate(), `beforeend`);


const tripCostElement = document.querySelector(`.trip-info__cost`);
render(tripCostElement, createTripCostTemplate(), `beforeend`);

const tripSortElement = document.querySelector(`.trip-events__trip-sort`);
render(tripSortElement, createSortTemplate(), `beforeend`);

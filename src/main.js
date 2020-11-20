
import {createCardsTemplate} from './view/cards-template.js';
import {createSortTemplate} from './view/sort.js';
import {createTripInfoTemplate} from './view/trip-info.js';
import {createTripCostTemplate} from './view/trip-cost.js';
import {createFilterTemplate} from './view/filter.js';
import {createMenuTemplate} from './view/menu.js';
import {createEditFormTemplate} from './view/edit-form.js';
import {createCardTemplate} from './view/card.js';

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const tripInfoElement = document.querySelector(`.trip-main`);
render(tripInfoElement, createTripInfoTemplate(), `afterbegin`);

const tripCostElement = document.querySelector(`.trip-info__main`);
render(tripCostElement, createTripCostTemplate(), `afterend`);


const tripControlsElement = document.querySelector(`.trip-main__trip-controls`);
const tripControlsMenuElement = tripControlsElement.querySelector(`h2`);

render(tripControlsElement, createFilterTemplate());
render(tripControlsMenuElement, createMenuTemplate(), `afterend`);


const tripEventsElement = document.querySelector(`.trip-events`);
render(tripEventsElement, createSortTemplate());
render(tripEventsElement, createEditFormTemplate());
render(tripEventsElement, createCardsTemplate());

const tripCardsElement = document.querySelector(`.trip-events__list`);
render(tripCardsElement, createCardTemplate());

import {createTripInfoTemplate} from './view/trip-info.js';
import {createMenuTemplate} from './view/menu.js';
import {createCardsTemplate} from './view/cards.js';
import {createSortTemplate} from './view/sort.js';
import {createTripCostTemplate} from './view/trip-cost.js';
import {createFilterTemplate} from './view/filter.js';
import {createEditFormTemplate} from './view/edit-form.js';
import {createCardTemplate} from './view/card.js';
import {createNewPointTemplate} from './view/new-point.js';
import {generateEventsArrey} from './mocks/event.js';
import {generateMenuItems} from './mocks/menu.js';
import {generateFilters} from './mocks/filter.js';
import {renderTemplate} from "./utils/render.js";

const CARDS_COUNT = 3;
const events = generateEventsArrey(CARDS_COUNT);
// const destinations = generateDestinations();
// const offers = generateOffers();

const tripInfoElement = document.querySelector(`.trip-main`);
renderTemplate(tripInfoElement, createTripInfoTemplate(events[0].startTime, events[events.length - 1].endTime), `afterbegin`);
const tripCostElement = document.querySelector(`.trip-info__main`);
renderTemplate(tripCostElement, createTripCostTemplate(), `afterend`);

const tripControlsElement = document.querySelector(`.trip-main__trip-controls`);
const tripControlsMenuElement = tripControlsElement.querySelector(`h2`);

const menuTabs = generateMenuItems();
renderTemplate(tripControlsMenuElement, createMenuTemplate(menuTabs), `afterend`);

const filterTabs = generateFilters();
renderTemplate(tripControlsElement, createFilterTemplate(filterTabs));
renderTemplate(tripControlsElement, createNewPointTemplate(events[0]), `afterend`);
// renderTemplate(tripControlsElement, createNewPointTemplate(events[0], destinations, offers), `afterend`);

const tripEventsElement = document.querySelector(`.trip-events`);
renderTemplate(tripEventsElement, createSortTemplate());
renderTemplate(tripEventsElement, createEditFormTemplate(events[0]));
renderTemplate(tripEventsElement, createCardsTemplate());

const tripCardsElement = document.querySelector(`.trip-events__list`);


events.forEach(
    (eventItem) => renderTemplate(tripCardsElement, createCardTemplate(eventItem))
);

import {createTripInfoTemplate} from './view/trip-info.js';
import {createMenuTemplate} from './view/menu.js';
import {createCardsTemplate} from './view/cards.js';
import {createSortTemplate} from './view/sort.js';
import {createTripCostTemplate} from './view/trip-cost.js';
import {createFilterTemplate} from './view/filter.js';
import {createEditFormTemplate} from './view/edit-form.js';
import {createCardTemplate} from './view/card.js';
import {createNewWaypointTemplate} from './view/new-waypoint-form.js';
import {waypoints} from './mocks/waypoint.js';
import {generateMenuItems} from './mocks/menu.js';
import {generateFilters} from './mocks/filter.js';
import {renderTemplate} from "./utils/render.js";
import {CITIES, OFFERS, DESTINATIONS, WAYPOINT_TYPES} from "./mocks/const.js";

const destinations = DESTINATIONS;
const waypointTypes = WAYPOINT_TYPES;
const offers = OFFERS;
const cities = CITIES;

const tripInfoElement = document.querySelector(`.trip-main`);
renderTemplate(tripInfoElement, createTripInfoTemplate(waypoints[0].startTime, waypoints[waypoints.length - 1].endTime), `afterbegin`);
const tripCostElement = document.querySelector(`.trip-info__main`);
renderTemplate(tripCostElement, createTripCostTemplate(), `afterend`);

const tripControlsElement = document.querySelector(`.trip-main__trip-controls`);
const tripControlsMenuElement = tripControlsElement.querySelector(`h2`);

const menuTabs = generateMenuItems();
renderTemplate(tripControlsMenuElement, createMenuTemplate(menuTabs), `afterend`);

const filterTabs = generateFilters();
renderTemplate(tripControlsElement, createFilterTemplate(filterTabs));
renderTemplate(tripControlsElement, createNewWaypointTemplate(waypoints[0]), `afterend`);

const tripEventsElement = document.querySelector(`.trip-events`);
renderTemplate(tripEventsElement, createSortTemplate());
renderTemplate(tripEventsElement, createEditFormTemplate(waypoints[0], destinations, waypointTypes, offers));
renderTemplate(tripEventsElement, createCardsTemplate());

const tripCardsElement = document.querySelector(`.trip-events__list`);

waypoints.forEach(
    (waypointItem) => renderTemplate(tripCardsElement, createCardTemplate(waypointItem, cities))
);

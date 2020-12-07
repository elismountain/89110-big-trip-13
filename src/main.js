import TripInfo from './view/trip-info.js';
import SiteMenu from './view/menu.js';
import CreateCardsList from './view/cards.js';
import SortingTabs from './view/sort.js';
import TripPrice from './view/trip-cost.js';
import SiteFilter from './view/filter.js';
import EditForm from './view/edit-form.js';
import CreateCard from './view/card.js';
import WaypointButton from './view/new-waypoint-form.js';
import {waypoints} from './mocks/waypoint.js';
import {generateMenuItems} from './mocks/menu.js';
import {generateFilters} from './mocks/filter.js';
import {renderElement} from "./utils/render.js";
import {CITIES, OFFERS, DESTINATIONS, WAYPOINT_TYPES} from "./mocks/const.js";

const destinations = DESTINATIONS;
const waypointTypes = WAYPOINT_TYPES;
const offers = OFFERS;
const cities = CITIES;

const tripInfoElement = document.querySelector(`.trip-main`);
renderElement(tripInfoElement, new TripInfo(waypoints[0].startTime, waypoints[waypoints.length - 1].endTime).getElement(), `afterbegin`);
const tripCostElement = document.querySelector(`.trip-info__main`);
renderElement(tripCostElement, new TripPrice().getElement(), `afterend`);

const tripControlsElement = document.querySelector(`.trip-main__trip-controls`);
const tripControlsMenuElement = tripControlsElement.querySelector(`h2`);

const menuTabs = generateMenuItems();
renderElement(tripControlsMenuElement, new SiteMenu(menuTabs).getElement(), `afterend`);

const filterTabs = generateFilters();
renderElement(tripControlsElement, new SiteFilter(filterTabs).getElement());
renderElement(tripControlsElement, new WaypointButton(waypoints[0]).getElement(), `afterend`);

const tripEventsElement = document.querySelector(`.trip-events`);
renderElement(tripEventsElement, new SortingTabs().getElement());
renderElement(tripEventsElement, new EditForm(waypoints[0], destinations, waypointTypes, offers).getElement());
renderElement(tripEventsElement, new CreateCardsList().getElement());

const tripCardsElement = document.querySelector(`.trip-events__list`);

waypoints.forEach(
    (waypointItem) => renderElement(tripCardsElement, new CreateCard(waypointItem, cities).getElement())
);

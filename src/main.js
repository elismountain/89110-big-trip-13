import TripInfo from './view/trip-info.js';
import Menu from './view/menu.js';
import Cards from './view/cards.js';
import SortingTab from './view/sort.js';
import TripCost from './view/trip-cost.js';
import Filter from './view/filter.js';
import Form from './view/edit-form.js';
import Card from './view/card.js';
import NewWaypoint from './view/new-waypoint-form.js';
import {waypoints} from './mocks/waypoint.js';
import {generateMenuItems} from './mocks/menu.js';
import {generateFilters} from './mocks/filter.js';
import {render, RenderPosition} from "./utils/render.js";
import {OFFERS, DESTINATIONS, WAYPOINT_TYPES} from "./mocks/const.js";
import {ESC_KEYCODE} from "./utils/accessibility.js";

const destinations = DESTINATIONS;
const waypointTypes = WAYPOINT_TYPES;
const offers = OFFERS;

const tripInfoElement = document.querySelector(`.trip-main`);
render(tripInfoElement, new TripInfo(waypoints[0].startTime, waypoints[waypoints.length - 1].endTime).getElement(), RenderPosition.AFTERBEGIN);
const tripCostElement = document.querySelector(`.trip-info__main`);
render(tripCostElement, new TripCost().getElement(), RenderPosition.AFTEREND);

const tripControlsElement = document.querySelector(`.trip-main__trip-controls`);
const tripControlsMenuElement = tripControlsElement.querySelector(`h2`);

const menuTabs = generateMenuItems();
render(tripControlsMenuElement, new Menu(menuTabs).getElement(), RenderPosition.AFTEREND);

const filterTabs = generateFilters();
render(tripControlsElement, new Filter(filterTabs).getElement());
render(tripControlsElement, new NewWaypoint(waypoints[0]).getElement(), RenderPosition.AFTERBEGIN);

const tripEventsElement = document.querySelector(`.trip-events`);
render(tripEventsElement, new SortingTab().getElement());
render(tripEventsElement, new Form(waypoints[0], destinations, waypointTypes, offers).getElement());
render(tripEventsElement, new Cards().getElement());

const tripCardsElement = document.querySelector(`.trip-events__list`);

const renderWaypoint = (waypointListElement, waypoint) => {
  const waypointComponent = new Card(waypoint);
  const waypointEditComponent = new Form(waypoint, destinations, waypointTypes, offers);
  const replaceCardToForm = () => {
    waypointListElement.replaceChild(waypointEditComponent.getElement(), waypointComponent.getElement());
  };

  const replaceFormToCard = () => {
    waypointListElement.replaceChild(waypointComponent.getElement(), waypointEditComponent.getElement());
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === ESC_KEYCODE) {
      evt.preventDefault();
      replaceFormToCard();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  waypointComponent.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
    replaceCardToForm();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  waypointEditComponent.getElement().querySelector(`form`).addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    replaceFormToCard();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(waypointListElement, waypointComponent.getElement(), RenderPosition.AFTEREND);
};

waypoints.forEach((waypointItem) => renderWaypoint(tripCardsElement, waypointItem));

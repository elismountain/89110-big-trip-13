import FormView from './view/form.js';
import CardView from './view/card.js';

import {waypoints} from './mocks/waypoint.js';
import {generateMenuItems} from './mocks/menu.js';
import {generateFilters} from './mocks/filter.js';
import {render, replace, RenderPosition} from "./utils/render.js"; // add remove
import {OFFERS, DESTINATIONS, WAYPOINT_TYPES} from "./mocks/const.js";
import {isEscapeKey} from "./utils/dom-event.js";

const destinations = DESTINATIONS;
const waypointTypes = WAYPOINT_TYPES;
const offers = OFFERS;

const tripInfoElement = document.querySelector(`.trip-main`);
render(tripInfoElement, new InfoView(waypoints[0].startTime, waypoints[waypoints.length - 1].endTime).getElement(), RenderPosition.AFTERBEGIN);

const tripCostElement = document.querySelector(`.trip-main__trip-info`);
render(tripCostElement, new CostView().getElement(), RenderPosition.BEFOREEND);
render(tripInfoElement, new NewWaypointView().getElement(), RenderPosition.BEFOREEND);

const tripControlsElement = document.querySelector(`.trip-main__trip-controls`);
const filterTabs = generateFilters();
const menuTabs = generateMenuItems();
render(tripControlsElement, new FilterView(filterTabs).getElement(), RenderPosition.AFTERBEGIN);
render(tripControlsElement, new MenuView(menuTabs).getElement(), RenderPosition.AFTERBEGIN);

const tripEventsElement = document.querySelector(`.trip-events`);
render(tripEventsElement, new SortView().getElement(), RenderPosition.AFTERBEGIN);
render(tripEventsElement, new FormView(waypoints[0], destinations, waypointTypes, offers).getElement(), RenderPosition.BEFOREEND);
render(tripEventsElement, new CardsView().getElement(), RenderPosition.AFTEREND);

const tripCardsElement = document.querySelector(`.trip-events__list`);

const renderWaypoint = (waypointListElement, waypoint) => {
  const waypointComponent = new CardView(waypoint);
  const waypointEditComponent = new FormView(waypoint, destinations, waypointTypes, offers);
  const replaceCardToForm = () => {
    replace(waypointEditComponent, waypointComponent);
  };

  const replaceFormToCard = () => {
    replace(waypointComponent, waypointEditComponent);
  };

  const escKeyDownHandler = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      replaceFormToCard();
      document.removeEventListener(`keydown`, escKeyDownHandler);
    }
  };

  waypointComponent.setRollupButtonClickHandler(() => {
    replaceCardToForm();
    document.addEventListener(`keydown`, escKeyDownHandler);
  });


  waypointEditComponent.setSubmitHandler(() => {
    replaceFormToCard();
    document.removeEventListener(`keydown`, escKeyDownHandler);
  });

  render(waypointListElement, waypointComponent.getElement());
};

waypoints.forEach((waypointItem) => renderWaypoint(tripCardsElement, waypointItem));

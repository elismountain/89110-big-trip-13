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
import {render, RenderPosition} from "./utils/render.js";
import {OFFERS, DESTINATIONS, WAYPOINT_TYPES} from "./mocks/const.js"; // CITIES

const destinations = DESTINATIONS;
const waypointTypes = WAYPOINT_TYPES;
const offers = OFFERS;
// const cities = CITIES;

const tripInfoElement = document.querySelector(`.trip-main`);
render(tripInfoElement, new TripInfo(waypoints[0].startTime, waypoints[waypoints.length - 1].endTime).getElement(), RenderPosition.AFTERBEGIN);
const tripCostElement = document.querySelector(`.trip-info__main`);
render(tripCostElement, new TripPrice().getElement(), `afterend`);

const tripControlsElement = document.querySelector(`.trip-main__trip-controls`);
const tripControlsMenuElement = tripControlsElement.querySelector(`h2`);

const menuTabs = generateMenuItems();
render(tripControlsMenuElement, new SiteMenu(menuTabs).getElement(), `afterend`);

const filterTabs = generateFilters();
render(tripControlsElement, new SiteFilter(filterTabs).getElement());
render(tripControlsElement, new WaypointButton(waypoints[0]).getElement(), `afterend`);

const tripEventsElement = document.querySelector(`.trip-events`);
render(tripEventsElement, new SortingTabs().getElement());
render(tripEventsElement, new EditForm(waypoints[0], destinations, waypointTypes, offers).getElement());
render(tripEventsElement, new CreateCardsList().getElement());

const tripCardsElement = document.querySelector(`.trip-events__list`);

const renderTask = (taskListElement, task) => {
  const taskComponent = new CreateCard(task);
  const taskEditComponent = new EditForm(task);
  const replaceCardToForm = () => {
    taskListElement.replaceChild(taskEditComponent.getElement(), taskComponent.getElement());
  };

  const replaceFormToCard = () => {
    taskListElement.replaceChild(taskComponent.getElement(), taskEditComponent.getElement());
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      replaceFormToCard();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  taskComponent.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
    replaceCardToForm();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  taskEditComponent.getElement().querySelector(`form`).addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    replaceFormToCard();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(taskListElement, taskComponent.getElement(), `beforeend`);
};

waypoints.forEach((waypointItem) => renderTask(tripCardsElement, waypointItem));

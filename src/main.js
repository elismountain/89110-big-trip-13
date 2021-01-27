import MenuView from './view/menu.js';
import StatisticsView from './view/statistics.js';
import {remove, render, RenderPosition} from './utils/render.js';
import {isOnline} from './utils/common.js';
import TripPresenter from './presenter/trip.js';
import FilterPresenter from './presenter/filter.js';
import SummaryPresenter from './presenter/summary.js';
import PointsModel from './model/points.js';
import FilterModel from './model/filter.js';
import OffersModel from './model/offers.js';
import DestinationsModel from './model/destinations.js';
// import Api from './api/api.js';
// import Store from './api/store.js';
// import Provider from './api/provider.js';

import {MenuItem, UpdateType, FilterType} from './utils/const.js';



import NewWaypointButtonView from './view/new-waypoint-button.js';
import {generateMenuItems} from './mocks/menu.js';
import {render, RenderPosition} from './utils/render.js';
import {generateWaypoint, getDataForAllEventTypes, getDataForAllOffers, getDataForAllDestinations} from './mocks/waypoint.js';


import WaypointModel from './model/waypoint.js';
import FilterModel from './model/filter.js';
import DataListModel from './model/data-list.js';

// Presenter
const WAYPOINT_COUNT = 20;
const generatedWaypoints = new Array(WAYPOINT_COUNT).fill().map(generateWaypoint);
const waypointTypeInfoMap = getDataForAllEventTypes();
const offerInfoMap = getDataForAllOffers();
const destinationInfoMap = getDataForAllDestinations();








const tripInfoElement = document.querySelector(`.trip-main`);
const tripEventsElement = document.querySelector(`.trip-events`);

const waypointModel = new WaypointModel();
waypointModel.setWaypoints(generatedWaypoints);
const filterModel = new FilterModel();
const offersModel = new OffersModel();
const destinationsModel = new DestinationsModel();

const siteMenuTitleElements = tripInfoElement.querySelectorAll(`.trip-controls h2`);
const [menuContainer, filterContainer] = siteMenuTitleElements;

const menuTabs = generateMenuItems();
render(menuContainer, new MenuView(menuTabs), RenderPosition.AFTEREND);
let statisticsComponent = null;

render(tripInfoElement, new NewWaypointButtonView().getElement(), RenderPosition.BEFOREEND);

const filterPresenter = new FilterPresenter(filterContainer, filterModel);
filterPresenter.init();

const tripPresenter = new TripPresenter(tripInfoElement, tripEventsElement, waypointModel, filterModel, dataListModel);
tripPresenter.init();

document.querySelector(`.trip-main__event-add-btn`).addEventListener(`click`, (event) => {
  event.preventDefault();
  tripPresenter.createEvent();
});

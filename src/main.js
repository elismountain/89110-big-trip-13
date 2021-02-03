import MenuView from './view/menu.js';
import StatisticsView from './view/statistics.js';
import {remove, render, RenderPosition} from './utils/render.js';
import {isOnline} from './utils/common.js';
import {toast} from './utils/toast/toast.js';
import {showOffline, showOnline} from './utils/offline/offline.js';
import TripPresenter from './presenter/trip.js';
import FilterPresenter from './presenter/filter.js';
import SummaryPresenter from './presenter/summary.js';
import WaypointsModel from './model/waypoints.js';
import FilterModel from './model/filter.js';
import OffersModel from './model/offers.js';
import DestinationsModel from './model/destinations.js';
import Api from './api/api.js';
import Store from './api/store.js';
import Provider from './api/provider.js';
import {MenuItem, UpdateType, FilterType} from './utils/const.js';

const AUTHORIZATION = `Basic 073f2bd49c7548f08da34f016fc10691`;
const END_WAYPOINT = `https://13.ecmascript.pages.academy/big-trip`;

const STORE_WAYPOINTS_PREFIX = `bigtrip-localstorage-points`;
const STORE_WAYPOINTS_VER = `v13`;
const STORE_WAYPOINTS_NAME = `${STORE_WAYPOINTS_PREFIX}-${STORE_WAYPOINTS_VER}`;

const STORE_OFFERS_PREFIX = `bigtrip-localstorage-offers`;
const STORE_OFFERS_VER = `v13`;
const STORE_OFFERS_NAME = `${STORE_OFFERS_PREFIX}-${STORE_OFFERS_VER}`;

const STORE_DESTINATIONS_PREFIX = `bigtrip-localstorage-destinations`;
const STORE_DESTINATIONS_VER = `v13`;
const STORE_DESTINATIONS_NAME = `${STORE_DESTINATIONS_PREFIX}-${STORE_DESTINATIONS_VER}`;

const tripInfoElement = document.querySelector(`.trip-main`);
const tripWaypointsElement = document.querySelector(`.trip-events`);
const api = new Api(END_WAYPOINT, AUTHORIZATION);
const storeWaypoints = new Store(STORE_WAYPOINTS_NAME, window.localStorage);
const storeOffers = new Store(STORE_OFFERS_NAME, window.localStorage);
const storeDestinations = new Store(STORE_DESTINATIONS_NAME, window.localStorage);
const apiWithProvider = new Provider(api, storeWaypoints, storeOffers, storeDestinations);
const waypointsModel = new WaypointsModel();
const filterModel = new FilterModel();
const offersModel = new OffersModel();
const destinationsModel = new DestinationsModel();
const siteMenuTitleElements = tripInfoElement.querySelectorAll(`.trip-controls h2`);

const [menuElement, controlElement] = siteMenuTitleElements;

const siteMenuComponent = new MenuView();
let statisticsComponent = null;

const filterPresenter = new FilterPresenter(controlElement, filterModel, waypointsModel);
const summaryPresenter = new SummaryPresenter(tripInfoElement, waypointsModel);
summaryPresenter.init();

const tripPresenter = new TripPresenter(
    tripInfoElement,
    tripWaypointsElement,
    waypointsModel,
    filterModel,
    offersModel,
    destinationsModel,
    apiWithProvider
);

const waypointNewButtonElement = document.querySelector(`.trip-main__event-add-btn`);
waypointNewButtonElement.disabled = true;

waypointNewButtonElement.addEventListener(`click`, (evt) => {
  evt.preventDefault();
  remove(statisticsComponent);
  siteMenuComponent.setItem(MenuItem.TABLE);
  tripPresenter.destroy();
  filterModel.set(UpdateType.MAJOR, FilterType.EVERYTHING);
  tripPresenter.init();
  if (!isOnline()) {
    toast(`You can't create a new point while offline`);
    return;
  }
  tripPresenter.createWaypoint(handleWaypointNewFormClose);
  waypointNewButtonElement.disabled = true;
});

const handleWaypointNewFormClose = () => {
  waypointNewButtonElement.disabled = false;
};

const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.TABLE:
      tripPresenter.init();
      remove(statisticsComponent);
      break;
    case MenuItem.STATISTICS:
      tripPresenter.destroy();
      statisticsComponent = new StatisticsView(waypointsModel.get());
      render(tripWaypointsElement, statisticsComponent, RenderPosition.AFTEREND);
      break;
  }
  siteMenuComponent.setItem(menuItem);
};

siteMenuComponent.setClickHandler(handleSiteMenuClick);

filterPresenter.init();
tripPresenter.init();

const promises = Promise.all([apiWithProvider.getOffers(), apiWithProvider.getDestinations(), apiWithProvider.getWaypoints()]);
promises
.then(([offers, destinations, waypoints]) => {
  offersModel.set(offers);
  destinationsModel.set(destinations);
  waypointsModel.set(UpdateType.INIT, waypoints);
  waypointNewButtonElement.disabled = false;
  render(menuElement, siteMenuComponent, RenderPosition.AFTEREND);
})
.catch(() => {
  waypointsModel.set(UpdateType.INIT, []);
  waypointNewButtonElement.disabled = false;
  render(menuElement, siteMenuComponent, RenderPosition.AFTEREND);
});

window.addEventListener(`load`, () => {
  navigator.serviceWorker.register(`./sw.js`);
});

window.addEventListener(`online`, () => {
  document.title = document.title.replace(` [offline]`, ``);
  showOnline();
  apiWithProvider.sync();
});

window.addEventListener(`offline`, () => {
  document.title += ` [offline]`;
  showOffline();
});

import MenuView from './view/menu.js';
import FilterView from './view/filter.js';
import NewWaypointView from './view/new-waypoint.js';
import {generateMenuItems} from './mocks/menu.js';
import {generateFilters} from './mocks/filter.js';
import {render, RenderPosition} from './utils/render.js';
import {generateWaypoint} from './mocks/waypoint.js';

// Presenter

import TripPresenter from './presenter/trip.js';
const WAYPOINT_COUNT = 20;
const generatedWaypoints = new Array(WAYPOINT_COUNT).fill().map(generateWaypoint);

const tripInfoElement = document.querySelector(`.trip-main`);
const tripEventsElement = document.querySelector(`.trip-events`);

// render menu and filters
const tripControlsElement = document.querySelector(`.trip-main__trip-controls`);
const filterTabs = generateFilters();
const menuTabs = generateMenuItems();
render(tripControlsElement, new FilterView(filterTabs).getElement(), RenderPosition.AFTERBEGIN);
render(tripControlsElement, new MenuView(menuTabs).getElement(), RenderPosition.AFTERBEGIN);
render(tripInfoElement, new NewWaypointView().getElement(), RenderPosition.BEFOREEND);

const tripPresenter = new TripPresenter(tripInfoElement, tripEventsElement);
tripPresenter.init(generatedWaypoints);

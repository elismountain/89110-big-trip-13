import InfoView from './view/info.js';
import MenuView from './view/menu.js';
import CardsView from './view/cards.js';
import SortView from './view/sort.js';
import CostView from './view/cost.js';
import FilterView from './view/filter.js';
import NewWaypointView from './view/new-waypoint.js';
import TripMessage from './view/trip-message.js';
import TripEventListView from './view/trip-event-list.js';
import {render, replace, RenderPosition} from "./utils/render.js";


export default class Trip {
  constructor() {

    this._menuComponent = new MenuView();
    this._filterComponent = new FilterView();
    this._sortComponent = new SortView();
    this._tripMessageComponent = new TripMessage();
    this._tripInfoComponent = new InfoView();
    this._tripCostComponent = new CostView();
    this._cardsComponent = new CardsView();
  }

  init(tripEvents) {
    this._tripEvents = tripEvents;
    this._renderTrip();
  }

  _renderMenu() {

  }

  _renderFilter() {

  }

  _renderSort() {

  }

  _renderEvent() {

  }

  _renderEvents() {

  }

  _renderNoEvents() {

  }

  _renderTripInfo() {

  }

  _renderTripPrice() {

  }

  _renderTrip() {

  this._renderMenu();
  this._renderFilter();

  if (this._tripEvents.length === 0) {
    this._renderNoEvents();
    return;
  }

  this._renderTripInfo();
  this._renderTripPrice();
  this._renderSort();
  this._renderEvents();

}
}

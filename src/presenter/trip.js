import InfoView from './view/info.js';
import MenuView from './view/menu.js';
import CardsView from './view/cards.js';
import SortView from './view/sort.js';
import CostView from './view/cost.js';
import FilterView from './view/filter.js';
import NewWaypointView from './view/new-waypoint.js';
import TripMessage from './view/trip-message.js';
import TripEventListView from './view/trip-event-list.js';


export default class Trip {
  constructor() {

    this._menuComponent = new MenuView();
    this._filterComponent = new FilterView();
    this._sortComponent = new SortView();
    this._noEventComponent = new NoEventView();
    this._tripInfoComponent = new TripInfoView();
    this._tripPriceComponent = new TripPriceView();
    this._eventListComponent = new TripEventListView();
  }

  init(tripEvents) {
    this._tripEvents = tripEvents;
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

  }
}

import SortView from '../view/sort.js';
import TripMessageView from '../view/trip-message.js';
import InfoView from '../view/info.js';
import TripPriceView from '../view/trip-price.js';
import CardsView from '../view/cards.js';
import {render, replace, RenderPosition, remove} from '../utils/render.js';
import {generateSort} from '../mocks/sort.js';
import {updateItem} from '../utils/common.js';
import {SortType} from '../utils/const.js';
import {getTripInfo, getTripPrice, sortWaypointDateAsc, sortWaypointPriceDesc, sortWaypointDurationDesc} from '../utils/event.js';
import WaypointPresenter from '../presenter/waypoint.js';


export default class Trip {
  constructor(tripContainer, waypointContainer) {
    this._tripContainer = tripContainer;
    this._waypointContainer = waypointContainer;

    this._waypointPresenterMap = new Map();

    const sort = generateSort();
    this._sortComponent = new SortView(sort);
    this._currentSortType = SortType.DAY;

    this._tripPriceComponent = null;
    this._tripInfoComponent = null;

    this._tripMessageComponent = new TripMessageView();
    this._cardsListComponent = new CardsView();

    this._handleWaypointChange = this._handleWaypointChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(waypoints, waypointTypeInfoMap, offerInfoMap, destinationInfoMap) {
    this._waypoints = waypoints.slice();
    this._waypointTypeInfoMap = new Map(waypointTypeInfoMap);
    this._offerInfoMap = new Map(offerInfoMap);
    this._destinationInfoMap = new Map(destinationInfoMap);
    this._sortWaypoints();

    this._renderTrip();
  }

  _renderSort() {
    render(this._waypointContainer, this._sortComponent, RenderPosition.AFTERBEGIN);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);

    // const tripEventsElement = document.querySelector(`.trip-events`);
    // render(tripEventsElement, new SortView().getElement(), RenderPosition.AFTERBEGIN);
  }

  _renderWaypoint(waypoint) {
    const waypointPresenter = new WaypointPresenter(this._cardsListComponent, this._handleWaypointChange, this._handleModeChange);
    waypointPresenter.init(waypoint, this._waypointTypeInfoMap, this._offerInfoMap, this._destinationInfoMap);
    this._waypointPresenterMap.set(waypoint.id, waypointPresenter);
  }

  _renderWaypoints() {
    render(this._waypointContainer, this._cardsListComponent, RenderPosition.AFTEREND);
    this._waypoints.forEach((waypoint) => this._renderWaypoint(waypoint));

    // const tripEventsElement = document.querySelector(`.trip-events`);
    // render(tripEventsElement, new CardsView().getElement(), RenderPosition.AFTEREND);

    // const tripCardsElement = document.querySelector(`.trip-events__list`);
    // waypoints.forEach((waypointItem) => renderWaypoint(tripCardsElement, waypointItem));
  }

  _renderTripMessage() {
    render(this._waypointContainer, this._tripMessageComponent, RenderPosition.AFTERBEGIN);

    // const tripEventsElement = document.querySelector(`.trip-events`);
    // render(tripEventsElement, new TripMessageView(), RenderPosition.AFTERBEGIN);
  }

  _renderTripInfo() {
    const tripInfo = getTripInfo(this._waypoints);

    const prevTripInfoComponent = this._tripInfoComponent;
    this._tripInfoComponent = new InfoView(tripInfo);

    if (prevTripInfoComponent === null) {
      render(this._tripContainer, this._tripInfoComponent, RenderPosition.AFTERBEGIN);
      return;
    }

    render(this._tripInfoComponent, this._tripPriceComponent, RenderPosition.BEFOREEND);
    replace(this._tripInfoComponent, prevTripInfoComponent);

    remove(prevTripInfoComponent);

    // const tripInfoElement = document.querySelector(`.trip-main`);
    // render(tripInfoElement, new InfoView(waypoints[0].startTime, waypoints[waypoints.length - 1].endTime).getElement(), RenderPosition.AFTERBEGIN);
  }

  _renderTripPrice() {
    const totalPriceForWaypoints = getTripPrice(this._waypoints);

    const prevTripPriceComponent = this._tripPriceComponent;
    this._tripPriceComponent = new TripPriceView(totalPriceForWaypoints);

    if (prevTripPriceComponent === null) {
      render(this._tripInfoComponent, this._tripPriceComponent, RenderPosition.BEFOREEND);
      return;
    }

    replace(this._tripPriceComponent, prevTripPriceComponent);

    remove(prevTripPriceComponent);

    // const tripCostElement = document.querySelector(`.trip-main__trip-info`);
    // render(tripCostElement, new TripPriceView().getElement(), RenderPosition.BEFOREEND);
  }

  _clearWaypointList() {
    this._waypointPresenterMap.forEach((presenter) => presenter.destroy());
    this._waypointPresenterMap.clear();
  }

  _sortWaypoints() {

    switch (this._currentSortType) {
      case SortType.DAY:
        this._waypoints.sort(sortWaypointDateAsc);
        break;
      case SortType.TIME:
        this._waypoints.sort(sortWaypointDurationDesc);
        break;
      case SortType.PRICE:
        this._waypoints.sort(sortWaypointPriceDesc);
        break;
      default:
        throw new Error(`Invalid sort type ${this._currentSortType}`);
    }
  }

  _handleWaypointChange(updatedWaypoint) {
    this._waypoints = updateItem(this._waypoints, updatedWaypoint);
    this._waypointPresenterMap.get(updatedWaypoint.id).init(updatedWaypoint, this._waypointTypeInfoMap, this._offerInfoMap);

    this._renderTripInfo();
    this._renderTripPrice();
  }

  _handleModeChange() {
    this._waypointPresenterMap.forEach((presenter) => presenter.resetView());
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._sortWaypoints();
    this._clearWaypointList();
    this._renderWaypoints();
  }

  _renderTrip() {
    if (this._waypoints.length === 0) {
      this._renderNoWaypoints();
      return;
    }

    this._renderTripInfo();
    this._renderTripPrice();
    this._renderSort();
    this._renderWaypoints();
  }
}

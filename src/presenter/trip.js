import SortView from '../view/sort.js';
import NoWaypointView from '../view/no-waypoint.js';
import CardsView from '../view/cards.js';
import LoadingView from '../view/loading.js';
import {render, RenderPosition, remove} from '../utils/render.js';
import {sortWaypointDateAsc, sortWaypointPriceDesc, sortWaypointDurationDesc} from '../utils/waypoint.js';
import {filter} from '../utils/filter.js';
import {SortType, UserAction, UpdateType} from '../utils/const.js';
import WaypointPresenter, {State as WaypointPresenterViewState} from '../presenter/waypoint.js';
import WaypointNewPresenter from '../presenter/new-waypoint.js';


export default class Trip {
  constructor(tripContainerElement, waypointContainerElement, waypointsModel, filterModel, offersModel, destinationsModel, api) {
    this._tripContainerElement = tripContainerElement;
    this._waypointContainerElement = waypointContainerElement;
    this._waypointsModel = waypointsModel;
    this._filterModel = filterModel;
    this._offersModel = offersModel;
    this._destinationsModel = destinationsModel;
    this._api = api;

    this._isLoading = true;

    this._waypointPresenterMap = new Map();
    this._currentSortType = SortType.DAY;
    this._sortComponent = null;

    this._noWaypointComponent = new NoWaypointView();
    this._waypointListComponent = new CardsView();
    this._loadingComponent = new LoadingView();

    this._onViewAction = this._onViewAction.bind(this);
    this._onModelEvent = this._onModelEvent.bind(this);
    this._onModeChange = this._onModeChange.bind(this);
    this._onSortTypeChangeHandler = this._onSortTypeChangeHandler.bind(this);

    this._waypointNewPresenter = new WaypointNewPresenter(this._waypointListComponent, this._onViewAction);
  }

  init() {
    this._waypointsModel.attach(this._onModelEvent);
    this._filterModel.attach(this._onModelEvent);

    this._renderTrip();
  }

  createWaypoint(callback) {
    this._waypointNewPresenter.init(this._offersModel, this._destinationsModel, callback);
  }

  destroy() {
    this._clearTrip({resetSortType: true});
    remove(this._pointListComponent);

    this._waypointsModel.detach(this._onModelEvent);
    this._filterModel.detach(this._onModelEvent);
  }

  _getWaypoints() {
    const filterType = this._filterModel.getFilter();
    const waypoints = this._waypointsModel.getWaypoints();
    const filteredWaypoints = filter[filterType](waypoints);

    switch (this._currentSortType) {
      case SortType.DAY:
        return filteredWaypoints.sort(sortWaypointDateAsc);
      case SortType.TIME:
        return filteredWaypoints.sort(sortWaypointDurationDesc);
      case SortType.PRICE:
        return filteredWaypoints.sort(sortWaypointPriceDesc);
      default:
        return filteredWaypoints;
    }
  }

  _renderLoading() {
    render(this._waypointContainerElement, this._loadingComponent, RenderPosition.BEFOREEND);
  }

  _renderSort() {
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }

    this._sortComponent = new SortView(this._currentSortType);
    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChangeHandler);

    render(this.__waypointContainerElement, this._sortComponent, RenderPosition.BEFOREEND);
  }

  _renderPoint(waypoint) {
    const waypointPresenter = new WaypointPresenter(this._pointListComponent, this._onViewAction, this._onModeChange);
    waypointPresenter.init(waypoint, this._offersModel, this._destinationsModel);
    this._pointPresenterMap.set(waypoint.id, waypointPresenter);
  }

  _renderWaypoints(waypoints) {
    waypoints.forEach((waypoint) => this._renderWaypoints(waypoint));
  }

  _renderNoWaypoints() {
    render(this.__waypointContainerElement, this._noWaypointComponent, RenderPosition.AFTERBEGIN);
  }

  _renderTrip() {
    if (this._isLoading) {
      this._renderLoading();
      return;
    }

    const waypoints = this._getWaypoints();

    if (waypoints.length === 0) {
      this._renderNoWaypoints();
      return;
    }

    this._renderSort();
    render(this.__waypointContainerElement, this._pointListComponent, RenderPosition.BEFOREEND);
    this._renderWaypoints(waypoints);
  }

  _clearTrip({resetSortType = false} = {}) {
    this._waypointNewPresenter.destroy();

    this._waypointPresenterMap.forEach((presenter) => presenter.destroy());
    this._waypointPresenterMap.clear();

    remove(this._loadingComponent);
    remove(this._sortComponent);
    remove(this._noWaypointComponent);

    if (resetSortType) {
      this._currentSortType = SortType.DAY;
    }
  }

  _onViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.ADD_POINT:
        this._waypointNewPresenter.setSaving();
        this._api.addWaypoint(update)
        .then((response) => this._waypointsModel.addWaypoint(updateType, response))
        .catch(() => this._waypointNewPresenter.setAborting());
        break;
      case UserAction.UPDATE_POINT:
        this._waypointPresenterMap.get(update.id).setViewState(WaypointPresenterViewState.SAVING);
        this._api.updateWaypoint(update)
        .then((response) => this._waypointsModel.updateWaypoint(updateType, response))
        .catch(() => this._waypointPresenterMap.get(update.id).setViewState(WaypointPresenterViewState.ABORTING));
        break;
      case UserAction.DELETE_POINT:
        this._waypointPresenterMap.get(update.id).setViewState(WaypointPresenterViewState.DELETING);
        this._api.deleteWaypoint(update)
        .then(() => this._waypointsModel.deleteWaypoint(updateType, update))
        .catch(() => this._waypointPresenterMap.get(update.id).setViewState(WaypointPresenterViewState.ABORTING));
        break;
    }
  }

  _onModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._waypointPresenterMap.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this._clearTrip();
        this._renderTrip();
        break;
      case UpdateType.MAJOR:
        this._clearTrip({resetSortType: true});
        this._renderTrip();
        break;
      case UpdateType.INIT:
        this._isLoading = false;
        remove(this._loadingComponent);
        this._renderTrip();
        break;
    }
  }

  _onModeChange() {
    this._waypointNewPresenter.destroy();
    this._waypointPresenterMap.forEach((presenter) => presenter.resetView());
  }

  _onSortTypeChangeHandler(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearTrip();
    this._renderTrip();
  }
}

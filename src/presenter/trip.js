import SortView from '../view/sort.js';
import NoWaypointView from '../view/no-waypoint.js';
import CardsView from '../view/cards.js';
import LoadingView from '../view/loading.js';
import {render, RenderPosition, remove} from '../utils/render.js';
import {sortWaypointDateAsc, sortWaypointPriceDesc, sortWaypointDurationDesc} from '../utils/waypoint.js';
import {filter} from '../utils/filter.js';
import {SortType, UserAction, UpdateType, State as WaypointPresenterViewState} from '../utils/const.js';
import WaypointPresenter from '../presenter/waypoint.js';
import WaypointNewPresenter from '../presenter/new-waypoint.js';

export default class Trip {
  constructor(pageElement, waypointElement, waypointsModel, filterModel, offersModel, destinationsModel, api) {
    this._pageElement = pageElement;
    this._waypointElement = waypointElement;
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
    this._cardsListComponent = new CardsView();
    this._loadingComponent = new LoadingView();

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._waypointNewPresenter = new WaypointNewPresenter(this._cardsListComponent, this._handleViewAction);
  }

  init() {
    render(this._waypointElement, this._cardsListComponent, RenderPosition.BEFOREEND);

    this._waypointsModel.attach(this._handleModelEvent);
    this._filterModel.attach(this._handleModelEvent);

    this._renderAll();
  }

  createWaypoint(callback) {
    this._waypointNewPresenter.init(this._offersModel, this._destinationsModel, callback);
  }

  destroy() {
    this._clearAll({resetSortType: true});
    remove(this._cardsListComponent);

    this._waypointsModel.detach(this._handleModelEvent);
    this._filterModel.detach(this._handleModelEvent);
  }

  _getWaypoints() {
    const filterType = this._filterModel.get();
    const waypoints = this._waypointsModel.get();
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

  _renderSort() {
    if (this._sortComponent !== null) {
      remove(this._sortComponent);
      this._sortComponent = null;
    }
    this._sortComponent = new SortView(this._currentSortType);
    this._sortComponent.setTypeChangeHandler(this._handleSortTypeChange);
    render(this._waypointElement, this._sortComponent, RenderPosition.AFTERBEGIN);
  }

  _renderLoading() {
    render(this._waypointElement, this._loadingComponent, RenderPosition.AFTERBEGIN);
  }

  _renderWaypoint(waypoint) {
    const waypointPresenter = new WaypointPresenter(this._cardsListComponent, this._handleViewAction, this._handleModeChange);
    waypointPresenter.init(waypoint, this._offersModel, this._destinationsModel);
    this._waypointPresenterMap.set(waypoint.id, waypointPresenter);
  }

  _renderWaypoints(waypoints) {
    waypoints.forEach((waypoint) => this._renderWaypoint(waypoint));
  }

  _renderNoWaypoints() {
    render(this._waypointElement, this._noWaypointComponent, RenderPosition.BEFOREEND);
    remove(this._sortComponent);
  }

  _renderAll() {
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
    render(this._waypointElement, this._cardsListComponent, RenderPosition.BEFOREEND);
    this._renderWaypoints(waypoints);
  }

  _clearAll({resetSortType = false} = {}) {
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

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.ADD_POINT:
        this._waypointNewPresenter.setSaving();
        this._api.addWaypoint(update)
        .then((response) => this._waypointsModel.add(updateType, response))
        .catch(() => this._waypointNewPresenter.setAborting());
        break;
      case UserAction.UPDATE_POINT:
        this._waypointPresenterMap.get(update.id).setViewState(WaypointPresenterViewState.SAVING);
        this._api.updateWaypoint(update)
        .then((response) => this._waypointsModel.update(updateType, response))
        .catch(() => this._waypointPresenterMap.get(update.id).setViewState(WaypointPresenterViewState.ABORTING));
        break;
      case UserAction.DELETE_POINT:
        this._waypointPresenterMap.get(update.id).setViewState(WaypointPresenterViewState.DELETING);
        this._api.deleteWaypoint(update)
        .then(() => this._waypointPresenterMap.get(update.id).destroy())
        .catch(() => this._waypointPresenterMap.get(update.id).setViewState(WaypointPresenterViewState.ABORTING));
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._waypointPresenterMap.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this._clearAll();
        this._renderAll();
        break;
      case UpdateType.MAJOR:
        this._clearAll({resetSortType: true});
        this._renderAll();
        break;
      case UpdateType.INIT:
        this._isLoading = false;
        remove(this._loadingComponent);
        this._renderAll();
        break;
    }
  }

  _handleModeChange() {
    this._waypointNewPresenter.destroy();
    this._waypointPresenterMap.forEach((presenter) => presenter.resetView());
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearAll();
    this._renderAll();
  }
}

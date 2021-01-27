import SortView from '../view/sort.js';
import NoPointView from '../view/no-point.js';
import CardsView from '../view/cards.js';
import LoadingView from '../view/loading.js';
import {render, RenderPosition, remove} from '../utils/render.js';
import {sortWaypointDateAsc, sortWaypointPriceDesc, sortWaypointDurationDesc} from '../utils/point.js';
import {filter} from '../utils/filter.js';
import {SortType, UserAction, UpdateType} from '../utils/const.js';
import {getTripInfo, getTripPrice, sortWaypointDateAsc, sortWaypointPriceDesc, sortWaypointDurationDesc} from '../utils/event.js';
import WaypointPresenter, {State as PointPresenterViewState} from '../presenter/waypoint.js';
import WaypointNewPresenter from '../presenter/new-waypoint.js';


export default class Trip {
  constructor(tripContainerElement, waypointContainerElement, waypointModel, filterModel, offersModel, destinationsModel, api) {
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

    this._noPointComponent = new NoPointView();
    this._waypointListComponent = new CardsView();
    this._loadingComponent = new LoadingView();

    this._onViewAction = this._onViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._onModeChange = this._onModeChange.bind(this);
    this._onSortTypeChangeHandler = this._onSortTypeChangeHandler.bind(this);

    this._waypointNewPresenter = new WaypointNewPresenter(this._waypointListComponent, this._onViewAction);
  }

  init() {
    this._waypointsModel.attach(this._handleModelEvent);
    this._filterModel.attach(this._handleModelEvent);

    this._renderTrip();
  }

  createPoint(callback) {
    this._waypointNewPresenter.init(this._offersModel, this._destinationsModel, callback);
  }

  destroy() {
    this._clearTrip({resetSortType: true});
    remove(this._pointListComponent);

    this._waypointsModel.detach(this._handleModelEvent);
    this._filterModel.detach(this._handleModelEvent);
  }

  _getPoints() {
    const filterType = this._filterModel.getFilter();
    const points = this._waypointsModel.getPoints();
    const filteredPoints = filter[filterType](points);

    switch (this._currentSortType) {
      case SortType.DAY:
        return filteredPoints.sort(sortPointDateAsc);
      case SortType.TIME:
        return filteredPoints.sort(sortPointDurationDesc);
      case SortType.PRICE:
        return filteredPoints.sort(sortPointPriceDesc);
      default:
        return filteredPoints;
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

  _renderPoint(point) {
    const pointPresenter = new PointPresenter(this._pointListComponent, this._onViewAction, this._onModeChange);
    pointPresenter.init(point, this._offersModel, this._destinationsModel);
    this._pointPresenterMap.set(point.id, pointPresenter);
  }

  _renderPoints(points) {
    points.forEach((point) => this._renderPoint(point));
  }

  _renderNoPoints() {
    render(this.__waypointContainerElement, this._noPointComponent, RenderPosition.AFTERBEGIN);
  }

  _renderTrip() {
    if (this._isLoading) {
      this._renderLoading();
      return;
    }

    const points = this._getPoints();

    if (points.length === 0) {
      this._renderNoPoints();
      return;
    }

    this._renderSort();
    render(this.__waypointContainerElement, this._pointListComponent, RenderPosition.BEFOREEND);
    this._renderPoints(points);
  }

  _clearTrip({resetSortType = false} = {}) {
    this._waypointNewPresenter.destroy();

    this._waypointPresenterMap.forEach((presenter) => presenter.destroy());
    this._waypointPresenterMap.clear();

    remove(this._loadingComponent);
    remove(this._sortComponent);
    remove(this._noPointComponent);

    if (resetSortType) {
      this._currentSortType = SortType.DAY;
    }
  }

  _onViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.ADD_POINT:
        this._waypointNewPresenter.setSaving();
        this._api.addPoint(update)
        .then((response) => this._waypointsModel.addPoint(updateType, response))
        .catch(() => this._waypointNewPresenter.setAborting());
        break;
      case UserAction.UPDATE_POINT:
        this._waypointPresenterMap.get(update.id).setViewState(PointPresenterViewState.SAVING);
        this._api.updatePoint(update)
        .then((response) => this._waypointsModel.updatePoint(updateType, response))
        .catch(() => this._waypointPresenterMap.get(update.id).setViewState(PointPresenterViewState.ABORTING));
        break;
      case UserAction.DELETE_POINT:
        this._waypointPresenterMap.get(update.id).setViewState(PointPresenterViewState.DELETING);
        this._api.deletePoint(update)
        .then(() => this._waypointsModel.deletePoint(updateType, update))
        .catch(() => this._waypointPresenterMap.get(update.id).setViewState(PointPresenterViewState.ABORTING));
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

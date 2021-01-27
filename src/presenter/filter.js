import FilterView from '../view/filter.js';
import {render, RenderPosition, replace, remove} from '../utils/render.js';
import {FilterType, UpdateType} from '../utils/const.js';
import {filter} from '../utils/filter.js';

export default class Filter {
  constructor(filterContainer, filterModel, waypointModel) {
    this._filterContainer = filterContainer;
    this._filterModel = filterModel;
    this._waypointsModel = waypointsModel;

    this._currentFilter = null;
    this._filterComponent = null;

    this._onModelWaypoint = this._onModelWaypoint.bind(this);
    this._onFilterTypeChange = this._onFilterTypeChange.bind(this);

    this._filterModel.attach(this._onModelWaypoint);
    this._waypointModel.attach(this._onModelWaypoint);
  }

  init() {
    this._currentFilter = this._filterModel.getFilter();

    const prevFilterComponent = this._filterComponent;

    const filters = this._getFilters();
    this._filterComponent = new FilterView(this._currentFilter);
    this._filterComponent.setOnFilterTypeChange(this._onFilterTypeChange);

    if (prevFilterComponent === null) {
      render(this._filterContainer, this._filterComponent, RenderPosition.AFTEREND);
      return;
    }

    replace(this._filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  _getFilters() {
    const waypoints = this._waypointsModel.getPoints();

    return {
      [FilterType.EVERYTHING]: true,
      [FilterType.FUTURE]: filter[FilterType.FUTURE](waypoints).length > 0,
      [FilterType.PAST]: filter[FilterType.PAST](waypoints).length > 0,
    };
  }

  _onFilterTypeChange(filterType) {
    if (this._currentFilter === filterType) {
      return;
    }

    this._currentFilter = filterType;
    this._filterModel.setFilter(UpdateType.MAJOR, this._currentFilter);
  }

  _onModelWaypoint() {
    this.init();
  }
}

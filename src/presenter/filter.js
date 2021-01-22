import FilterView from '../view/filter.js';
import {render, RenderPosition, replace, remove} from '../utils/render.js';
import {UpdateType} from '../utils/const.js';

export default class Filter {
  constructor(filterContainer, filterModel) {
    this._filterContainer = filterContainer;
    this._filterModel = filterModel;

    this._currentFilter = null;
    this._filterComponent = null;


    this._onModelWaypoint = this._onModelWaypoint.bind(this);
    this._onFilterTypeChange = this._onFilterTypeChange.bind(this);

    this._filterModel.attach(this._onModelWaypoint);
  }

  init() {
    this._currentFilter = this._filterModel.getFilter();

    const prevFilterComponent = this._filterComponent;

    this._filterComponent = new FilterView(this._currentFilter);
    this._filterComponent.setOnFilterTypeChange(this._onFilterTypeChange);

    if (prevFilterComponent === null) {
      render(this._filterContainer, this._filterComponent, RenderPosition.AFTEREND);
      return;
    }

    replace(this._filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
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

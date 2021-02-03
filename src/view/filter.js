import AbstractView from "./abstract.js";
import {FilterType} from '../utils/const.js';

const createFilterTemplate = (currentFilterType) => {
  return `<form class="trip-filters" action="#" method="get">
  <div class="trip-filters__filter">
    <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything" ${currentFilterType === FilterType.EVERYTHING ? `checked` : ``}>
    <label class="trip-filters__filter-label" for="filter-everything">Everything</label>
  </div>
  <div class="trip-filters__filter">
    <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future" ${currentFilterType === FilterType.FUTURE ? `checked` : ``}>
    <label class="trip-filters__filter-label" for="filter-future">Future</label>
  </div>
  <div class="trip-filters__filter">
    <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="past" ${currentFilterType === FilterType.PAST ? `checked` : ``}>
    <label class="trip-filters__filter-label" for="filter-past">Past</label>
  </div>
  <button class="visually-hidden" type="submit">Accept filter</button>
</form>`;
};

export default class Filter extends AbstractView {
  constructor(currentFilterType) {
    super();
    this._currentType = currentFilterType;
    this._onTypeChange = this._onTypeChange.bind(this);
  }

  getTemplate() {
    return createFilterTemplate(this._currentType);
  }

  setOnTypeChange(callback) {
    this._callback.changeType = callback;
    this.getElement().addEventListener(`change`, this._onTypeChange);
  }

  _onTypeChange(evt) {
    evt.preventDefault();
    this._callback.changeType(evt.target.value);
  }
}

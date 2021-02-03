import AbstractView from '../view/abstract.js';
import {SortType} from '../utils/const.js';

const createSortTemplate = (currentType) => {
  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    <div class="trip-sort__item  trip-sort__item--day">
      <input id="${SortType.DAY}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="${SortType.DAY}" ${currentType === SortType.DAY ? `checked` : ``}>
      <label class="trip-sort__btn" for="${SortType.DAY}">Day</label>
    </div>
    <div class="trip-sort__item  trip-sort__item--event">
      <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" disabled>
      <label class="trip-sort__btn" for="sort-event">Event</label>
    </div>
    <div class="trip-sort__item  trip-sort__item--time">
      <input id="${SortType.TIME}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="${SortType.TIME}" ${currentType === SortType.TIME ? `checked` : ``}>
      <label class="trip-sort__btn" for="${SortType.TIME}">Time</label>
    </div>
    <div class="trip-sort__item  trip-sort__item--price">
      <input id="${SortType.PRICE}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="${SortType.PRICE}" ${currentType === SortType.PRICE ? `checked` : ``}>
      <label class="trip-sort__btn" for="${SortType.PRICE}">Price</label>
    </div>
    <div class="trip-sort__item  trip-sort__item--offer">
      <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer" disabled>
      <label class="trip-sort__btn" for="sort-offer">Offers</label>
    </div>
  </form>
  `;
};

export default class Sort extends AbstractView {
  constructor(currentType) {
    super();
    this._currentType = currentType;
    this._onTypeChange = this._onTypeChange.bind(this);
  }

  getTemplate() {
    return createSortTemplate(this._currentType);
  }

  setTypeChangeHandler(callback) {
    this._callback.сhangeType = callback;
    this.getElement().addEventListener(`change`, this._onTypeChange);
  }

  _onTypeChange(evt) {
    if (evt.target.tagName !== `INPUT`) {
      return;
    }

    evt.preventDefault();
    this._callback.сhangeType(evt.target.value);
  }
}

import InfoView from '../view/info.js';
import TripPriceView from '../view/trip-price.js';
import {remove, render, RenderPosition} from '../utils/render.js';
import {getTripInfo, getTripPrice} from '../utils/waypoint.js';
import {UpdateType} from '../utils/const.js';


export default class Summary {
  constructor(summaryContainer, waypointsModel) {
    this._summaryContainer = summaryContainer;
    this._waypointsModel = waypointsModel;

    this._infoComponent = null;
    this._priceComponent = null;
    this._isLoading = true;

    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._waypointsModel.attach(this._handleModelEvent);
  }

  init() {
    this._renderInfo();
    this._renderPrice();
  }

  _renderInfo() {
    if (this._infoComponent !== null) {
      remove(this._infoComponent);
      this._infoComponent = null;
    }

    const info = getTripInfo(this._pointsModel.getPoints());
    this._infoComponent = new InfoView(info, this._isLoading);
    render(this._summaryContainer, this._infoComponent, RenderPosition.AFTERBEGIN);
  }


  _renderPrice() {
    if (this._priceComponent !== null) {
      remove(this._priceComponent);
      this._priceComponent = null;
    }

    const total = getTripPrice(this._waypointsModel.getPoints());
    this._priceComponent = new TripPriceView(total);
    render(this._infoComponent, this._priceComponent, RenderPosition.BEFOREEND);
  }

  _handleModelEvent(updateType) {
    switch (updateType) {
      case UpdateType.INIT:
        this._isLoading = false;
        this.init();
        break;
      case UpdateType.MAJOR:
      case UpdateType.MINOR:
        this.init();
        break;
    }
  }
}

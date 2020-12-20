import Abstract from "./abstract.js";

const createNoPointsTemplate = () => {
  return (
    `<p class="trip-events__msg">Click New Event to create your first point</p>`
  );
};

const createLoadingTemplate = () => {
  return (
    `<p class="trip-events__msg">Loading...</p>`
  );
};

export default class TripMessage extends Abstract {
  getTemplate() {
    return createNoPointsTemplate();
  }

  getTemplate() {
    return createLoadingTemplate();
  }
}

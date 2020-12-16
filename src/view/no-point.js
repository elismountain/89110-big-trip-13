import Abstract from "./abstract.js";

const createNoPointsTemplate = () => {
  return (
    `<p class="trip-events__msg">Click New Event to create your first point</p>`
  );
};


export default class NoPoint extends Abstract {
  getTemplate() {
    return createNoPointsTemplate();
  }
}

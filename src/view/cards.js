import Abstract from "./abstract.js";

const createCardsTemplate = () => {
  return (
    `<ul class="trip-events__list"></ul>`
  );
};


export default class Cards extends Abstract {

  getTemplate() {
    return createCardsTemplate();
  }
}

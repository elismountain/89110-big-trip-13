import AbstractView from "./abstract.js";

const createCardsTemplate = () => {
  return (
    `<ul class="trip-events__list"></ul>`
  );
};

export default class Cards extends AbstractView {

  getTemplate() {
    return createCardsTemplate();
  }
}

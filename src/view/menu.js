import {generateMenuItems} from "../mocks/menu.js";

const generateMenuMarkup = generateMenuItems().map((element) => {
  const {title, isChecked} = element;
  return (
    `<a class="trip-tabs__btn ${isChecked ? `trip-tabs__btn--active` : ``}" href="#">${title}</a>`
  );
}).join(`\n`);


export const createMenuTemplate = () => {
  return (
    `<nav class="trip-controls__trip-tabs  trip-tabs">
        ${generateMenuMarkup}
     </nav>`
  );
};

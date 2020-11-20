
import {createCardsTemplate} from './view/cards-template.js';
import {createSortTemplate} from './view/sort.js';
import {createTripInfoTemplate} from './view/trip-info.js';
import {createTripCostTemplate} from './view/trip-cost.js';
import {createEditFormTemplate} from './view/edit-form.js';
import {createCardTemplate} from './view/card.js';
import {createFilterTemplate} from './view/filter.js';
import {createMenuTemplate} from './view/menu.js';
// import {createNewPointTemplate} from './view/new-point.js';

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const tripInfoElement = document.querySelector(`.page-header__logo`);
render(tripInfoElement, createTripInfoTemplate(), `afterend`);

const tripCostElement = document.querySelector(`.trip-main`);
render(tripCostElement, createTripCostTemplate(), `beforeend`);


const tripControlsElement = document.querySelector(`.trip-main__trip-controls`);
render(tripControlsElement, createMenuTemplate(), `beforeend`);

const tripControlsMenuElement = tripControlsElement.querySelector(`h2`);
render(tripControlsMenuElement, createFilterTemplate(), `afterend`);


const tripEventsElement = document.querySelector(`.trip-events`);
render(tripEventsElement, createSortTemplate());
render(tripEventsElement, createEditFormTemplate()); // не поняла нужна ли сейчас большая карточка или нет
render(tripEventsElement, createCardsTemplate());

const tripCardsElement = document.querySelector(`.trip-events__list`);
render(tripCardsElement, createCardTemplate());

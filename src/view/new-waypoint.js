import Abstract from "../utils/abstract.js";

const createNewWaypointTemplate = () => {
  return (
    `<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>`
  );
};


export default class NewWaypoint extends Abstract {
  getTemplate() {
    return createNewWaypointTemplate();
  }
}

import {makeCheckedArray} from "../mocks/random.js";

const MENU_ITEMS = [
  `Table`,
  `Stats`
];

const checkedMenuArray = makeCheckedArray(MENU_ITEMS);

export const generateMenuItems = () => {
  return MENU_ITEMS.map((name, item) => {
    return {
      title: name,
      isChecked: checkedMenuArray[item]
    };
  });
};

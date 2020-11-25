import {makeCheckedArray} from "../util";

const MENU_ITEMS = [
  `Table`,
  `Stats`
];

const checkedMenuArray = makeCheckedArray(MENU_ITEMS);

export const generateMenuItems = () => {
  return MENU_ITEMS.map((name, number) => {
    return {
      title: name,
      isChecked: checkedMenuArray[number]
    };
  });
};

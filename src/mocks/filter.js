import {makeCheckedArray} from "../mocks/random.js";

const FILTERS = [
  `Everything`,
  `Future`,
  `Past`
];

const checkedArray = makeCheckedArray(FILTERS);

export const generateFilters = () => {
  return FILTERS.map((name, number) => {
    return {
      title: name,
      isChecked: checkedArray[number]
    };
  });
};



export const getRandomArrayElement = (arr) => {
  const element = getRandomInteger(0, arr.length - 1);
  return arr[element];
}; // проверить, использую ли еще в дргих местах

export const getRandomArrayElements = (arr, max) => {
  const newArr = arr.filter(() => Math.random() > 0.5).slice(0, max);
  if (newArr.length === 0) {
    newArr.push(arr[0]);
  }
  return newArr;
};

export const makeCheckedArray = (arr) => {
  let checkedArray = [];
  let num = getRandomInteger(0, arr.length - 1);
  arr.forEach((el, number) => {
    if (number === num) {
      checkedArray.push(true);
    } else {
      checkedArray.push(false);
    }
  });
  return checkedArray;
};

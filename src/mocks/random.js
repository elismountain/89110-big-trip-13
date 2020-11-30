export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getRandomArrayElement = (arr) => {
  const element = getRandomInteger(0, arr.length - 1);
  return arr[element];
};

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

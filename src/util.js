export const MS_DAY = 60000;
export const MS_HOUR = 3600000;
export const MS_MIN = 86400000;
export const MONTHS = [`Jan`, `Feb`, `Mar`, `Apr`, `May`, `Jun`, `Jul`, `Aug`, `Sep`, `Oct`, `Nov`, `Dec`];

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getRandomArrayElement = (arr) => {
  const element = getRandomInteger(0, arr.length);
  return arr[element];
};

export const getRandomArrayElements = (arr, max) => {
  const newArr = arr.filter(() => Math.random() > 0.5).slice(0, max);
  if (newArr.length === 0) {
    newArr.push(arr[0]);
  }
  return newArr;
};

export const calculateTimeDifference = (firstDate, secondDate) => {
  let diff = secondDate - firstDate;
  let daysAmount = Math.floor(diff / MS_DAY);
  diff -= daysAmount * MS_DAY;
  let hoursAmount = Math.floor(diff / MS_HOUR);
  diff -= hoursAmount * MS_HOUR;
  let minutesAmount = diff / MS_MIN;
  diff -= minutesAmount * MS_MIN;
  return [daysAmount, hoursAmount, minutesAmount, diff];
};

export const castTimeDateFormat = (value) => {
  return value < 10 ? `0${value}` : String(value);
};

export const formatDateTime = (date) => {
  const day = castTimeDateFormat(date.getDate());
  const month = date.getMonth();
  const year = date.getFullYear();
  const hours = castTimeDateFormat(date.getHours());
  const minutes = castTimeDateFormat(date.getMinutes());
  return `${day}/${month}/${year} ${hours}:${minutes}`;
};

export const makeCheckedArray = (arr) => {
  let checkedArray = [];
  let num = getRandomInteger(0, arr.length);
  arr.forEach((el, number) => {
    if (number === num) {
      checkedArray.push(true);
    } else {
      checkedArray.push(false);
    }
  });
  return checkedArray;
};

// const MS_ = {
//   DAY = 60000,
//   HOUR = 3600000,
//   MIN = 86400000
// };

export const MS_DAY = 60000;
export const MS_HOUR = 3600000;
export const MS_MIN = 86400000;
export const MONTHS = [`Jan`, `Feb`, `Mar`, `Apr`, `May`, `Jun`, `Jul`, `Aug`, `Sep`, `Oct`, `Nov`, `Dec`];

export const calculateTimeDifference = (firstDate, secondDate) => {
  let diff = secondDate - firstDate;
  const daysAmount = Math.floor(diff / MS_DAY);
  diff -= daysAmount * MS_DAY;
  const hoursAmount = Math.floor(diff / MS_HOUR);
  diff -= hoursAmount * MS_HOUR;
  const minutesAmount = diff / MS_MIN;
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

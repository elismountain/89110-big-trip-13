import dayjs from 'dayjs';
import duration from "dayjs/plugin/duration";
dayjs.extend(duration);

export const getDuration = (time) => dayjs.duration(time).$d;

export const castTimeDateFormat = (value) => String(value).padStart(2, `0`);

export const formatDateTime = (date) => {
  const day = castTimeDateFormat(date.getDate());
  const month = date.getMonth();
  const year = date.getFullYear();
  const hours = castTimeDateFormat(date.getHours());
  const minutes = castTimeDateFormat(date.getMinutes());
  return `${day}/${month}/${year} ${hours}:${minutes}`;
};

export const humanizeDate = (currentDate) => {
  return dayjs(currentDate).format(`D MMM`);
};

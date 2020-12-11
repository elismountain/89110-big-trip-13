import dayjs from 'dayjs';
import duration from "dayjs/plugin/duration";
dayjs.extend(duration);

const getDuration = (time) => dayjs.duration(time).$d;

const castTimeDateFormat = (value) => String(value).padStart(2, `0`);

export const formatDateTime = (date) => (date) ? dayjs(date) : dayjs();

export const formatDuration = (time) => {
  const {days, hours, minutes} = getDuration(time);
  let result = ``;
  if (days !== 0) {
    result = castTimeDateFormat(days) + `D ` + castTimeDateFormat(hours) + `H ` + castTimeDateFormat(minutes) + `M`;
  } else if (hours !== 0) {
    result = castTimeDateFormat(hours) + `H ` + castTimeDateFormat(minutes) + `M`;
  } else {
    result = castTimeDateFormat(minutes) + `M`;
  }

  return result;
};

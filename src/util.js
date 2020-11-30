export const castTimeDateFormat = (value) => {
  return value < 10 ? `0${value}` : String(value).padStart(2, `0`);
};

export const formatDateTime = (date) => {
  const day = castTimeDateFormat(date.getDate());
  const month = date.getMonth();
  const year = date.getFullYear();
  const hours = castTimeDateFormat(date.getHours());
  const minutes = castTimeDateFormat(date.getMinutes());
  return `${day}/${month}/${year} ${hours}:${minutes}`;
};

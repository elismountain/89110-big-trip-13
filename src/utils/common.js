const ESC_KEY_CODE = 27;

export const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1)
  ];
};

export const isEscEvent = (evt, action) => {
  if (evt.keyCode === ESC_KEY_CODE) {
    action();
  }
};

export const isOnline = () => {
  return window.navigator.onLine;
};

export const sortByDate = (a, b) => {
  return new Date(a.startTime).getTime() - new Date(b.endTime).getTime();
};

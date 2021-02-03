import "./toast.css";

const SHOW_TIME = 5000;

const toastElement = document.createElement(`div`);
toastElement.classList.add(`toast-container`);
document.body.append(toastElement);

const toast = (message) => {
  const toastItemElement = document.createElement(`div`);
  toastItemElement.textContent = message;
  toastItemElement.classList.add(`toast-item`);

  toastElement.append(toastItemElement);

  setTimeout(() => {
    toastItemElement.remove();
  }, SHOW_TIME);
};

export {toast};

import "./offline.css";

const OFFLINE_MESSAGE = `OFFLINE`;

const offlineMessageElement = document.createElement(`div`);

const showOffline = (message = OFFLINE_MESSAGE) => {
  offlineMessageElement.classList.remove(`visibility-hidden`);
  offlineMessageElement.classList.add(`offline-msg`);
  offlineMessageElement.textContent = message;
  document.body.append(offlineMessageElement);
};

const showOnline = () => {
  offlineMessageElement.classList.remove(`offline-msg`);
  offlineMessageElement.classList.add(`visibility-hidden`);
};

export {showOffline, showOnline};

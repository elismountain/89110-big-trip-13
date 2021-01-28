import "./offline.css";

const OFFLINE_MESSAGE = `OFFLINE`;

const offlineMessage = document.createElement(`div`);

const showOffline = (message = OFFLINE_MESSAGE) => {
  offlineMessage.classList.remove(`visibility-hidden`);
  offlineMessage.classList.add(`offline-msg`);
  offlineMessage.textContent = message;
  document.body.append(offlineMessage);
};

const showOnline = () => {
  offlineMessage.classList.remove(`offline-msg`);
  offlineMessage.classList.add(`visibility-hidden`);
};

export {showOffline, showOnline};

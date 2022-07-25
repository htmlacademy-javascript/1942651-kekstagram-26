import {showAlert} from './util.js';

const FETCH_DATA_URL = 'https://26.javascript.pages.academy/kekstagram/data';
const SEND_DATA_URL = 'https://26.javascript.pages.academy/kekstagram';

const getData = (onSuccess) => {
  fetch(FETCH_DATA_URL)
    .then((response) => response.json())
    .then((photo) => onSuccess(photo))
    .catch(() => {
      showAlert('Не удалось получить изображения. Обновите страницу');
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    SEND_DATA_URL,
    {
      method: 'POST',
      body,
    },
  ).then((response) => {
    if (response.ok) {
      onSuccess();
    } else {
      onFail('Не удалось отправить форму. Попробуйте ещё раз');
    }
  })
    .catch(() => {
      onFail('Не удалось отправить форму. Попробуйте ещё раз');
    });
};

export {getData, sendData};

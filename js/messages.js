const successMessageClone = document.querySelector('#success').content.querySelector('.success');
const successMessage = successMessageClone.cloneNode(true);
const successButton = successMessage.querySelector('.success__button');
const errorMessageClone = document.querySelector('#error').content.querySelector('.error');
const errorMessage = errorMessageClone.cloneNode(true);
const errorButton = errorMessage.querySelector('.error__button');
const body = document.querySelector('body');


// Открытие и закрытие сообщения об удачной отправке
const popupSuccessClose = (evt) => {
  if (evt.KeyCode === 27) {
    evt.preventDefault();
    successModalClose();
  }
};

//Проверка на нажатие на область
const successModalClick = (evt) => {
  if (evt.target.matches('.success')) {
    successModalClose();
  }
};

function successModalOpen () {
  body.append(successMessage);
  body.classList.add('modal-open');
  document.addEventListener('keydown', popupSuccessClose);
  document.addEventListener('click', successModalClick);
  successButton.addEventListener('click', successModalClose);
}

function successModalClose () {
  successMessage.remove();
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', popupSuccessClose);
}


// Открытие и закрытие сообщения о неудачной отправке
const onPopupErrorClose = (evt) => {
  if (evt.KeyCode === 27) {
    evt.preventDefault();
    errorModalClose();
  }
};

const errorModalAreaClick = (evt) => {
  if (evt.target.matches('.error')) {
    errorModalClose();
  }
};

function errorModalOpen () {
  errorMessage.style.zIndex = '99';
  body.append(errorMessage);
  body.classList.add('modal-open');
  document.addEventListener('keydown', onPopupErrorClose);
  document.addEventListener('click', errorModalAreaClick);
  errorButton.addEventListener('click', errorModalClose);
}

function errorModalClose () {
  errorMessage.remove();
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onPopupErrorClose);
}

export {successModalOpen, errorModalOpen};

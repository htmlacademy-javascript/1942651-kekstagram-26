const ESC_KEY_CODE = 27;

const successMessageClone = document.querySelector('#success').content.querySelector('.success');
const successMessage = successMessageClone.cloneNode(true);
const successButton = successMessage.querySelector('.success__button');
const errorMessageClone = document.querySelector('#error').content.querySelector('.error');
const errorMessage = errorMessageClone.cloneNode(true);
const errorButton = errorMessage.querySelector('.error__button');
const body = document.querySelector('body');


const successModalKeydownHadler = (evt) => {
  if (evt.keyCode === ESC_KEY_CODE) {
    evt.preventDefault();
    closeSuccessModal();
  }
};

const successModalClick = (evt) => {
  if (evt.target.matches('.success')) {
    closeSuccessModal();
  }
};

function openSuccessModal () {
  body.append(successMessage);
  body.classList.add('modal-open');
  document.addEventListener('keydown', successModalKeydownHadler);
  document.addEventListener('click', successModalClick);
  successButton.addEventListener('click', closeSuccessModal);
}

function closeSuccessModal () {
  successMessage.remove();
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', successModalKeydownHadler);
}


const errorModalKeydownHandler = (evt) => {
  if (evt.keyCode === ESC_KEY_CODE) {
    evt.preventDefault();
    closeErrorModal();
  }
};

const clickErrorModalArea = (evt) => {
  if (evt.target.matches('.error')) {
    closeErrorModal();
  }
};

function openErrorModal () {
  errorMessage.style.zIndex = '99';
  body.append(errorMessage);
  body.classList.add('modal-open');
  document.addEventListener('keydown', errorModalKeydownHandler);
  document.addEventListener('click', clickErrorModalArea);
  errorButton.addEventListener('click', closeErrorModal);
}

function closeErrorModal () {
  errorMessage.remove();
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', errorModalKeydownHandler);
}

export {openSuccessModal, openErrorModal};

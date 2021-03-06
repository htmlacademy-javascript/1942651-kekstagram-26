import {checkMaxLength, showAlert} from './data.js';
import {sendData} from './api.js';
// import {clearScaleValue, resetEffect} from './filters';
import {successModalOpen, errorModalOpen} from './messages.js';

const uploadInputElement = document.querySelector('.img-upload__input');
const imgOverlay = document.querySelector('.img-upload__overlay');
const closeButtonElement = document.querySelector('.img-upload__cancel');
const form = document.querySelector('.img-upload__form');
const hashtagField = form.querySelector('.text__hashtags');
const commentField = form.querySelector('.text__description');
const submitButton = form.querySelector('.img-upload__submit');
const COMMENT_LENGTH = 140;
const HASH_TAG_REGULAR_EXPRESSION = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;

const resetForm = () => {
  uploadInputElement.value = '';
  hashtagField.value = '';
  commentField.value = '';
};

uploadInputElement.addEventListener('change', () => {
  imgOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
});

closeButtonElement.addEventListener('click', () => {
  document.body.classList.remove('modal-open');
  imgOverlay.classList.add('hidden');
  // form.reset();
  clearScaleValue();
  resetForm();
  resetEffect();
});


export const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'form__error'
}, true);


const validateHashtag = (inputValue) => {
  const arr = inputValue.split(' ');
  return arr.every((element) => HASH_TAG_REGULAR_EXPRESSION.test(element)) || arr[0] === '';
};

const validateHashtagDuplicates = (inputValue) => {
  const arr = inputValue.split(' ');
  const valuesObj = {};

  for (let i = 0; i < arr.length; i++) {
    const value = arr[i].toLowerCase();

    if (value in valuesObj) {
      return false;
    }

    valuesObj[value] = true;

  }
  return true;
};


const validateHashtagsLength = (inputValue) => {
  const arr = inputValue.split(' ');
  return arr.length <= 5;
};


const validateComment = (inputValue) => checkMaxLength(inputValue, COMMENT_LENGTH);


const getCommentErrorText = () => `Длина комментария не должна быть больше ${COMMENT_LENGTH} символов!`;


pristine.addValidator(hashtagField, validateHashtag, 'Хэштег должен начинаться с символа #, не должен иметь спецсимволов, не состоять только из #, длина не больше 20 символов!');
pristine.addValidator(hashtagField, validateHashtagsLength, 'Не больше пяти хэштегов!');
pristine.addValidator(hashtagField, validateHashtagDuplicates, 'Хэштеги не должны повторяться!');
pristine.addValidator(commentField, validateComment, getCommentErrorText);


form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Отправляю...';
};

// Разблокировка кнопки
const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const userFormSubmit = (onSuccess) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(
        () => {
          onSuccess();
          unblockSubmitButton();
          successModalOpen();
        },
        () => {
          showAlert('Не удалось отправить форму. Попробуйте ещё раз');
          unblockSubmitButton();
          errorModalOpen();
        },
        new FormData(evt.target),
      );
    }
  });
};

export {userFormSubmit, closeButtonElement};

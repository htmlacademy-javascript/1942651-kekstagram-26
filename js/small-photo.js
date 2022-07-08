import {photoDescription} from './data.js';
import {openBigPicture} from './big-photo.js';
const similarListElement = document.querySelector('.pictures');
const picture = document.querySelector('#picture').content.querySelector('.picture');

const similarPicture = photoDescription;

const similarPictureFragment = document.createDocumentFragment();

similarPicture.forEach(({url,comments, likes}, index) => {
  const pictureElement = picture.cloneNode(true);
  pictureElement.addEventListener('click', () => openBigPicture(index));
  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  similarPictureFragment.appendChild(pictureElement);
});

similarListElement.appendChild(similarPictureFragment);

import {openBigPhoto} from './big-photo.js';

const picturesElement = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const imageFilterContainer = document.querySelector('.img-filters');

const createPictures = (similarPicture) => {
  const pictureFragment = document.createDocumentFragment();
  similarPicture.forEach((picture) => {
    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = picture.url;
    pictureElement.querySelector('.picture__likes').textContent = picture.likes;
    pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;
    pictureFragment.appendChild(pictureElement);
    pictureElement.addEventListener('click', () => {
      openBigPhoto(picture);
    });
  });
  picturesElement.querySelectorAll('.picture').forEach((element) => {element.remove();});
  picturesElement.appendChild(pictureFragment);
  imageFilterContainer.classList.remove('img-filters--inactive');
};

export {createPictures};

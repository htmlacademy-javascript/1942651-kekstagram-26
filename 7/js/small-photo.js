import {createCommentList} from './big-photo.js';

const similarListElement = document.querySelector('.pictures');
const picture = document.querySelector('#picture').content.querySelector('.picture');
const pictureFragment = document.createDocumentFragment();

const createPictures = (similarPicture) => {
  similarPicture.forEach(({url, likes, comments, description}) => {
    const pictureElement = picture.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;
    pictureFragment.appendChild(pictureElement);
    pictureElement.addEventListener('click', () => {
      createCommentList({url, likes, comments, description});
    });
  });
  similarListElement.appendChild(pictureFragment);
};

export {createPictures};

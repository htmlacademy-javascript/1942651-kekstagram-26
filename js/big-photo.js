import {photoDescription} from './data.js';

const body = document.querySelector('body');
const bigPictureContainer = document.querySelector('.big-picture');
const closeElementButton = bigPictureContainer.querySelector('.big-picture__cancel');
const imgElement = bigPictureContainer.querySelector('.big-picture__img img');
const likesCountElement = bigPictureContainer.querySelector('.likes-count');
const descriptionElement = bigPictureContainer.querySelector('.social__caption');
const commentsListElement = bigPictureContainer.querySelector('.social__comments');
const commentElement = commentsListElement.querySelector('.social__comment');
const commentCountDivElement = bigPictureContainer.querySelector('.social__comment-count');
const commentCountElement = bigPictureContainer.querySelector('.comments-count');
const newCommentLoaderElement = bigPictureContainer.querySelector('.comments-loader');
// const countComents = bigPictureContainer.querySelector('.js__rendered-comments');


const onBigPictureEscKeydown = (evt) => {
  if (evt.keyCode === 27) {
    evt.preventDefault();
    closeBigPicture();
  }
};

// Добавляем комментарии

const createCommentList = (comments) => {
  const commentFragment = document.createDocumentFragment();

  comments.forEach((comment) => {
    const newCommentElement = commentElement.cloneNode(true);
    const photoElement = newCommentElement.querySelector('.social__picture');
    const textElement = newCommentElement.querySelector('.social__text');

    photoElement.src = comment.avatar;
    photoElement.alt = comment.name;
    textElement.textContent = comment.message;

    commentFragment.append(newCommentElement);
  });

  commentsListElement.innerHTML = '';
  commentsListElement.append(commentFragment);
};

const reanderCount = () => {
  for (let i = 0; i <= commentsListElement.length; i++) {
    if (commentsListElement.length > 5) {
      commentCountDivElement.classList.remove('hidden');
      newCommentLoaderElement.classList.remove('hidden');
    }
  }
}


// Заполняем данными большую картинку
const updateBigPicture = (post) => {
  imgElement.src = post.url;
  descriptionElement.textContent = post.description;
  likesCountElement.textContent = post.likes;
  commentCountElement.textContent = post.comments.length;

  createCommentList(post.comments);
};


//Открываем полноразмерную картинку
function openBigPicture (index) {
  const currentPost = photoDescription[index];

  bigPictureContainer.classList.remove('hidden');
  body.classList.add('modal-open');
  commentCountDivElement.classList.add('hidden');
  newCommentLoaderElement.classList.add('hidden');

  document.addEventListener('keydown', onBigPictureEscKeydown);
  updateBigPicture(currentPost);
  reanderCount();

}

function closeBigPicture () {
  bigPictureContainer.classList.add('hidden');
  body.classList.remove('modal-open');

  document.addEventListener('keydown', onBigPictureEscKeydown);
}

closeElementButton.addEventListener('click', () => {
  closeBigPicture ();
});
export {openBigPicture};
export {closeBigPicture};

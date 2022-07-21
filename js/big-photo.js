const body = document.querySelector('body');
const bigPictureContainer = document.querySelector('.big-picture');
const closeElementButton = bigPictureContainer.querySelector('.big-picture__cancel');
const imgElement = bigPictureContainer.querySelector('.big-picture__img img');
const likesCountElement = bigPictureContainer.querySelector('.likes-count');
const descriptionElement = bigPictureContainer.querySelector('.social__caption');
const commentsListElement = bigPictureContainer.querySelector('.social__comments');
const commentElement = commentsListElement.querySelector('.social__comment');
const commentCountDivElement = bigPictureContainer.querySelector('.social__comment-count');
const newCommentLoaderElement = bigPictureContainer.querySelector('.comments-loader');
const maxCommentsValue = 5;


const onPopupEscKeydown = (evt) => {
  if (evt.keyCode === 27) {
    evt.preventDefault();
    bigPictureClose();
  }
};

//Функция открытия окна
function bigPictureOpen () {
  bigPictureContainer.classList.remove('hidden');
  body.classList.add('modal-open');

  document.addEventListener('keydown', onPopupEscKeydown);
}

//Функция закрытия окна
function bigPictureClose () {
  bigPictureContainer.classList.add('hidden');
  body.classList.remove('modal-open');

  document.removeEventListener('keydown', onPopupEscKeydown);
}

// Добавляем комментарии

const createCommentList = ({url, likes, comments, description}) => {
  bigPictureOpen();
  const commentFragment = document.createDocumentFragment();
  imgElement.src = url;
  likesCountElement.textContent = likes;
  descriptionElement.textContent = description;

  let commentsValue = 0;

  //Функция отрисовки комментариев
  const showComment = () => {
    comments.slice(0, commentsValue += maxCommentsValue).forEach(({avatar, name, message}) => {
      const newCommentElement = commentElement.cloneNode(true);
      const photoElement = newCommentElement.querySelector('.social__picture');
      const textElement = newCommentElement.querySelector('.social__text');

      photoElement.src = avatar;
      photoElement.alt = name;
      textElement.textContent = message;

      commentFragment.append(newCommentElement);

    });
    commentsListElement.innerHTML = '';
    commentsListElement.append(commentFragment);
    //Проверка на условие показа кнопки "Загрузить еще"
    if (comments.length <= commentsValue) {
      commentCountDivElement.textContent = `${comments.length} из ${comments.length} комментариев`;
      commentCountDivElement.classList.add('hidden');
      newCommentLoaderElement.classList.add('hidden');
    } else {
      commentCountDivElement.textContent = `${commentsValue} из ${comments.length} комментариев`;
      newCommentLoaderElement.classList.remove('hidden');
    }
  };
  //Выводит первые 5 комментариев
  showComment();

  closeElementButton.addEventListener('click', bigPictureClose);
  newCommentLoaderElement.addEventListener('click', () => showComment());
};
export {createCommentList};

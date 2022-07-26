const COMMENT_PER_STEP_COUNT = 5;
const ESC_KEY_CODE = 27;

const body = document.querySelector('body');
const bigPictureContainer = document.querySelector('.big-picture');
const closeButton = bigPictureContainer.querySelector('.big-picture__cancel');
const imgElement = bigPictureContainer.querySelector('.big-picture__img img');
const likesCountElement = bigPictureContainer.querySelector('.likes-count');
const descriptionElement = bigPictureContainer.querySelector('.social__caption');
const commentsListElement = bigPictureContainer.querySelector('.social__comments');
const commentTemplate = commentsListElement.querySelector('.social__comment');
const commentCountDivElement = bigPictureContainer.querySelector('.social__comment-count');
const loadMoreCommentsButton = bigPictureContainer.querySelector('.comments-loader');


const documentKeydownHandler = (evt) => {
  if (evt.keyCode === ESC_KEY_CODE) {
    evt.preventDefault();
    closeBigPicture();
  }
};

function closeBigPicture () {
  bigPictureContainer.classList.add('hidden');
  body.classList.remove('modal-open');
  commentCountDivElement.innerHTML = '';
  document.removeEventListener('keydown', documentKeydownHandler);
}

let renderedComments;
let currentPicture;

const renderComments = () => {
  renderedComments  += COMMENT_PER_STEP_COUNT;
  commentsListElement.innerHTML = '';

  const { comments } = currentPicture;

  const commentFragment = document.createDocumentFragment();
  comments.slice(0, renderedComments).forEach(({avatar, name, message}) => {
    const comment = commentTemplate.cloneNode(true);
    const photoElement = comment.querySelector('.social__picture');
    photoElement.src = avatar;
    photoElement.alt = name;
    comment.querySelector('.social__text').textContent = message;

    commentFragment.append(comment);
  });
  commentsListElement.append(commentFragment);
  if (comments.length <= renderedComments) {
    commentCountDivElement.textContent = `${comments.length} из ${comments.length} комментариев`;
    commentCountDivElement.classList.add('hidden');
    loadMoreCommentsButton.classList.add('hidden');
  } else {
    commentCountDivElement.textContent = `${renderedComments} из ${comments.length} комментариев`;
    loadMoreCommentsButton.classList.remove('hidden');
  }
};

const loadMoreClickHandler = () => {


  renderComments();
};
const openBigPhoto = (picture) => {
  bigPictureContainer.classList.remove('hidden');
  body.classList.add('modal-open');
  commentCountDivElement.classList.remove('hidden');
  imgElement.src = picture.url;
  likesCountElement.textContent = picture.likes;
  descriptionElement.textContent = picture.description;
  renderedComments = 0;
  currentPicture = picture;

  renderComments();

  closeButton.addEventListener('click', closeBigPicture);
  loadMoreCommentsButton.addEventListener('click', loadMoreClickHandler);
  document.addEventListener('keydown', documentKeydownHandler);
};


export {openBigPhoto};

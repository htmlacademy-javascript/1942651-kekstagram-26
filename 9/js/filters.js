const POST_FILTER_NUMBER = 10;

const imageFiltersContainer = document.querySelector('.img-filters');
const defaultFilterButton = imageFiltersContainer.querySelector('#filter-default');
const randomFilterButton = imageFiltersContainer.querySelector('#filter-random');
const discussedFilterButton = imageFiltersContainer.querySelector('#filter-discussed');

const setActiveFilter = (button) => {
  document.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
  button.classList.add('img-filters__button--active');
};


const shufflePictures = () => Math.random() - 0.5;

const comparePictures = (pictureA, pictureB) => {
  const rankA = pictureA.comments.length;
  const rankB = pictureB.comments.length;
  return rankB - rankA;
};

const setFilters = (pictures, createpictures) => {
  defaultFilterButton.addEventListener('click', (evt) => {
    createpictures(pictures);
    setActiveFilter(evt.target);
  });
  randomFilterButton.addEventListener('click', (evt) => {
    createpictures(pictures
      .slice()
      .sort(shufflePictures)
      .slice(0, POST_FILTER_NUMBER));
    setActiveFilter(evt.target);
  });
  discussedFilterButton.addEventListener('click', (evt) => {
    createpictures(pictures
      .slice()
      .sort(comparePictures));
    setActiveFilter(evt.target);
  });
};

export {setFilters};

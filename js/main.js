import './util.js';
import './form.js';
import './effects.js';
import './messages.js';
import './filters.js';
import './upload-images.js';
import {createPictures} from './small-photo.js';
import {userFormSubmit} from './form.js';
import {closeButtonElement} from './form.js';
import {getData} from './api.js';
import {setFilters} from './filters.js';
import {debounce} from './util.js';

const RERENDER_DELAY = 500;

getData((data) => {
  createPictures(data);
  setFilters(data, debounce(createPictures, RERENDER_DELAY));
});

userFormSubmit(closeButtonElement);

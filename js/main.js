import './big-photo.js';
import './data.js';
import './form.js';
import './filters.js';
import './messages.js';
import {createPictures} from './small-photo.js';
import {userFormSubmit} from './form.js';
import {closeButtonElement} from './form.js';
import {getData} from './api.js';


getData(createPictures);

userFormSubmit(closeButtonElement);

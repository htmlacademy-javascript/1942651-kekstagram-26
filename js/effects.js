const EFFECTS = {
  none: {
    filter: 'none',
    range: {
      min: 0,
      max: 100,
    },
    step: 1,
    start: 100,
    unit : ''
  },
  chrome: {
    filter: 'grayscale',
    range: {
      min: 0,
      max: 1,
    },
    step: 0.1,
    start: 1,
    unit : '',
    connect: 'lower'
  },
  sepia: {
    filter: 'sepia',
    range: {
      min: 0,
      max: 1,
    },
    step: 0.1,
    start: 1,
    unit : '',
    connect: 'lower'
  },
  marvin: {
    filter: 'invert',
    range: {
      min: 0,
      max: 100,
    },
    step: 1,
    start: 100,
    unit : '%',
    connect: 'lower'
  },
  phobos: {
    filter: 'blur',
    range: {
      min: 0,
      max: 3,
    },
    step: 0.1,
    start: 3,
    unit : 'px',
    connect: 'lower'
  },
  heat: {
    filter: 'brightness',
    range: {
      min: 1,
      max: 3,
    },
    step: 0.1,
    start: 3,
    unit : '',
    connect: 'lower'
  }
};

const MIN_SCALE_RANGE = 25;
const MAX_SCALE_RANGE = 100;
const SCALE_STAPE = 25;

const scaleContainer = document.querySelector('.img-upload__scale');
const scaleElement = scaleContainer.querySelector('.scale__control--value');
const photoElement = document.querySelector('.img-upload__preview img');
const effectLevel = document.querySelector('.img-upload__effect-level');
const effectValue = effectLevel.querySelector('.effect-level__value');
const effectSlider = effectLevel.querySelector('.effect-level__slider');
const effectList = document.querySelector('.effects__list');


let scaleValue = MAX_SCALE_RANGE;


const getScaleValue = (value) => {
  scaleElement.value = `${value}%`;
  photoElement.style.transform = `scale(${value * 0.01})`;
};


const clearScaleValue = () => {
  scaleValue = MAX_SCALE_RANGE;
  getScaleValue(MAX_SCALE_RANGE);
  photoElement.style.transform = `scale(${scaleValue * 0.01})`;
};


const scaleClickHandler = (evt) => {
  if (evt.target.matches('.scale__control--smaller') && scaleValue > MIN_SCALE_RANGE) {
    scaleValue -= SCALE_STAPE;
    return getScaleValue(scaleValue);
  }

  if (evt.target.matches('.scale__control--bigger') && scaleValue < MAX_SCALE_RANGE) {
    scaleValue += SCALE_STAPE;
    return getScaleValue(scaleValue);
  }
};

getScaleValue(scaleValue);

scaleContainer.addEventListener('click', scaleClickHandler);

const resetEffect = () => {
  photoElement.style.filter= '';
  photoElement.className = '';
  effectSlider.classList.add('hidden');
};


const effectChangeHandler = (evt) => {
  const currentFilter = evt.target.value;
  effectSlider.classList.remove('hidden');
  effectLevel.classList.remove('hidden');

  if (effectSlider.noUiSlider) {
    effectSlider.noUiSlider.destroy();
  }

  if (currentFilter === 'none') {
    resetEffect();
    effectLevel.classList.add('hidden');
  } else {
    noUiSlider.create(effectSlider, EFFECTS[currentFilter]);
    photoElement.className = `effects__preview--${currentFilter}`;

    effectSlider.noUiSlider.on('update', (values) => {
      photoElement.style.filter = `${EFFECTS[currentFilter].filter}(${values}${EFFECTS[currentFilter].unit})`;
      effectValue.value = parseFloat(values);
    });
  }
};

effectList.addEventListener('change', effectChangeHandler);

export {clearScaleValue, resetEffect};

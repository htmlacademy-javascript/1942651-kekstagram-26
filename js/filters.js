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

const minScaleRange = 25;
const maxScaleRange = 100;
const scaleStep = 25;

const scaleContainer = document.querySelector('.img-upload__scale');
const scaleElement = scaleContainer.querySelector('.scale__control--value');
const photoElement = document.querySelector('.img-upload__preview img');
const effectLevel = document.querySelector('.img-upload__effect-level');
const effectValue = effectLevel.querySelector('.effect-level__value');
const effectSlider = effectLevel.querySelector('.effect-level__slider');
const effectList = document.querySelector('.effects__list');

// Управление масштабом
let scaleValue = maxScaleRange;

//Функция вносит значения масштаба
const getScaleValue = (value) => {
  scaleElement.value = `${value}%`;
  photoElement.style.transform = `scale(${value * 0.01})`;
};

//Функция очищает значения масштаба
const clearScaleValue = () => {
  scaleValue = maxScaleRange;
  getScaleValue(maxScaleRange);
  photoElement.style.transform = `scale(${scaleValue * 0.01})`;
};

// Функция меняет значения масштаба при нажатии на кнопки
const onScaleButtonClick = (evt) => {
  if (evt.target.matches('.scale__control--smaller') && scaleValue > minScaleRange) {
    scaleValue -= scaleStep;
    return getScaleValue(scaleValue);
  }

  if (evt.target.matches('.scale__control--bigger') && scaleValue < maxScaleRange) {
    scaleValue += scaleStep;
    return getScaleValue(scaleValue);
  }
};

getScaleValue(scaleValue);

scaleContainer.addEventListener('click', onScaleButtonClick);


//Функция очистки стилей
const resetEffect = () => {
  photoElement.style.filter= '';
  photoElement.className = '';
  effectSlider.classList.add('hidden');
};

//Функция управления графическими фильтрами
const getPhotoEffect = (evt) => {
  const currentFilter = evt.target.value;
  effectSlider.classList.remove('hidden');

  // Удаление слайдера при переключении вкладок
  if (effectSlider.noUiSlider) {
    effectSlider.noUiSlider.destroy();
  }
  //Скрытие слайдера и очистка стилей у оригинала фото
  if (currentFilter === 'none') {
    resetEffect();
  } else {
    noUiSlider.create(effectSlider, EFFECTS[currentFilter]);
    photoElement.className = `effects__preview--${currentFilter}`;

    effectSlider.noUiSlider.on('update', (values) => {
      photoElement.style.filter = `${EFFECTS[currentFilter].filter}(${values}${EFFECTS[currentFilter].unit})`;
      effectValue.value = parseFloat(values);
    });
  }
};

effectList.addEventListener('change', getPhotoEffect);

export {clearScaleValue, resetEffect};

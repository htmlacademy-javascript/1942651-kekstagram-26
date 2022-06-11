const getSymbol = (numberlength, maxLength) =>{
  if (maxLength > 140) {
    return false;
  } else {
    return true;
  }
};

getSymbol(1, 100);

//https://myrusakov.ru/js-random-numbers.html
const getRandomInRange = (min, max) =>Math.floor(Math.random() * (max - min + 1)) + min;

getRandomInRange();

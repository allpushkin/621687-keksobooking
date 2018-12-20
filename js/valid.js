'use strict';
var typeHouse = document.querySelector('.ad-form select[name=type]');
var price = document.querySelector('.ad-form input[name=price]');

// прослушивание значения инпута, при изменении значения меняются мин. и плейсхолдер
typeHouse.addEventListener('input', function (evt) {
  var targetValue = evt.target.value;
  var priceValue;
  switch (targetValue) {
    case 'bungalo':
      priceValue = 0;
      break;
    case 'flat':
      priceValue = 1000;
      break;
    case 'house':
      priceValue = 5000;
      break;
    case 'palace':
      priceValue = 10000;
      break;
  }
  price.min = priceValue;
  price.placeholder = priceValue;
});

var timeIn = document.querySelector('.ad-form select[name=timein]');
var timeOut = document.querySelector('.ad-form select[name=timeout]');

timeIn.addEventListener('input', function (evt) {
  var targetValue = evt.target.value;
  var timeOutValue;
  switch (targetValue) {
    case '12:00':
      timeOutValue = '12:00';
      break;
    case '13:00':
      timeOutValue = '13:00';
      break;
    case '14:00':
      timeOutValue = '14:00';
      break;
  }
  timeOut.value = timeOutValue;
});

timeOut.addEventListener('input', function (evt) {
  var targetValue = evt.target.value;
  var timeInValue;
  switch (targetValue) {
    case '12:00':
      timeInValue = '12:00';
      break;
    case '13:00':
      timeInValue = '13:00';
      break;
    case '14:00':
      timeInValue = '14:00';
      break;
  }
  timeIn.value = timeInValue;
});

var adForm = document.querySelector('.ad-form');
var title = adForm.querySelector('input[name=title]');


// вот так работает, если слушать отдельные поля, но с косяками.
// но ты писал вешать инвалид на всю форму. тут я видимо что-то делаю не так, потому что в таком случае не работает ничего
title.addEventListener('invalid', function () {
  validTitle();

});

price.addEventListener('invalid', function () {

  validPrice();
});

var validTitle = function () {
  if (title.validity.tooShort) {
    title.setCustomValidity('Минимальная длина заголовка - 30 символов');
  } else if (title.validity.tooLong) {
    title.setCustomValidity('Максимальная длина — 100 символов');
  } else if (title.validity.valueMissing) {
    title.setCustomValidity('Обязательное поле');
  } else {
    title.setCustomValidity('');
  }
};

// а тут вот значения меняются, получается, нужно сюда вставить значение из условий-зависимостей выше ?
var validPrice = function () {
  if (price.validity.rangeUnderflow) {
    price.setCustomValidity('Минимальная цена за ночь');
  } else if (price.validity.rangeOverflow) {
    price.setCustomValidity('Максимальная цена за ночь — 100 символов');
  } else if (price.validity.valueMissing) {
    price.setCustomValidity('Обязательное поле');
  } else {
    price.setCustomValidity('');
  }
};

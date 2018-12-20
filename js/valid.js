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
var timeElements = document.querySelector('.ad-form__element--time');

// прослушиваю fieldset времени, применяется делигирование. при изменении одного из полей, меняется значение другого
timeElements.addEventListener('input', function (evt) {
  var timeElem = evt.target;
  var targetValue = evt.target.value;
  var timeValue;

  switch (targetValue) {
    case '12:00':
      timeValue = '12:00';
      break;
    case '13:00':
      timeValue = '13:00';
      break;
    case '14:00':
      timeValue = '14:00';
      break;
  }
  if (timeElem === timeIn) {
    timeOut.value = timeValue;
  }
  timeIn.value = timeValue;
});

var adForm = document.querySelector('.ad-form');
var title = adForm.querySelector('input[name=title]');

//  событие на время и цену
title.addEventListener('invalid', validTitle);

price.addEventListener('invalid', validPrice);

var validTitle = function () {
  var textError = '';
  if (title.validity.tooShort) {
    textError = 'Минимальная длина заголовка - 30 символов';
  } else if (title.validity.tooLong) {
    textError = 'Максимальная длина — 100 символов';
  } else if (title.validity.valueMissing) {
    textError = 'Обязательное поле';
  }
  title.setCustomValidity(textError);
};

var validPrice = function (evt) {
  var targetMin = evt.price.min;
  var textError = '';
  if (price.validity.rangeUnderflow) {
    textError = 'Минимальная цена за ночь - ' + targetMin;

  } else if (price.validity.rangeOverflow) {
    textError = 'Максимальная цена за ночь — 1000000';

  } else if (price.validity.valueMissing) {
    textError = 'Обязательное поле';

  } else if (!price.validity.typeMismatch) {
    textError = 'Неверный тип значения';
  }
  price.setCustomValidity(textError);

};

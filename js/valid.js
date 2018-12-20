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
  var target = evt.target;
  if (target.value === '12:00') {
    timeOut.value = '12:00';
  } else if (target.value === '13:00') {
    timeOut.value = '13:00';
  } else if (target.value === '14:00') {
    timeOut.value = '14:00';
  }
});

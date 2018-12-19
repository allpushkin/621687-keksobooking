'use strict';
var typeHouse = document.querySelector('.ad-form select[name=type]');
var price = document.querySelector('.ad-form input[name=price]');

// прослушивание значения инпута, при изменении значения меняются мин. и плейсхолдер
typeHouse.addEventListener('input', function (evt) {
  var target = evt.target;
  if (target.value === 'bungalo') {
    price.min = 0;
    price.placeholder = 0;
  } else if (target.value === 'flat') {
    price.min = 1000;
    price.placeholder = 1000;
  } else if (target.value === 'house') {
    price.min = 5000;
    price.placeholder = 5000;
  } else if (target.value === 'palace') {
    price.min = 10000;
    price.placeholder = 10000;
  }
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

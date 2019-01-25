'use strict';
(function () {
  var typeHouse = document.querySelector('.ad-form select[name=type]');
  var price = document.querySelector('.ad-form input[name=price]');

  // прослушивание значения инпута, при изменении значения меняются мин. и плейсхолдер
  var definesTypePrice = function (evt) {
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
  };

  typeHouse.addEventListener('input', definesTypePrice);

  var timeIn = document.querySelector('.ad-form select[name=timein]');
  var timeOut = document.querySelector('.ad-form select[name=timeout]');
  var timeElements = document.querySelector('.ad-form__element--time');

  // прослушиваю fieldset времени, применяется делигирование. при изменении одного из полей, меняется значение другого
  var definesTime = function (evt) {
    var timeElement = evt.target;
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
    if (timeElement === timeIn) {
      timeOut.value = timeValue;
    }
    timeIn.value = timeValue;
  };
  timeElements.addEventListener('input', definesTime);

  var adForm = document.querySelector('.ad-form');
  var title = adForm.querySelector('input[name=title]');
  // валидация заголовка
  var validTitle = function (evt) {
    var target = evt.target;
    var textError = '';
    if (target.validity.tooShort) {
      textError = 'Минимальная длина заголовка - 30 символов';
    } else if (target.validity.tooLong) {
      textError = 'Максимальная длина заголовка — 100 символов';
    } else if (target.validity.valueMissing) {
      textError = 'Обязательное поле';
    }
    target.setCustomValidity(textError);
  };
  // валидация цены
  var validPrice = function (evt) {
    var target = evt.target;
    var targetMin = evt.target.min;
    var textError = '';
    if (target.validity.rangeUnderflow) {
      textError = 'Минимальная цена за ночь - ' + targetMin;
    } else if (target.validity.rangeOverflow) {
      textError = 'Максимальная цена за ночь — 1000000';
    } else if (target.validity.valueMissing) {
      textError = 'Обязательное поле';
    }
    target.setCustomValidity(textError);
  };

  var resetValidation = function () {
    title.setCustomValidity('');
    price.setCustomValidity('');
  };
  var submit = document.querySelector('.ad-form__submit');
  submit.addEventListener('click', resetValidation);

  //  событие на время и цену
  title.addEventListener('invalid', validTitle);

  price.addEventListener('invalid', validPrice);

  var rooms = document.querySelector('.ad-form select[name=rooms]');
  var guests = document.querySelector('.ad-form select[name=capacity]');

  var qtyChangeMap = {
    '3': '3',
    '2': '2',
    '1': '1',
    '100': '0',
    '0': '100'
  };

  var roomsNumberHandler = function () {
    guests.value = qtyChangeMap[rooms.value];
console.log(String(guests.value));
    for (var i = 0; i < guests.length; i++) {

      if (guests.value === '0') {
        guests[i].disabled = guests[i].value === '0' ? false : true;
      } else {
        guests[i].disabled = Number(guests[i].value) > Number(rooms.value) || guests[i].value === '0' ? true : false;
      }
    }
  };

  var guestsHandler = function () {
    rooms.value = qtyChangeMap[guests.value];

    for (var i = 0; i < rooms.length; i++) {
      if(rooms.value === '100') {
        rooms[i].disabled = rooms[i].value === '100' ? false : true;
      } else {
        rooms[i].disabled = Number(rooms[i].value) < Number(guests.value) ? true : false;
      }
    }
  };

  rooms.addEventListener('input',  roomsNumberHandler);
  guests.addEventListener('input', guestsHandler);
})();

'use strict';
(function () {
  var typeHouse = document.querySelector('.ad-form select[name=type]');
  var price = document.querySelector('.ad-form input[name=price]');
  var PRICE_BUNGALO = 0;
  var PRICE_FLAT = 1000;
  var PRICE_HOUSE = 5000;
  var PRICE_PALACE = 10000;
  var MAX_PRICE_HIGHT = 1000000;
  var MIN_LENGHT_TITLE = 30;
  var MAX_LENGHT_TITLE = 100;

  // прослушивание значения инпута, при изменении значения меняются мин. и плейсхолдер
  var definesTypePrice = function (evt) {
    var targetValue = evt.target.value;
    var priceValue;
    switch (targetValue) {
      case 'bungalo':
        priceValue = PRICE_BUNGALO;
        break;
      case 'flat':
        priceValue = PRICE_FLAT;
        break;
      case 'house':
        priceValue = PRICE_HOUSE;
        break;
      case 'palace':
        priceValue = PRICE_PALACE;
        break;
    }
    price.min = priceValue;
    price.placeholder = priceValue;
  };

  typeHouse.addEventListener('change', definesTypePrice);

  var timeIn = document.querySelector('.ad-form select[name=timein]');
  var timeOut = document.querySelector('.ad-form select[name=timeout]');
  var timeElements = document.querySelector('.ad-form__element--time');

  // прослушиваю fieldset времени, применяется делигирование. при изменении одного из полей, меняется значение другого
  var definesTime = function (evt) {
    var timeElement = evt.target;
    var targetValue = evt.target.value;

    if (timeElement === timeIn) {
      timeOut.value = targetValue;
    }
    timeIn.value = targetValue;
  };

  timeElements.addEventListener('change', definesTime);

  var adForm = document.querySelector('.ad-form');
  var title = adForm.querySelector('input[name=title]');
  // валидация заголовка
  var validTitle = function (evt) {
    var target = evt.target;
    var textError = '';
    if (target.validity.tooShort) {
      textError = 'Минимальная длина заголовка - ' + MIN_LENGHT_TITLE + ' символов';
    } else if (target.validity.tooLong) {
      textError = 'Максимальная длина заголовка — ' + MAX_LENGHT_TITLE + ' символов';
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
      textError = 'Максимальная цена за ночь — ' + MAX_PRICE_HIGHT;
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

  var quantityChangeMap = {
    '3': '3',
    '2': '2',
    '1': '1',
    '100': '0',
    '0': '100'
  };

  var roomsNumberHandler = function () {
    guests.value = quantityChangeMap[rooms.value];
    for (var i = 0; i < guests.length; i++) {

      if (guests.value === '0') {
        guests[i].disabled = guests[i].value === '0' ? false : true;
      } else {
        guests[i].disabled = Number(guests[i].value) > Number(rooms.value) || guests[i].value === '0' ? true : false;
      }
    }
  };

  roomsNumberHandler();
  rooms.addEventListener('change', roomsNumberHandler);
})();

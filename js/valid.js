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
    console.log(123);
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

  //  событие на время и цену
  title.addEventListener('invalid', validTitle);

  price.addEventListener('invalid', validPrice);

  var rooms = document.querySelector('.ad-form select[name=rooms]');
  var guest = document.querySelector('.ad-form select[name=capacity]');

  var validGuest = function (evt) {
    var targetValue = evt.target.value;
    var guestValue;
    switch (targetValue) {
      case '1':
        guestValue = 1;
        break;
      case '2':
        guestValue = 2;
        break;
      case '3':
        guestValue = 3;
        break;
      case '100':
        guestValue = 0;
        break;
    }
    guest.value = guestValue;
  };

  var validRooms = function (evt) {
    var targetValue = evt.target.value;
    var roomsValue;
    switch (targetValue) {
      case '1':
        roomsValue = 1;
        break;
      case '2':
        roomsValue = 2;
        break;
      case '3':
        roomsValue = 3;
        break;
      case '0':
        roomsValue = 100;
        break;
    }
    rooms.value = roomsValue;
  };

  rooms.addEventListener('input', validGuest);
  guest.addEventListener('input', validRooms);
})();

'use strict';
(function () {
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

})();

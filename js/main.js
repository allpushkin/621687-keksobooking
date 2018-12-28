'use strict';

// нахожу блок .map
var mapAdverts = document.querySelector('.map');

// map.js
// zadanie 2
var adForm = document.querySelector('.ad-form');
var adFormFieldset = adForm.querySelectorAll('fieldset');

var mapPinMain = document.querySelector('.map__pin--main');
var addressInp = document.querySelector('#address');
var COORDS_X = mapAdverts.offsetWidth / 2;
var COORDS_Y = 375;

var PIN_SIZE_X = 65;
var PIN_SIZE_Y = 84;
var MIN_Y = 130;
var MAX_Y = 630;
// координаты метки при открытии страницы, взял координаты центра метки.
var setCoordinates = function (x, y) {
  var valueX = Math.round(x + PIN_SIZE_X / 2);
  var valueY = Math.round(y + PIN_SIZE_Y);
  addressInp.value = valueX + ', ' + valueY;
};

setCoordinates(COORDS_X, COORDS_Y);
// Добавляет атрибут для неактивного или неактивного состояния
var toggleActivPage = function (isActive) {
  for (var i = 0; i < adFormFieldset.length; i++) {
    adFormFieldset[i].disabled = !isActive;
  }

  adForm.classList[isActive ? 'remove' : 'add']('ad-form--disabled');

  mapAdverts.classList[isActive ? 'remove' : 'add']('map--faded');

  if (isActive) {
    window.pin.removePins();
    // allAds = getAds();
    window.pin.renderPins();
  }
};

toggleActivPage(false);

// переключает страницу в активное состояние
mapPinMain.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  var startCoord = {
    x: evt.clientX,
    y: evt.clientY
  };

  var mouseMoveHandler = function (moveEvt) {
    moveEvt.preventDefault();
    var shift = {
      x: startCoord.x - moveEvt.clientX,
      y: startCoord.y - moveEvt.clientY
    };

    startCoord = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    var dragY = (mapPinMain.offsetTop - shift.y);
    var dragX = (mapPinMain.offsetLeft - shift.x);
    if (dragY <= (MIN_Y - PIN_SIZE_Y)) {
      dragY = (MIN_Y - PIN_SIZE_Y);
    } else if (dragY >= (MAX_Y - PIN_SIZE_Y)) {
      dragY = (MAX_Y - PIN_SIZE_Y);
    }

    if (dragX < 0) {
      dragX = 0;
    } else if (dragX >= (mapAdverts.offsetWidth - PIN_SIZE_X)) {
      dragX = mapAdverts.offsetWidth - PIN_SIZE_X;
    }

    mapPinMain.style.top = dragY + 'px';
    mapPinMain.style.left = dragX + 'px';
    setCoordinates(dragX, dragY);
  };

  toggleActivPage(true);

  var mouseUpHandler = function (upEvt) {
    upEvt.preventDefault();
    document.removeEventListener('mousemove', mouseMoveHandler);
    document.removeEventListener('mouseup', mouseUpHandler);
  };

  document.addEventListener('mousemove', mouseMoveHandler);
  document.addEventListener('mouseup', mouseUpHandler);

});

// var main = document.querySelector('main');
// var successTamplate = document.querySelector('#success').content.querySelector('.success');
// var errorTamplate = document.querySelector('#error').content.querySelector('.error');

// отрисовка сообщения об успешной отправки
/* var renderSuccess = function () {
  var success = successTamplate.cloneNode(true);
  main.appendChild(success);
  removeSuccess();
}; */

// функция слушает события и удаляет из разметки сообщение об успешной отправке
/* var removeSuccess = function () {
  var successElem = main.querySelector('.success');
  var popupEcsPressHandler = function (evt) {
    if (evt.keyCode === 27) {
      main.removeChild(successElem);
    }
  };

  document.addEventListener('click', function () {
    main.removeChild(successElem);
  });

  document.addEventListener('keydown', popupEcsPressHandler);
}; */

// отрисовка сообщения об ошибке при отправке
/* var renderError = function () {
  var error = errorTamplate.cloneNode(true);
  main.appendChild(error);
  removeError();
}; */

// функция слушает события и удаляет из разметки сообщение об ошибке
/* var removeError = function () {
  var errorElem = main.querySelector('.error');
  var errorButton = errorElem.querySelector('.error__button');
  var popupEcsPressHandler = function (evt) {
    if (evt.keyCode === 27) {
      main.removeChild(errorElem);
    }
  };

  document.addEventListener('click', function () {
    main.removeChild(errorElem);
  });

  errorButton.addEventListener('ckick', function () {
    main.removeChild(errorElem);
  });

  document.addEventListener('keydown', popupEcsPressHandler);

}; */

//  Полный сброс до исходного состояния
var totalReset = function () {
  resetForm();

  window.card.remove();

  window.pin.removePins();

  toggleActivPage(false);

  setCoordinates(COORDS_X, COORDS_Y);
};

var resetForm = function () {
  adForm.reset();
};

// прослушивание на кнопку ресет. сброс
var resetButton = document.querySelector('.ad-form__reset');

resetButton.addEventListener('click', function (evt) {
  evt.preventDefault();
  totalReset();
});

var submitButton = document.querySelector('.ad-form__submit');

submitButton.addEventListener('click', function () {
});

'use strict';
(function () {
  // Константы
  var COORDS_X = 570;
  var COORDS_Y = 375;

  var PIN_SIZE_X = 65;
  var PIN_SIZE_Y = 84;
  // min & max of map
  var MIN_Y = 130;
  var MAX_Y = 630;

  // нахожу блок .map
  var mapAdverts = document.querySelector('.map');

  // map.js
  var adForm = document.querySelector('.ad-form');
  var adFormFieldset = adForm.querySelectorAll('fieldset');

  var mapPinMain = document.querySelector('.map__pin--main');
  var addressInp = document.querySelector('#address');


  // координаты метки при открытии страницы, взял координаты центра метки.
  var setCoordinates = function (x, y) {
    var valueX = Math.round(x + PIN_SIZE_X / 2);
    var valueY = Math.round(y + PIN_SIZE_Y);
    addressInp.value = valueX + ', ' + valueY;
  };

  setCoordinates(COORDS_X, COORDS_Y);
  // Добавляет атрибут для активного или неактивного состояния
  var toggleActivPage = function (isActive) {
    for (var i = 0; i < adFormFieldset.length; i++) {
      adFormFieldset[i].disabled = !isActive;
    }

    adForm.classList[isActive ? 'remove' : 'add']('ad-form--disabled');

    mapAdverts.classList[isActive ? 'remove' : 'add']('map--faded');

    if (isActive) {
      window.pin.removePins();
      window.backend.loadData();
    }
  };

  // Начальное состояние
  var isActivePage = false;
  toggleActivPage(isActivePage);

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

    if (!isActivePage) {
      isActivePage = true;
      toggleActivPage(isActivePage);
    }

    var mouseUpHandler = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);

  });

  // Полный сброс до исходного состояния
  var totalReset = function () {
    adForm.reset();

    window.card.remove();

    window.pin.removePins();
    mapPinMain.style.top = COORDS_Y + 'px';
    mapPinMain.style.left = COORDS_X + 'px';
    isActivePage = false;
    toggleActivPage(isActivePage);

    setCoordinates(COORDS_X, COORDS_Y);
  };

  // прослушивание на кнопку ресет. сброс
  var resetButton = document.querySelector('.ad-form__reset');

  resetButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    totalReset();
  });

  var form = document.querySelector('.ad-form');

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(form), window.success.renderSuccess, window.util.renderError);
  });

  window.main = {
    totalReset: totalReset
  };

})();

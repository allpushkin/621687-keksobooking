'use strict';
(function () {
  var ESC = 27;
  var main = document.querySelector('main');
  // var successTamplate = document.querySelector('#success').content.querySelector('.success');
  var errorTamplate = document.querySelector('#error').content.querySelector('.error');
  var renderError = function (messageError) {
    var error = errorTamplate.cloneNode(true);
    error.querySelector('p').innerHTML = messageError;
    main.appendChild(error);
    removeError();
  };


  // функция слушает события и удаляет из разметки сообщение об ошибке
  var removeError = function () {
    var errorElem = main.querySelector('.error');
    var errorButton = errorElem.querySelector('.error__button');
    var closeError = function () {
      main.removeChild(errorElem);
      window.main.totalReset();
      document.removeEventListener('keydown', popupEcsPressHandler);
      document.removeEventListener('click', listenerProvided);
      errorButton.removeEventListener('click', closeError);
    };

    var popupEcsPressHandler = function (evt) {
      if (evt.keyCode === ESC) {
        closeError();
      }
    };

    var listenerProvided = function (evt) {
      var value = evt.target.classList.contains('error');
      if (value) {
        closeError();
      }
    };
    document.addEventListener('click', listenerProvided);

    errorButton.addEventListener('click', closeError);


    document.addEventListener('keydown', popupEcsPressHandler);

  };

  // Функция загрузки данных и фильтрации по кол-ву пинов.
  var render = function (data) {
    var filtresHandler = function () {
      window.filter.updatePins(data);
      //console.log(data);
    };

    var mapFilters = document.querySelector('.map__filters');
    mapFilters.addEventListener('change', filtresHandler);
    window.filter.updatePins(data);
    //console.log(data);
    //console.log(window.filter.updatePins(data));

   };

  window.util = {
    renderError: renderError,
    render: render,
    allAds: []
  };
})();


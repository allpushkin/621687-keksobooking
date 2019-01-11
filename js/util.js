'use strict';
(function () {
  var ESC = 27;
  var ENTER = 13;
  var main = document.querySelector('main');
  // var successTamplate = document.querySelector('#success').content.querySelector('.success');
  var errorTamplate = document.querySelector('#error').content.querySelector('.error');
  var renderError = function (messageError) {
    var error = errorTamplate.cloneNode(true);
    error.querySelector('p').innerHTML = messageError;
    error.querySelector('button').setAttribute('tabindex', 1);
    main.appendChild(error);
    var er = document.querySelector('.error');
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
      document.removeEventListener('keydown', popupEnterPressHandler);
      document.removeEventListener('click', function () {
        closeError();
      });

      errorButton.removeEventListener('click', function () {
        closeError();

      });

    };

    var popupEcsPressHandler = function (evt) {
      if (evt.keyCode === ESC) {
        closeError();
      }
    };
    var popupEnterPressHandler = function (evt) {
      if (evt.keyCode === ENTER) {
        closeError();
      }
    };

    document.addEventListener('click', function () {
      closeError();
    });

    errorButton.addEventListener('click', function () {
      closeError();
    });

    document.addEventListener('keydown', popupEcsPressHandler);
    document.addEventListener('keydown', popupEnterPressHandler);

  };

  window.util = {
    renderError: renderError
  };
})();

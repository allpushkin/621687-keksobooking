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
    main.appendChild(error);
    removeError();
  };


  // функция слушает события и удаляет из разметки сообщение об ошибке
  var removeError = function () {
    var errorElem = main.querySelector('.error');
    var errorButton = errorElem.querySelector('.error__button');
    var closeError = function () {
      main.removeChild(errorElem);
      document.removeEventListener('keydown', popupEcsPressHandler);
      document.removeEventListener('keydown', popupEnterPressHandler);
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

    errorButton.addEventListener('ckick', function () {
      closeError();
      window.main.totalReset();
    });

    document.addEventListener('keydown', popupEcsPressHandler);
    document.addEventListener('keydown', popupEnterPressHandler);

  };

  window.util = {
    renderError: renderError
  };
})();

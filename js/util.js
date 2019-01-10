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
  var popupEcsPressHandler = function (evt) {
    if (evt.keyCode === ESC) {
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

};

  window.util = {
    renderError: renderError
  };
})();

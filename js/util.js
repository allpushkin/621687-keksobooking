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
  var allAds = [];
  var render = function (data) {
    allAds = data;
    var qtyFilter = allAds.length > 5 ? 5 : allAds.length;
    //window.filter.updatePins();
    window.pin.renderPins(allAds, qtyFilter); // вернул временно, для отрисовки пинов. пока не разобрался с модулем фильтров
  };

  window.util = {
    renderError: renderError,
    render: render
  };
})();

'use strict';
(function () {
  var URL = 'https://js.dump.academy/keksobooking/data';
  var STATUS_OK = 200;
  var TIMEOUT = 10000;

  var load = function (loadHandler, errorHandler) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_OK) {
        loadHandler(xhr.response);
      } else {
      errorHandler ('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      errorHandler('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      errorHandler('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT;

    xhr.open('GET', URL);
    xhr.send();
  };

  var loadData = function () {
    load(window.pin.renderPins, window.util.renderError);
  };

  window.backend = {
    loadData: loadData
  };
})();

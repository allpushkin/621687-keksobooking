'use strict';
(function () {
  // нахожу шаблон метки
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var getElement = function (advert, cb) {
    var pinElement = pinTemplate.cloneNode(true);
    pinElement.style.top = advert.location.y + 'px';
    pinElement.style.left = advert.location.x + 'px';

    pinElement.querySelector('img').src = advert.author.avatar;
    pinElement.querySelector('img').alt = advert.offer.title;

    // слушатель на клик
    pinElement.addEventListener('click', function () {
      cb(advert);
    });
    return pinElement;
  };

  window.pin = {
    getElement: getElement
  };
})();


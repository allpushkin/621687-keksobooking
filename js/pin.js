'use strict';
(function () {
  // нахожу шаблон метки
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  // нахожу место, куда вставлять метку
  var pinsMap = document.querySelector('.map__pins');

  var getPinElement = function (advert, cb) {
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

  // отрисовывает метку
  var renderPins = function (allAds) {
    removePins();
    var qtyFilter = allAds.length > 5 ? 5 : allAds.length;
    var pinFragment = document.createDocumentFragment();
    for (var j = 0; j < qtyFilter; j++) {
      pinFragment.appendChild(getPinElement(allAds[j], window.card.render));
    }
    pinsMap.appendChild(pinFragment);
  };


  // проверяет наличие отрисованных пинов на карте
  var removePins = function () {
    var pins = pinsMap.querySelectorAll('.map__pin:not(.map__pin--main)');
    if (pins) {
      for (var i = 0; i < pins.length; i++) {
        pinsMap.removeChild(pins[i]);
      }
    }
  };

  window.pin = {
    renderPins: renderPins,
    removePins: removePins
  };

})();


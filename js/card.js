'use strict';
(function () {
  var ESC_KEYCODE = 27;
  // нахожу шаблон объявления
  var advertTemplate = document.querySelector('#card').content.querySelector('.map__card');
  // нахожу блок .map и удаляю класс
  var mapAdverts = document.querySelector('.map');
  // записывает данные массива в карточку объекта
  var getCardElement = function (advert) {
    var advertElement = advertTemplate.cloneNode(true);
    advertElement.querySelector('.popup__avatar').src = advert.author.avatar;
    advertElement.querySelector('.popup__title').textContent = advert.offer.title;
    advertElement.querySelector('.popup__text--address').textContent = advert.offer.address;
    advertElement.querySelector('.popup__text--price').textContent = advert.offer.price + '₽/ночь';
    advertElement.querySelector('.popup__text--capacity').textContent = advert.offer.rooms + ' комнаты для ' + advert.offer.guests + ' гостей';
    advertElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + advert.offer.checkin + ', выезд до ' + advert.offer.checkout;
    // прежде чем добавлять новые элементы, удаляю все старые дочерние.
    advertElement.querySelector('.popup__features').innerHTML = '';
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < advert.offer.features.length; i++) {
      var featureClass = advert.offer.features[i]; // получаю второй сласс класс в соответствии с шаблоном в виде конкретного элемента массива
      var featureElement = document.createElement('li');
      featureElement.classList.add('popup__feature', 'popup__feature--' + featureClass);
      fragment.appendChild(featureElement);
    }
    advertElement.querySelector('.popup__features').appendChild(fragment);

    advertElement.querySelector('.popup__description').textContent = advert.offer.description;
    // прежде чем добавлять новые элементы, удаляю все старые дочерние
    advertElement.querySelector('.popup__photos').innerHTML = '';
    var photoFragment = document.createDocumentFragment();
    for (var j = 0; j < advert.offer.photos.length; j++) {
      var photoElement = document.createElement('img');
      var photoAddress = advert.offer.photos[j]; // получаю адрес в виде конкретного значения элемента массива
      photoElement.classList.add('popup__photo');
      photoElement.src = photoAddress;
      photoElement.alt = 'Фотография жилья';
      photoElement.width = 45;
      photoElement.height = 40;
      photoFragment.appendChild(photoElement);
    }
    advertElement.querySelector('.popup__photos').appendChild(photoFragment);
    var popupCloseElement = advertElement.querySelector('.popup__close');
    popupCloseElement.addEventListener('click', function () {
      removeCard();
    });
    return advertElement;
  };

  // функция закрытия на еск
  var popupEscPressHandler = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      removeCard();
    }
  };

  var filters = document.querySelector('.map__filters-container');

  var renderCard = function (advert) {
    removeCard();
    mapAdverts.insertBefore(getCardElement(advert), filters);
    document.addEventListener('keydown', popupEscPressHandler);
  };

  var removeCard = function () {
    var сard = mapAdverts.querySelector('.map__card');
    if (сard) {
      mapAdverts.removeChild(сard);
    }
  };

  window.card = {
    render: renderCard,
    remove: removeCard
  };
})();

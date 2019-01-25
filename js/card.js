'use strict';
(function () {
  var ESC_KEYCODE = 27;
  var PHOTO_ELEMENT_WIDTH = 45;
  var PHOTO_ELEMENT_HEIGHT = 40;
  // нахожу шаблон объявления
  var advertTemplate = document.querySelector('#card').content.querySelector('.map__card');
  // нахожу блок .map
  var mapAdverts = document.querySelector('.map');
  // словарь. переводит тип жилья из полученных данных на русский для вставки в карточку
  var typeMap = {
    'bungalo': 'Бунгало',
    'flat': 'Квартира',
    'house': 'Дом',
    'palace': 'Дворец'
  };
  // записывает данные массива в карточку объекта
  var getCardElement = function (advert) {
    var advertElement = advertTemplate.cloneNode(true);
    if (advert.author.avatar) {
      advertElement.querySelector('.popup__avatar').src = advert.author.avatar;
    } else {
      advertElement.querySelector('.popup__avatar').classList.add('hidden');
    }
    if (advert.offer.title) {
      advertElement.querySelector('.popup__title').textContent = advert.offer.title;
    } else {
      advertElement.querySelector('.popup__title').classList.add('hidden');
    }
    if (advert.offer.address) {
      advertElement.querySelector('.popup__text--address').textContent = advert.offer.address;
    } else {
      advertElement.querySelector('.popup__text--address').classList.add('hidden');
    }
    if (advert.offer.price) {
      advertElement.querySelector('.popup__text--price').textContent = advert.offer.price + '₽/ночь';
    } else {
      advertElement.querySelector('.popup__text--price').classList.add('hidden');
    }

    if (advert.offer.type) {
      advertElement.querySelector('.popup__type').textContent = typeMap[advert.offer.type];
    } else {
      advertElement.querySelector('.popup__type').classList.add('hidden');
    }
    if (advert.offer.rooms || advert.offer.guests) {
      advertElement.querySelector('.popup__text--capacity').textContent = advert.offer.rooms + ' комнаты для ' + advert.offer.guests + ' гостей';
    } else {
      advertElement.querySelector('.popup__text--capacity').classList.add('hidden');
    }
    if (advert.offer.checkin || advert.offer.checkout) {
      advertElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + advert.offer.checkin + ', выезд до ' + advert.offer.checkout;
    } else {
      advertElement.querySelector('.popup__text--time').classList.add('hidden');
    }
    // прежде чем добавлять новые элементы, удаляю все старые дочерние.

    advertElement.querySelector('.popup__features').innerHTML = '';
    if (advert.offer.features.length > 0) {
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < advert.offer.features.length; i++) {
        var featureClass = advert.offer.features[i]; // получаю второй сласс класс в соответствии с шаблоном в виде конкретного элемента массива
        var featureElement = document.createElement('li');
        featureElement.classList.add('popup__feature', 'popup__feature--' + featureClass);
        fragment.appendChild(featureElement);
      }
      advertElement.querySelector('.popup__features').appendChild(fragment);
    } else {
      advertElement.querySelector('.popup__features').classList.add('hidden');
    }

    advertElement.querySelector('.popup__description').textContent = advert.offer.description;
    // прежде чем добавлять новые элементы, удаляю все старые дочерние
    advertElement.querySelector('.popup__photos').innerHTML = '';
    if (advert.offer.description) {
      var photoFragment = document.createDocumentFragment();
      for (var j = 0; j < advert.offer.photos.length; j++) {
        var photoElement = document.createElement('img');
        var photoAddress = advert.offer.photos[j]; // получаю адрес в виде конкретного значения элемента массива
        photoElement.classList.add('popup__photo');
        photoElement.src = photoAddress;
        photoElement.alt = 'Фотография жилья';
        photoElement.width = PHOTO_ELEMENT_WIDTH;
        photoElement.height = PHOTO_ELEMENT_HEIGHT;
        photoFragment.appendChild(photoElement);
      }
    } else {
      advertElement.querySelector('.popup__photos').classList.add('hidden');
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

  // отрисовывает карточки в разметку, предварительно проверив нет ли уже другой карточки
  var renderCard = function (advert) {
    removeCard();
    mapAdverts.insertBefore(getCardElement(advert), filters);
    document.addEventListener('keydown', popupEscPressHandler);
  };

  // проверяет наличие карточки в разметке и удаляет её
  var removeCard = function () {
    var card = mapAdverts.querySelector('.map__card');
    if (card) {
      mapAdverts.removeChild(card);
    }
  };

  // экспортирует функции
  window.card = {
    render: renderCard,
    remove: removeCard
  };
})();

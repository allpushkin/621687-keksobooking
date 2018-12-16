'use strict';
// нахожу блок .map и удаляю класс
var mapAdverts = document.querySelector('.map');
// // // mapAdverts.classList.remove('map--faded')
// нахожу шаблон метки
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
// нахожу место, куда вставлять метку
var pinsMap = document.querySelector('.map__pins');
// нахожу шаблон объявления
var advertTemplate = document.querySelector('#card').content.querySelector('.map__card');
// нахожу место, куда вставлять объявление
var advertCard = document.querySelector('.map');
// Фиксированные значения
var titleArr = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
// копирую массив, чтобы передавать в функцию getUniqueItem, забирать ( удалять), по одному значению из массива на каждой итерации в цикле.
var copyTitleArr = titleArr.concat();
var typeArr = ['palace', 'flat', 'house', 'bungalo'];
var featuresArr = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photoArr = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
// максимальное значение координаты х
var offsetWidthMap = mapAdverts.offsetWidth;
// случайное число
var randomInt = function (min, max) {
  return Math.floor(min + Math.random() * (max - min));
};

// возвращает случайный удалённый элемент из массива. на каждой итерации в цикле сокращает массив ( заранее созданную копию) на одно значение.
// arr.splice(randomIndex, 1) - массив из одного элемента, по этому [0] - вернёт значение элемента массива.
var getUniqueItem = function (arr) {
  var randomIndex = randomInt(0, arr.length);
  return arr.splice(randomIndex, 1)[0];
};

// Перемешивает массив. создаю копию (arr.concat), чтобы не менять оригинальный массив
// функция сорт сортирует массив по правилу, которое передаёт функция 0.5 - Math.random()
var mixArr = function (arr) {
  var copyArr = arr.concat();
  return copyArr.sort(function () {
    return 0.5 - Math.random();
  });
};

// возвращает случайное значение из массива
var getRandomItem = function (arr) {
  return arr[randomInt(0, arr.length)];
};

// возвращает массив случайной длинны, со случайными значениями
// создаю копию, получаю случайное количество элементов из копии массива (случайную длинну = count), создаю конечный массив
// на каждой итераци цикла добавляю один новый элемент в массив.  получаю случайный индекс
// получаю один случайный элемент из копии массива ( удаляя его из копии, чтобы  в дальнейшем не повторился), пушу в конечный массив
var getRandomSplice = function (arr) {
  var copyArr = arr.concat();
  var count = randomInt(0, copyArr.length);
  var result = [];
  for (var i = 0; i < count; i++) {
    var randomIndex = randomInt(0, copyArr.length);
    result.push(copyArr.splice(randomIndex, 1)[0]);
  }
  return result;
};

// возвращает массив объектов.
var getAds = function () {
  var ads = [];
  for (var i = 0; i < 8; i++) {
    var x = randomInt(0, offsetWidthMap); // х и у получаю до пуша в массив, т.к. необходимо использовать значения в offer.address
    var y = randomInt(130, 630); // если бы получал в location - в address вставить не получилось бы
    ads.push({
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },
      offer: {
        title: getUniqueItem(copyTitleArr),
        address: x + ', ' + y,
        price: randomInt(1000, 1000000),
        type: getRandomItem(typeArr),
        rooms: randomInt(1, 5),
        guests: randomInt(1, 5),
        checkin: randomInt(12, 14) + ': 00',
        checkout: randomInt(12, 14) + ': 00',
        features: getRandomSplice(featuresArr),
        description: ' ',
        photos: mixArr(photoArr)
      },
      location: {
        x: x,
        y: y
      }
    });
  }
  return ads;
};

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
  return advertElement;
};

var getPinElement = function (advert) {
  var pinElement = pinTemplate.cloneNode(true);
  pinElement.style.top = advert.location.y + 'px';
  pinElement.style.left = advert.location.x + 'px';

  pinElement.querySelector('img').src = advert.author.avatar;
  pinElement.querySelector('img').alt = advert.offer.title;

  pinElement.addEventListener('click', function () {
    renderCard(advert);
  });
  return pinElement;
};


var renderCard = function (advert) {
  var сard = mapAdverts.querySelector('.map__card');
  if (сard) {
    mapAdverts.removeChild(сard);
  } // проверить есть ли ребёнок, прежде чем удалить. ребёнок - карточка.
  advertFragment.appendChild(getCardElement(advert));
  advertCard.insertBefore(advertFragment, filters);
  openCard();
};

var allAds = getAds();
var filters = document.querySelector('.map__filters-container');
// Отрисовывает объявления
var advertFragment = document.createDocumentFragment();
advertFragment.appendChild(getCardElement(allAds[0]));
advertCard.insertBefore(advertFragment, filters);

// отрисовывает метку
var pinFragment = document.createDocumentFragment();
for (var j = 0; j < allAds.length; j++) {
  pinFragment.appendChild(getPinElement(allAds[j]));
}
pinsMap.appendChild(pinFragment);

// zadanie 2
var adForm = document.querySelector('.ad-form');
var adFormFieldset = adForm.querySelectorAll('fieldset');
var mapFilters = document.querySelector('.map__filters');
var mapFiltersSelect = mapFilters.querySelectorAll('select');
var mapFiltersFieldset = mapFilters.querySelectorAll('fieldset');
var mapPinMain = document.querySelector('.map__pin--main');
var addressInp = document.querySelector('#address');
var COORDS_X = mapAdverts.offsetWidth / 2;
var COORDS_Y = 375;
var popup = document.querySelector('.popup');
var mapPin = document.querySelectorAll('.map__pin:not(.map__pin--main)');
var closePopup = popup.querySelector('.popup__close');
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

// координаты метки при открытии страницы, взял координаты центра метки.
var setCoordinates = function (x, y) {
  addressInp.value = x + ', ' + y;
  mapPinMain.style.top = y + 'px';
  mapPinMain.style.left = x + 'px';
};

setCoordinates(COORDS_X, COORDS_Y);
// Добавляет атрибут для неактивного состояния
var addAttributeDis = function () {
  for (var i = 0; i < adFormFieldset.length; i++) {
    adFormFieldset[i].disabled = true;
  }
  for (var y = 0; y < mapFiltersSelect.length; y++) {
    mapFiltersSelect[y].disabled = true;
  }
  for (var x = 0; x < mapFiltersFieldset.length; x++) {
    mapFiltersFieldset[x].disabled = true;
  }
};

addAttributeDis();
// Скрывает попап
popup.classList.add('hidden');
// снимает атрибут
var removeAttributeDis = function () {
  for (var i = 0; i < adFormFieldset.length; i++) {
    adFormFieldset[i].disabled = false;
  }
  for (var y = 0; y < mapFiltersSelect.length; y++) {
    mapFiltersSelect[y].disabled = false;
  }
  for (var x = 0; x < mapFiltersFieldset.length; x++) {
    mapFiltersFieldset[x].disabled = false;
  }
};
// снимает атрибут при клике на метку, устанавливает координаты метки
mapPinMain.addEventListener('mouseup', function (evt) {
  removeAttributeDis();
  mapAdverts.classList.remove('map--faded');

  var coords = {
    x: evt.clientX,
    y: evt.clientY
  };

  addressInp.value = coords.x + ', ' + coords.y;
});

// функция закрытия на еск
var popupEscPressHandler = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeCard();
  }
};

// Обработчик события, открывает попап, добавляет прослушивание на еск
var openCard = function () {
  popup.classList.remove('hidden');
  document.addEventListener('keydown', popupEscPressHandler);
};

// Обработчик события, скрывает попап, удаляет прослушивание на еск
var closeCard = function () {
  popup.classList.add('hidden');
  document.removeEventListener('keydown', popupEscPressHandler);
};

// добавляет прослушивание клика на closePopup перенести в создание карточки
closePopup.addEventListener('click', function () {
  closeCard();
});

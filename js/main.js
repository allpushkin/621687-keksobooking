'use strict';

// нахожу блок .map
var mapAdverts = document.querySelector('.map');
// нахожу место, куда вставлять метку
var pinsMap = document.querySelector('.map__pins');
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

// data.js

// обработчик клика, проверяет есть ли ребёнок ( карточка объявления), если
// есть - удаляет. Отрисовывает карточку метки, открывает её


var allAds = [];

// отрисовывает метку
var renderPins = function () {
  var pinFragment = document.createDocumentFragment();
  for (var j = 0; j < allAds.length; j++) {
    pinFragment.appendChild(window.pin.getElement(allAds[j], window.card.render));
  }
  pinsMap.appendChild(pinFragment);
};
// map.js
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

var PIN_SIZE = 65;

// координаты метки при открытии страницы, взял координаты центра метки.
var setCoordinates = function (x, y) {
  addressInp.value = x + ', ' + y;
  mapPinMain.style.top = (y - PIN_SIZE / 2) + 'px';
  mapPinMain.style.left = (x - PIN_SIZE / 2) + 'px';
};

setCoordinates(COORDS_X, COORDS_Y);
// Добавляет атрибут для неактивного или неактивного состояния
var toggleFormActivation = function (isActive) {
  for (var i = 0; i < adFormFieldset.length; i++) {
    adFormFieldset[i].disabled = !isActive;
  }
  for (var y = 0; y < mapFiltersSelect.length; y++) {
    mapFiltersSelect[y].disabled = !isActive;
  }
  for (var x = 0; x < mapFiltersFieldset.length; x++) {
    mapFiltersFieldset[x].disabled = !isActive;
  }
  adForm.classList[isActive ? 'remove' : 'add']('ad-form--disabled');
};

toggleFormActivation(false);

var toggleMapActivation = function (isActive) {
  mapAdverts.classList[isActive ? 'remove' : 'add']('map--faded');
};
// снимает атрибут при клике на метку, устанавливает координаты метки
mapPinMain.addEventListener('mouseup', function () {
  toggleFormActivation(true);
  toggleMapActivation(true);
  allAds = getAds();
  renderPins();
});


var typeHouse = document.querySelector('.ad-form select[name=type]');
var price = document.querySelector('.ad-form input[name=price]');

// прослушивание значения инпута, при изменении значения меняются мин. и плейсхолде
typeHouse.addEventListener('input', function (evt) {
  var target = evt.target;
  if (target.value === 'bungalo') {
    price.min = 0;
    price.placeholder = 0;
  } else if (target.value === 'flat') {
    price.min = 1000;
    price.placeholder = 1000;
  } else if (target.value === 'house') {
    price.min = 5000;
    price.placeholder = 5000;
  } else if (target.value === 'palace') {
    price.min = 10000;
    price.placeholder = 10000;
  }
});

var timeIn = document.querySelector('.ad-form select[name=timein]');
var timeOut = document.querySelector('.ad-form select[name=timeout]');

timeIn.addEventListener('input', function (evt) {
  var target = evt.target;
  if (target.value === '12:00') {
    timeOut.value = '12:00';
  } else if (target.value === '13:00') {
    timeOut.value = '13:00';
  } else if (target.value === '14:00') {
    timeOut.value = '14:00';
  }
});


var main = document.querySelector('main');
var successTamplate = document.querySelector('#success').content.querySelector('.success');
var errorTamplate = document.querySelector('#error').content.querySelector('.error');

// отрисовка сообщения об успешной отправки
var renderSuccess = function () {
  var success = successTamplate.cloneNode(true);
  main.appendChild(success);
  removeSuccess();
};

// функция слушает события и удаляет из разметки сообщение об успешной отправке
var removeSuccess = function () {
  var successElem = main.querySelector('.success');
  var popupEcsPressHandler = function (evt) {
    if (evt.keyCode === 27) {
      main.removeChild(successElem);
    }
  };

  document.addEventListener('click', function () {
    main.removeChild(successElem);
  });

  document.addEventListener('keydown', popupEcsPressHandler);
};

// отрисовка сообщения об ошибке при отправке
var renderError = function () {
  var error = errorTamplate.cloneNode(true);
  main.appendChild(error);
  removeError();
};

// функция слушает события и удаляет из разметки сообщение об ошибке
var removeError = function () {
  var errorElem = main.querySelector('.error');
  var errorButton = errorElem.querySelector('.error__button');
  var popupEcsPressHandler = function (evt) {
    if (evt.keyCode === 27) {
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

renderError();


'use strict';
(function () {
  var mapAdverts = document.querySelector('.map');
  // Фиксированные значения
  var TITLE_ARR = [
    'Большая уютная квартира',
    'Маленькая неуютная квартира',
    'Огромный прекрасный дворец',
    'Маленький ужасный дворец',
    'Красивый гостевой домик',
    'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде'
  ];
  // копирую массив, чтобы передавать в функцию getUniqueItem, забирать ( удалять), по одному значению из массива на каждой итерации в цикле.
  var copyTitleArr = TITLE_ARR.concat();
  var TYPE_ARR = [
    'palace',
    'flat',
    'house',
    'bungalo'
  ];
  var FEATURES_ARR = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ];
  var PHOTO_ARR = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ];
  // min & max of map
  var MIN_Y = 130;
  var MAX_Y = 630;
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
      var y = randomInt(MIN_Y, MAX_Y); // если бы получал в location - в address вставить не получилось бы
      ads.push({
        author: {
          avatar: 'img/avatars/user0' + (i + 1) + '.png'
        },
        offer: {
          title: getUniqueItem(copyTitleArr),
          address: x + ', ' + y,
          price: randomInt(1000, 1000000),
          type: getRandomItem(TYPE_ARR),
          rooms: randomInt(1, 5),
          guests: randomInt(1, 5),
          checkin: randomInt(12, 14) + ': 00',
          checkout: randomInt(12, 14) + ': 00',
          features: getRandomSplice(FEATURES_ARR),
          description: ' ',
          photos: mixArr(PHOTO_ARR)
        },
        location: {
          x: x,
          y: y
        }
      });
    }
    return ads;
  };
  var allAds = getAds();
  window.data = {
    allAds: allAds,
    MIN_Y: MIN_Y,
    MAX_Y: MAX_Y
  };
})();

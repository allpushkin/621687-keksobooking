var mapAdverts = document.querySelector('.map');
mapAdverts.classList.remove('map--faded'); // удаляю класс

var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');// нахожу шаблон метки
var pinsMap = document.querySelector('.map__pins'); // нахожу место, куда вставлять метку
/* var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin'); - тут без контента копировать? и писать всю разметку внутрь пин? потому что как поменять инлайновые стили и атрибуты img?*/

var advertTemplate = document.querySelector('#card').content.querySelector('.map__card');// нахожу шаблон объявления
var advertCard = document.querySelector('.map');// нахожу место, куда вставлять объявление

var titleArr = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде']
var typeArr = ['palace', 'flat', 'house', 'bungalo'];
var featuresArr = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner']; // фиксированные значения

var randomInt = function (min, max) {
  return Math.floor(min + Math.random() * (max - min)); // случайное число
};

var getRandomItem = function (arr) {
  return arr[randomInt(0, arr.length)]; // случайный элемент массива
} 

var getRandomFeatures = function (arr) {
  featuresArr.length = randomInt(1, arr.length); // случайная длинна массива от 1 до начальной длинны массива
  return featuresArr;
};

var getRandomPhoto = function (arr) {
return randomInt(0, arr.length); //функция для .sort, т.к. в вызове функции при методе .sort, аргументы не передаются.

}; // ещё функция ??

var photoArr = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];


var getAdverts = function () {
  var adverts = [];
  for(var i = 0; i < 8; i++) {   // наполнение масива данными ( допишу, когда разберусь с черновиком массива)

  }
  return adverts;
};


var renderAdvert = function (advert) {                  // записывает данные массива в карточку объекта
  var advertElement = advertTemplate.cloneNode(true);
  advertElement.querySelector('.popup__title').textContent = offer.title;
  advertElement.querySelector('.popup__text--address').textContent = offer.address;
  advertElement.querySelector('.popup__text--price').textContent = offer.price + '₽/ночь';
  advertElement.querySelector('.popup__text--capacity').textContent = offer.rooms + ' комнаты для ' + offer.guests + ' гостей';
  advertElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + offer.checkin', выезд до ' + offer.checkout;
  advertElement.querySelector('.popup__features').textContent = offer.features;
  advertElement.querySelector('.popup__description').textContent = offer.description;
  advertElement.querySelector('.popup__photos').textContent = offer.photos; // не понял как вставить тут. до этого же меняли контент и стили, а сейчас надо создать разметку с атрибутами? что-то я запутался
};

var renderPin = function (pin) {
  var pinElement = pinTemplate.cloneNode(true); // пока тупю по поводу того как правильно найти шаблон и как правильно заполнить
  
};


var arrTest = [
  {
    author: {
    	avatar: 'img/avatars/user' + 0 + randomInt(1, 8) '.png'
    },
    offer: {
    	title: getRandomItem(titleArr),
    	adress: ,
    	price: randomInt(1000, 1000000),
    	type: getRandomItem(typeArr),
    	rooms: randomInt(1, 5),
    	quests: randomInt(1,5), //какой диапазон кол-ва гостей ? 
    	checkin: randomInt(12,14) + ':' + 00 ,
    	checkout: randomInt(12,14) + ':' + 00,
    	features: getRandomItem(featuresArr),
    	description: ' ',
    	photos: photoArr.sort(getRandomPhoto);
    }
    location: {
    	x: ,
    	y: randomInt(130, 630)
    }
  }
]; // черновик массива. для удобства понимания.

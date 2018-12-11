// нахожу блок .map и удаляю класс
var mapAdverts = document.querySelector('.map');
mapAdverts.classList.remove('map--faded'); 
// нахожу шаблон метки
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
// нахожу место, куда вставлять метку
var pinsMap = document.querySelector('.map__pins');
// нахожу шаблон объявления
var advertTemplate = document.querySelector('#card').content.querySelector('.map__card');
// нахожу место, куда вставлять объявление
var advertCard = document.querySelector('.map');
// нахожу блоки, которые затем надо очистить и добавить элементы
var features = document.querySelector('.popup__features');
var photos = document.querySelector('.popup__photos');
//Фиксированные значения
var titleArr = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде']
// копирую массив, чтобы передавать в функцию getUniqueItem, забирать ( удалять), по одному значению из массива на каждой итерации в цикле.
var copyTitleArr = titleArr.concat();
var typeArr = ['palace', 'flat', 'house', 'bungalo'];
var featuresArr = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner']; 
var photoArr = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
// максимальное значение координаты х
var offsetWidthMap = mapAdverts.offsetWidth;
var avatarAdvert = document.querySelector('.popup__avatar');
// случайное число
var randomInt = function (min, max) {
  return Math.floor(min + Math.random() * (max - min)); 
};

// возвращает случайный удалённый элемент из массива. на каждой итерации в цикле сокращает массив ( заранее созданную копию) на одно значение.
//arr.splice(randomIndex, 1) - массив из одного элемента, по этому [0] - вернёт значение элемента массива.
var getUniqueItem = function (arr) {
  var randomIndex = randomInt(0, arr.length);
  return arr.splice(randomIndex, 1)[0]; 
};

//Перемешивает массив. создаю копию (arr.concat), чтобы не менять оригинальный массив. 
//функция сорт сортирует массив по правилу, которое передаёт функция 0.5 - Math.random().
var mixArr = function (arr) {
  copyArr = arr.concat();
  return copyArr.sort(function () {
    return 0.5 - Math.random();
  });
};

// возвращает случайное значение из массива
var getRandomItem = function (arr) {
  return arr[randomInt(0, arr.length)]; 
};

//возвращает массив случайной длинны, со случайными значениями
//создаю копию, получаю случайное количество элементов из копии массива (случайную длинну = count), создаю конечный массив.
//на каждой итераци цикла добавляю один новый элемент в массив.  получаю случайный индекс. 
//получаю один случайный элемент из копии массива ( удаляя его из копии, чтобы  в дальнейшем не повторился), пушу в конечный массив
var getRandomSplice = function(arr) {
  copyArr = arr.concat();
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
  for(var i = 0; i < 8; i++) { 
    var x = randomInt(0, offsetWidthMap); // х и у получаю до пуша в массив, т.к. необходимо использовать значения в offer.address
    var y = randomInt(130, 630); //если бы получал в location - в address вставить не получилось бы
   ads.push ({
    author: {
      avatar: 'img/avatars/user0' + (i + 1) + '.png'
    },
    offer: {
      title: getUniqueItem(copyTitleArr),
      address: x + ', ' + y,
      price: randomInt(1000, 1000000),
      type: getRandomItem(typeArr),
      rooms: randomInt(1, 5),
      quests: randomInt(1,5), 
      checkin: randomInt(12,14) + ':' + 00,
      checkout: randomInt(12,14) + ':' + 00,
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
var renderAdvert = function (advert) {
  var advertElement = advertTemplate.cloneNode(true);
  advertElement.querySelector('.popup__avatar').src = ads[0].avatar;
  advertElement.querySelector('.popup__title').textContent = ads[1].title;
  advertElement.querySelector('.popup__text--address').textContent = ads[1].address;
  advertElement.querySelector('.popup__text--price').textContent = ads[1].price + '₽/ночь';
  advertElement.querySelector('.popup__text--capacity').textContent = ads[1].rooms + ' комнаты для ' + ads[1].guests + ' гостей';
  advertElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + ads[1].checkin + ', выезд до ' + ads[1].checkout;
  // прежде чем добавлять новые элементы, удаляю все старые дочерние.
  features.innerHTML = '';
  var fragment = document.createDocumentFragment();
  for(var i = 0; i < ads[1].features.length; i++ ) {
  var featureClass = ads[1].features[i]; // получаю второй сласс класс в соответствии с шаблоном в виде конкретного элемента массива
  var featureElement = document.createElement('li');
  featureElement.classList.add('popup__feature', 'popup__feature--' + featureClass);
  fragment.appendChild(featureElement);
  }
  features.appendChild(fragment);

  advertElement.querySelector('.popup__description').textContent = ads[1].description; 
  // прежде чем добавлять новые элементы, удаляю все старые дочерние. 
  photos.innerHTML = '';
  var photoFragment = document.createDocumentFragment();
  for(var i = 0; i < ads[1].photos.length; i++) {
    var photoElement = document.createElement('img');
    var photoAddress = ads[1].photos[i]; // получаю адрес в виде конкретного значения элемента массива
    photoElement.classList.add('popup__photo');
    photoElement.src = photoAddress;
    photoElement.alt = 'Фотография жилья';
    photoElement.width = 45;
    photoElement.height = 40;
    photoFragment.appendChild(photoElement);
  }
  photos.appendChild(photoFragment);
};

var renderPin = function (pin) {
  var pinElement = pinTemplate.cloneNode(true);
  pinElement.style = 'left: ' + ads[2].x + 'px;' + ' top: ' + ads[2].y + 'px;';
  pinElement.querySelector('img').src = ads[0].avatar;
  pinElement.querySelector('img').alt = ads[1].title;
};

var allAds = getAds();

// Отрисовывает объявления
var advertFragment = document.createDocumentFragment();
for (var i = 0; i < getAds.length; i++) {
  advertFragment.appendChild(renderAdvert(allAds[i])); 
}
advertCard.appendChild(advertFragment);

// отрисовывает метку
var pinFragment = document.createDocumentFragment();
for (var i = 0; i < getAds.length; i++) {
  pinFragment.appendChild(renderPin(allAds[i]));
}
pinsMap.appendChild(pinFragment);


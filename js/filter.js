'use strict';
(function () {
  var mapFilters = document.querySelector('.map__filters');
  var typeFilters = mapFilters.querySelector('#housing-type');
  var priceFilters = mapFilters.querySelector('#housing-price');
  var roomsFilters = mapFilters.querySelector('#housing-rooms');
  var guestsFilters = mapFilters.querySelector('#housing-guests');
  var features = mapFilters.querySelector('#housing-features');

  var updatePins = function (allAds) {
    var filtredAds = allAds;
    if (typeFilters.value !== 'any') {
      filtredAds = allAds.filter(function (it) {
        return it.offer.type === typeFilters.value;
      });
    }

    if (priceFilters.value !== 'any') {
      filtredAds = filtredAds.filter(function (it) {
        if (priceFilters.value === 'low') {
          return it.offer.price < 10000;
        } else if (priceFilters.value === 'middle') {
          return it.offer.price > 10000 && it.offer.price < 50000;
        } else if (priceFilters.value === 'high') {
          return it.offer.price > 50000;
        }
        return it;
      });
    }

    if (roomsFilters.value !== 'any') {
      filtredAds = filtredAds.filter(function (it) {
        return it.offer.rooms == roomsFilters.value;
      });
    }

    if (guestsFilters.value !== 'any') {
      filtredAds = filtredAds.filter(function (it) {
        return it.offer.guests == guestsFilters.value;
      });
    }

    var checked = features.querySelectorAll('input:checked');

    var t = Array.from(checked);
    var test = t.map(function (element) {
      return element.value;
    });

    filtredAds = filtredAds.filter(function (it) {
      var count = 0;
      test.forEach(function (el) {
        count += it.offer.features.indexOf(el) > -1 ? 1 : 0;

      });
      console.log(count);
      return count === test.length;
    });

    var qtyFilter = filtredAds.length > 5 ? 5 : filtredAds.length;
    window.pin.renderPins(filtredAds, qtyFilter);
  };

  // Функция загрузки данных и фильтрации по кол-ву пинов.
  var render = function (data) {
    var filtresHandler = function () {
      window.filter.updatePins(data);
    };

    mapFilters.addEventListener('change', filtresHandler);
    window.filter.updatePins(data);
  };

  window.filter = {
    updatePins: updatePins,
    render: render
  };
})();

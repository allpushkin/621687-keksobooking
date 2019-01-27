'use strict';
(function () {
  var PRICE_MIN = 10000;
  var PRICE_MAX = 50000;
  var MAX_QUANTITY_PINS = 5;
  var DEBOUNCE_INTERVAL = 500;
  var mapFilters = document.querySelector('.map__filters');
  var typeFilters = mapFilters.querySelector('#housing-type');
  var priceFilters = mapFilters.querySelector('#housing-price');
  var roomsFilters = mapFilters.querySelector('#housing-rooms');
  var guestsFilters = mapFilters.querySelector('#housing-guests');
  var featuresFilters = mapFilters.querySelector('#housing-features');

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
          return it.offer.price < PRICE_MIN;
        } else if (priceFilters.value === 'middle') {
          return it.offer.price > PRICE_MIN && it.offer.price < PRICE_MAX;
        } else if (priceFilters.value === 'high') {
          return it.offer.price > PRICE_MAX;
        }
        return it;
      });
    }

    if (roomsFilters.value !== 'any') {
      filtredAds = filtredAds.filter(function (it) {
        return it.offer.rooms === +roomsFilters.value;
      });
    }

    if (guestsFilters.value !== 'any') {
      filtredAds = filtredAds.filter(function (it) {
        return it.offer.guests === +guestsFilters.value;
      });
    }

    var checkedInputsFeatures = featuresFilters.querySelectorAll('input:checked');

    var arrayInputsFeatures = Array.from(checkedInputsFeatures);
    var valueInputsFeatures = arrayInputsFeatures.map(function (element) {
      return element.value;
    });

    filtredAds = filtredAds.filter(function (it) {
      var count = 0;
      valueInputsFeatures.forEach(function (el) {
        count += it.offer.features.indexOf(el) > -1 ? 1 : 0;

      });
      return count === valueInputsFeatures.length;
    });

    var quantityFilter = filtredAds.length > MAX_QUANTITY_PINS ? MAX_QUANTITY_PINS : filtredAds.length;
    window.pin.renderPins(filtredAds, quantityFilter);
  };

  // Функция загрузки данных и фильтрации по кол-ву пинов.
  var renderFilteredPins = function (data) {
    var filtresHandler = function () {
      window.card.remove();
      var lastTimeout;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        window.filter.updatePins(data);
      }, DEBOUNCE_INTERVAL);
    };

    mapFilters.addEventListener('change', filtresHandler);
    window.filter.updatePins(data);
  };

  window.filter = {
    updatePins: updatePins,
    renderFilteredPins: renderFilteredPins
  };
})();

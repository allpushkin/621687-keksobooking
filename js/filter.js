'use strict';
(function () {
  var mapFilters = document.querySelector('.map__filters');
  var typeFilters = mapFilters.querySelector('#housing-type');

  var updatePins = function (allAds) {
    var filtredAds = allAds;
    if (typeFilters.value !== 'any') {
      filtredAds = allAds.filter(function (it) {
        return it.offer.type === typeFilters.value;
      });
    }

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
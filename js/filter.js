'use strict';
(function () {
  var mapFilters = document.querySelector('.map__filters');
  var typeFilters = mapFilters.querySelector('#housing-type');

  var updatePins = function (allAds) {
    var filtredAds = allAds;
    if (typeFilters.value !== 'any') {
      var filtredAds = allAds.filter(function(it) {
        return it.offer.type === typeFilters.value;
      });
    }

    var qtyFilter = filtredAds.length > 5 ? 5 : filtredAds.length;
    window.pin.renderPins(filtredAds, qtyFilter);
  };

  window.filter = {
    updatePins: updatePins
  };
})();

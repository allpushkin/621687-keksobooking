'use strict';
(function () {
  var mapFilters = document.querySelector('.map__filters');
  var typeFilters = mapFilters.querySelector('#housing-type');

  mapFilters.addEventListener('input', function (evt) {
    typeFilters.value = evt.target.value;
    updatePins();
  });


  var getRank = function (ads) {
    var rank = 0;

    if (ads.advert.offer.type === typeFilters.value) {
      rank += 1
    }

    return rank;
  };

  var updatePins = function () {
    window.pin.renderPins(allAds.sort(function (left, right) {
      return getRank(right) - getRank(left);
    }), qtyFilter);
  };

  window.filter = {
    updatePins: updatePins
  };
})();

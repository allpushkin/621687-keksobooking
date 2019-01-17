'use strict';
(function () {
  var mapFilters = document.querySelector('.map__filters');
  var typeFilters = mapFilters.querySelector('#housing-type');

  mapFilters.addEventListener('input', function (evt) {
    typeFilters.value = evt.target.value;
    updatePins(window.util.allAds);
  });


  var getRank = function (advert) {
    var rank = 0;

    if (advert.offer.type === typeFilters.value) {
      rank += 1;
    }

    return rank;
  };

  var updatePins = function (allAds) {
    var test = allAds.filter(function(it) {
      return it.offer.type === typeFilters.value;
    });
    //window.pin.renderPins(test.concat(allAds));
    //console.log(test);
    /*window.pin.renderPins(allAds.sort(function (left, right) {
      return getRank(right) - getRank(left);
    }));*/

    if (test.length) {
      console.log(1);
      window.pin.renderPins(test);
    } else {
      window.pin.renderPins(allAds);
      console.log(0);
    }
  };

  window.filter = {
    updatePins: updatePins
  };
})();

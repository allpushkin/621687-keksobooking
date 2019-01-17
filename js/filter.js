'use strict';
(function () {
  var mapFilters = document.querySelector('.map__filters');
  var typeFilters = mapFilters.querySelector('#housing-type');


  var getRank = function (advert) {
    var rank = 0;

    if (advert.offer.type === typeFilters.value) {
      rank += 1;
    }

    return rank;
  };

/*var p = function (allAds) {
  window.pin.renderPins(allAds, 5);
  console.log(allAds);
};*/
  var updatePins = function (allAds) {
    var test = allAds.filter(function(it) {
      return it.offer.type === typeFilters.value;
    });

    //console.log(test.concat(allAds));
    var qtyFilter = test.length > 5 ? 5 : test.length;
    window.pin.renderPins(test, qtyFilter);
     //window.pin.renderPins(test.concat(allAds));
    //console.log(test);
    /*window.pin.renderPins(allAds.sort(function (left, right) {
      return getRank(right) - getRank(left);
    }));*/

    /*if (test.length) {
      console.log(1);
      window.pin.renderPins(test);
    } else {
      window.pin.renderPins(allAds);
      console.log(0);
    }*/
  };

  window.filter = {
    updatePins: updatePins,
    //p: p
  };
})();

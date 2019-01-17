'use strict';
(function () {
  // Функция загрузки данных и фильтрации по кол-ву пинов.
  var render = function (data) {
    var filtresHandler = function () {
      window.filter.updatePins(data);
    };

    var mapFilters = document.querySelector('.map__filters');
    mapFilters.addEventListener('change', filtresHandler);
    window.filter.updatePins(data);
   };

   window.render = {
     render: render
   };
})();

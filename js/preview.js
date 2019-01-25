'use strict';
(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var fileChooserAdvert = document.querySelector('.ad-form-header__input');
  var previewAdvert = document.querySelector('.ad-form-header__preview img');

  fileChooserAdvert.addEventListener('change', function () {
    var file = fileChooserAdvert.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
     return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        previewAdvert.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });

  /*var fileChooserAdvert = document.querySelector('.ad-form__input');
  var previewAdvert = document.querySelector('.ad-form__photo img');

  fileChooserAdvert.addEventListener('change', function () {
    var file = fileChooserAdvert.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
     return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        previewAdvert.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });*/
})();

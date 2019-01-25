'use strict';
(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var PICTURE_SIZE = 70;

  var fileChooserAvatar = document.querySelector('.ad-form-header__input');
  var previewAvatar = document.querySelector('.ad-form-header__preview img');

  fileChooserAvatar.addEventListener('change', function () {
    var file = fileChooserAvatar.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        previewAvatar.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });

  var fileChooserAdvert = document.querySelector('.ad-form__input');
  var previewAdvert = document.querySelector('.ad-form__photo');
  var photoAdverts = document.querySelector('.ad-form__photo-container');

  fileChooserAdvert.addEventListener('change', function () {
    for (var i = 0; i < fileChooserAdvert.files.length; i++) {

      var file = fileChooserAdvert.files[i];
      var fileName = file.name.toLowerCase();

      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });

      if (matches) {
        var newAdvert = previewAdvert.cloneNode(false);
        var picture = document.createElement('img');
        newAdvert.appendChild(picture);
        photoAdverts.insertBefore(newAdvert, previewAdvert);

        var reader = new FileReader();

        reader.addEventListener('load', function () {
          picture.src = reader.result;
          picture.width = PICTURE_SIZE;
          picture.height = PICTURE_SIZE;
        });

        reader.readAsDataURL(file);
      }
    }
  });
})();

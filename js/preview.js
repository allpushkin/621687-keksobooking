'use strict';
(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var PICTURE_SIZE = 70;
  var fileChooserAvatar = document.querySelector('.ad-form-header__input');
  var previewAvatar = document.querySelector('.ad-form-header__preview');
  var avatarUpload = document.querySelector('.ad-form-header__upload');

  fileChooserAvatar.addEventListener('change', function () {
    var file = fileChooserAvatar.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var newAvatar = previewAvatar.cloneNode(false);
      var avatar = document.createElement('img');
      newAvatar.style.padding = 0;
      newAvatar.classList.add('user-pictures');
      newAvatar.appendChild(avatar);
      avatarUpload.replaceChild(newAvatar, previewAvatar);

      var reader = new FileReader();

      reader.addEventListener('load', function () {
        avatar.src = reader.result;
        avatar.width = PICTURE_SIZE;
        avatar.height = PICTURE_SIZE;
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
        newAdvert.classList.add('user-pictures');
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

  var userPictures = document.querySelectorAll('.user-pictures');
  console.log(userPictures);
  var test = function () {
    var userPictures = document.querySelectorAll('.user-pictures');
  console.log(userPictures);
    for (var i = 0; i < userPictures.length; i++) {
      console.log(userPictures[i]);
      userPictures[i].remove();
    }

  };

  window.preview = {
    test: test
  };
})();

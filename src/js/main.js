'use strict';

define([
  './gallery',
  './pictures',
  './resizer',
  './upload'], function(gallery, loadPictures) {

  loadPictures(function(data, pictureElements) {

/**
  * Галерея фотографий
  */
    gallery.setPictures(data);

    Array.prototype.forEach.call(pictureElements, function(item, index) {

      var onPictureElementsClick = function(evt) {

        evt.preventDefault();
        gallery.show(index);
      };

      item.addEventListener('click', onPictureElementsClick);
    });

  });
});

'use strict';

define([
  './gallery',
  './pictures',
  './resizer',
  './upload'], function(gallery, loadPictures) {

  loadPictures(function(data, pictureList) {

    gallery.setPictures(data);

    Array.prototype.forEach.call(pictureList, function(item, index) {

      var onPictureElementsClick = function(evt) {

        evt.preventDefault();

        gallery.show(index);
      };

      item.element.addEventListener('click', onPictureElementsClick);
    });
  });

});

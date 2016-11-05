/**
 * @fileoverview
 * @author Igor Alexeenko (o0)
 */

'use strict';

define(['./load', './picture'], function(load, Picture) {

  var PICTURES_URL = 'http://localhost:1507/api/pictures';

  /**
   * @type {Array.<Picture>}
   */
  var pictureList = [];

  /**
   * Блок с фото.
   * @type {HTMLElement}
   */
  var picturesElement = document.querySelector('.pictures');

  /**
   * Форма с фильтрами.
   * @type {HTMLFormElement}
   */
  var filtersForm = document.querySelector('.filters');

  var hideFilterForm = function() {

    filtersForm.classList.add('hidden');
  };

  var showFilterForm = function() {

    filtersForm.classList.remove('hidden');
  };

  var renderPictures = function(data) {

    hideFilterForm();

    pictureList.length = 0;

    data.forEach(function(item) {

      var picture = new Picture(item);

      pictureList.push(picture);

      picture.show(picturesElement);
    });

    showFilterForm();
  };

  var loadPictures = function(callback) {

    load(PICTURES_URL, function(data) {

      renderPictures(data);

      callback(data, pictureList);
    });
  };

  return loadPictures;
});

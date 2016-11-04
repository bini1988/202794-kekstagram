/**
 * @fileoverview
 * @author Igor Alexeenko (o0)
 */

'use strict';

define(['./load', './picture'], function(load, getPictureElement) {

  var PICTURES_URL = 'http://localhost:1507/api/pictures';

  /**
   * @type {Array.<HTMLElement>}
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

  var loadPictures = function(data) {

    hideFilterForm();

    pictureList.length = 0;

    data.forEach(function(item) {

      var picture = getPictureElement(item);

      pictureList.push(picture);

      picturesElement.appendChild(picture);

    });

    showFilterForm();
  };

  load(PICTURES_URL, function(data) {

    loadPictures(data);
  });

});

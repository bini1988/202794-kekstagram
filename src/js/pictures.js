/**
 * @fileoverview
 * @author Igor Alexeenko (o0)
 */

'use strict';

(function() {

  var pictures = [{
    'likes': 40,
    'comments': 12,
    'url': 'photos/1.jpg'
  }, {
    'likes': 125,
    'comments': 49,
    'url': 'photos/2.jpg'
  }, {
    'likes': 350,
    'comments': 20,
    'url': 'failed.jpg'
  }, {
    'likes': 61,
    'comments': 0,
    'url': 'photos/4.jpg'
  }, {
    'likes': 100,
    'comments': 18,
    'url': 'photos/5.jpg'
  }, {
    'likes': 88,
    'comments': 56,
    'url': 'photos/6.jpg'
  }, {
    'likes': 328,
    'comments': 24,
    'url': 'photos/7.jpg'
  }, {
    'likes': 4,
    'comments': 31,
    'url': 'photos/8.jpg'
  }, {
    'likes': 328,
    'comments': 58,
    'url': 'photos/9.jpg'
  }, {
    'likes': 25,
    'comments': 65,
    'url': 'photos/10.jpg'
  }, {
    'likes': 193,
    'comments': 31,
    'url': 'photos/11.jpg'
  }, {
    'likes': 155,
    'comments': 7,
    'url': 'photos/12.jpg'
  }, {
    'likes': 369,
    'comments': 26,
    'url': 'photos/13.jpg'
  }, {
    'likes': 301,
    'comments': 42,
    'url': 'photos/14.jpg'
  }, {
    'likes': 241,
    'comments': 27,
    'url': 'photos/15.jpg'
  }, {
    'likes': 364,
    'comments': 2,
    'url': 'photos/16.jpg'
  }, {
    'likes': 115,
    'comments': 21,
    'url': 'photos/17.jpg'
  }, {
    'likes': 228,
    'comments': 29,
    'url': 'photos/18.jpg'
  }, {
    'likes': 53,
    'comments': 26,
    'url': 'photos/19.jpg'
  }, {
    'likes': 240,
    'comments': 46,
    'url': 'photos/20.jpg'
  }, {
    'likes': 290,
    'comments': 69,
    'url': 'photos/21.jpg'
  }, {
    'likes': 283,
    'comments': 33,
    'url': 'photos/22.jpg'
  }, {
    'likes': 344,
    'comments': 65,
    'url': 'photos/23.jpg'
  }, {
    'likes': 216,
    'comments': 27,
    'url': 'photos/24.jpg'
  }, {
    'likes': 241,
    'comments': 36,
    'url': 'photos/25.jpg'
  }, {
    'likes': 100,
    'comments': 11,
    'url': 'photos/26.mp4',
    'preview': 'photos/26.jpg'
  }];

  /**
   * @type {Array.<Object>}
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

  /**
   * @type {HTMLElement}
   */
  var pictureTemplate = document.querySelector('#picture-template');

  var hideFilterForm = function() {

    filtersForm.classList.add('hidden');
  };

  var showFilterForm = function() {

    filtersForm.classList.remove('hidden');
  };

  /**
   * @type {HTMLElement}
   */
  var getPictureHTMLElement = function() {

    var pictureToClone = (pictureTemplate.content)
      ? pictureTemplate.content.querySelector('.picture')
      : pictureTemplate.querySelector('.picture');

    return pictureToClone.cloneNode(true);
  };

  /**
   * @type {HTMLElement}
   */
  var getPictureElement = function(data) {

    var element = getPictureHTMLElement();

    var pictureImageElement = element.querySelector('img');
    var pictureComments = element.querySelector('.picture-comments');
    var pictureLikes = element.querySelector('.picture-likes');

    pictureComments.textContent = data.comments;
    pictureLikes.textContent = data.likes;

    var IMAGE_WIDHT = 182;
    var IMAGE_HEIGHT = 182;
    var IMAGE_LOAD_TIMEOUT = 5000;

    var pictureLoadTimeout = null;

    var pictureImage = new Image(IMAGE_WIDHT, IMAGE_HEIGHT);

    var onPictureImageLoad = function(evt) {

      clearTimeout(pictureLoadTimeout);

      pictureImageElement.width = IMAGE_WIDHT;
      pictureImageElement.height = IMAGE_HEIGHT;

      pictureImageElement.src = evt.target.src;
    };

    var onPictureImageLoadError = function() {
      element.classList.add('picture-load-failure');
    };

    var onPictureImageLoadTimeout = function() {
      element.classList.add('picture-load-failure');
      pictureImage.src = '';
    };

    pictureImage.addEventListener('load', onPictureImageLoad);
    pictureImage.addEventListener('error', onPictureImageLoadError);

    pictureLoadTimeout = setTimeout(onPictureImageLoadTimeout, IMAGE_LOAD_TIMEOUT);

    pictureImage.src = (data.preview) ? data.preview : data.url;

    return element;
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

  loadPictures(pictures);

})();

/**
 * @fileoverview
 * @author Igor Alexeenko (o0)
 */

'use strict';

(function() {

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

  var loadJSONP = function(url, callback, callbackName) {

    if (!callbackName) {
      callbackName = 'cb' + Date.now();
    }

    window[callbackName] = function(data) {
      callback(data);
    };

    var scriptHTMLElement = document.createElement('script');

    scriptHTMLElement.src = url + '?callback=' + callbackName;

    document.body.appendChild(scriptHTMLElement);
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

  loadJSONP(PICTURES_URL, function(data) {

    loadPictures(data);
  });

})();

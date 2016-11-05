
'use strict';

define(function() {

  var Picture = function(pictureData) {

    this.data = pictureData;
    this.element = this.getPictureElement();
    this.pictureLoadTimeout = null;
    this.pictureImage = null;

    this.pictureImageElement = this.element.querySelector('img');
    this.pictureComments = this.element.querySelector('.picture-comments');
    this.pictureLikes = this.element.querySelector('.picture-likes');

    this.onPictureImageLoad = this.onPictureImageLoad.bind(this);
    this.onPictureImageLoadError = this.onPictureImageLoadError.bind(this);
    this.onPictureImageLoadTimeout = this.onPictureImageLoadTimeout.bind(this);
  };

  Picture.prototype.IMAGE_WIDHT = 182;
  Picture.prototype.IMAGE_HEIGHT = 182;
  Picture.prototype.IMAGE_LOAD_TIMEOUT = 5000;

  Picture.prototype.show = function(parentNode) {

    this.loadPictureImage();

    this.pictureComments.textContent = this.data.comments;
    this.pictureLikes.textContent = this.data.likes;

    parentNode.appendChild(this.element);
  };

  Picture.prototype.remove = function() {

    clearTimeout(this.pictureLoadTimeout);

    this.element.parentNode.removeChild(this.element);
  };

  Picture.prototype.getPictureElement = function() {

    var template = document.querySelector('#picture-template');

    var pictureToClone = (template.content)
      ? template.content.querySelector('.picture')
      : template.querySelector('.picture');

    return pictureToClone.cloneNode(true);
  };

  Picture.prototype.loadPictureImage = function() {

    this.pictureImage = new Image(this.IMAGE_WIDHT, this.IMAGE_HEIGHT);

    this.pictureImage.addEventListener('load', this.onPictureImageLoad);
    this.pictureImage.addEventListener('error', this.onPictureImageLoadError);

    this.pictureLoadTimeout = setTimeout(this.onPictureImageLoadTimeout, this.IMAGE_LOAD_TIMEOUT);

    this.pictureImage.src = (this.data.preview) ? this.data.preview : this.data.url;
  };

  Picture.prototype.onPictureImageLoad = function(evt) {

    clearTimeout(this.pictureLoadTimeout);

    this.pictureImageElement.width = this.IMAGE_WIDHT;
    this.pictureImageElement.height = this.IMAGE_HEIGHT;

    this.pictureImageElement.src = evt.target.src;
  };

  Picture.prototype.onPictureImageLoadError = function() {
    this.element.classList.add('picture-load-failure');
  };

  Picture.prototype.onPictureImageLoadTimeout = function() {
    this.element.classList.add('picture-load-failure');
    this.pictureImage.src = '';
  };

  return Picture;
});

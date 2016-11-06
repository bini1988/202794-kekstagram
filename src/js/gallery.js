
'use strict';

define(function() {

  var Gallery = function() {

    this.IMAGE_LOAD_TIMEOUT = 10000;
    this.GALLERY_IMAGE_WIDHT = 600;
    this.GALLERY_IMAGE_HEIGHT = 600;

    this.pictures = null;
    this.activePictureIndex = 0;
    this.pictureLoadTimeout = null;
    this.activePictureImg = null;

    this.galleryOverlay = document.querySelector('.gallery-overlay');

    this.galleryClose = this.galleryOverlay.querySelector('.gallery-overlay-close');
    this.galleryImage = this.galleryOverlay.querySelector('.gallery-overlay-image');
    this.galleryLikesCount = this.galleryOverlay.querySelector('.likes-count');
    this.galleryCommentsCount = this.galleryOverlay.querySelector('.comments-count');

    this.onGalleryCloseClick = this.onGalleryCloseClick.bind(this);
    this.onGalleryImageClick = this.onGalleryImageClick.bind(this);

    this.onGalleryPictureLoad = this.onGalleryPictureLoad.bind(this);
    this.onGalleryPictureLoadTimeout = this.onGalleryPictureLoadTimeout.bind(this);
    this.onGalleryPictureLoadError = this.onGalleryPictureLoadError.bind(this);

  };

  Gallery.prototype.setPictures = function(pictures) {
    this.pictures = pictures;
  };

  Gallery.prototype.setActivePicture = function(activePictureIndex) {

    this.activePictureIndex = activePictureIndex;

    if (this.pictures) {

      this.activePictureImg = new Image(this.GALLERY_IMAGE_WIDHT, this.GALLERY_IMAGE_HEIGHT);

      this.activePictureImg.addEventListener('load', this.onGalleryPictureLoad);
      this.activePictureImg.addEventListener('error', this.onGalleryPictureLoadError);

      this.pictureLoadTimeout =
        setTimeout(this.onGalleryPictureLoadTimeout, this.IMAGE_LOAD_TIMEOUT);

      var activePicture = this.pictures[this.activePictureIndex].data;

      this.activePictureImg.src = (activePicture.preview) ? activePicture.preview : activePicture.url;

      this.galleryLikesCount.textContent = activePicture.likes;
      this.galleryCommentsCount.textContent = activePicture.comments;
    }
  };

  Gallery.prototype.show = function(activePictureIndex) {

    this.galleryClose.addEventListener('click', this.onGalleryCloseClick);
    this.galleryImage.addEventListener('click', this.onGalleryImageClick);

    this.setActivePicture(activePictureIndex);

    this.galleryOverlay.classList.remove('invisible');
  };

  Gallery.prototype.hide = function() {

    this.galleryOverlay.classList.add('invisible');

    this.galleryClose.removeEventListener('click', this.onGalleryCloseClick);
    this.galleryImage.removeEventListener('click', this.onGalleryImageClick);

    clearTimeout(this.pictureLoadTimeout);
  };

  Gallery.prototype.getValidPictureIndex = function(pictureIndex) {

    pictureIndex = (pictureIndex < 0) ? 0 : pictureIndex;

    return (pictureIndex % this.pictures.length);
  };

  Gallery.prototype.nextPicture = function() {

    var index = this.getValidPictureIndex(this.activePictureIndex + 1);

    this.setActivePicture(index);
  };

  Gallery.prototype.previousPicture = function() {

    var index = this.getValidPictureIndex(this.activePictureIndex - 1);

    this.setActivePicture(index);
  };

  Gallery.prototype.onGalleryPictureLoad = function(evt) {

    clearTimeout(this.pictureLoadTimeout);

    this.galleryImage.width = this.GALLERY_IMAGE_WIDHT;
    this.galleryImage.height = this.GALLERY_IMAGE_HEIGHT;

    this.galleryImage.src = evt.target.src;
  };

  Gallery.prototype.onGalleryPictureLoadError = function() {
    this.galleryImage.src = '';
  };

  Gallery.prototype.onGalleryPictureLoadTimeout = function() {
    this.activePictureImg.src = '';
  };

  Gallery.prototype.onGalleryCloseClick = function() {
    this.hide();
  };

  Gallery.prototype.onGalleryImageClick = function() {

    clearTimeout(this.pictureLoadTimeout);

    this.nextPicture();
  };

  return new Gallery();
});

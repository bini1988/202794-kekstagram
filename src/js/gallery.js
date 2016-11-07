
'use strict';

define(['./utils', './base-component'], function(utils, BaseComponent) {

  var Gallery = function() {

    this.IMAGE_LOAD_TIMEOUT = 10000;
    this.GALLERY_IMAGE_WIDHT = 600;
    this.GALLERY_IMAGE_HEIGHT = 600;

    this.pictures = null;
    this.activePictureIndex = 0;
    this.pictureLoadTimeout = null;
    this.activePictureImg = null;

    this.galleryOverlay = document.querySelector('.gallery-overlay');

    BaseComponent.call(this, this.galleryOverlay);

    this.galleryClose = this.galleryOverlay.querySelector('.gallery-overlay-close');
    this.galleryImage = this.galleryOverlay.querySelector('.gallery-overlay-image');
    this.galleryLikesCount = this.galleryOverlay.querySelector('.likes-count');
    this.galleryCommentsCount = this.galleryOverlay.querySelector('.comments-count');

    this.onGalleryCloseClick = this.onGalleryCloseClick.bind(this);
    this.onGalleryImageClick = this.onGalleryImageClick.bind(this);
    this.onGalleryLikesCountClick = this.onGalleryLikesCountClick.bind(this);

    this.onGalleryPictureLoad = this.onGalleryPictureLoad.bind(this);
    this.onGalleryPictureLoadTimeout = this.onGalleryPictureLoadTimeout.bind(this);
    this.onGalleryPictureLoadError = this.onGalleryPictureLoadError.bind(this);

  };

  utils.inherit(Gallery, BaseComponent);

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

      var activePictureData = this.pictures[this.activePictureIndex].data;

      this.activePictureImg.src = activePictureData.getPictureUrl();

      this.galleryLikesCount.textContent = activePictureData.getLikesCount();
      this.galleryCommentsCount.textContent = activePictureData.getCommentsCount();
    }
  };

  Gallery.prototype.show = function(activePictureIndex) {

    this.galleryClose.addEventListener('click', this.onGalleryCloseClick);
    this.galleryImage.addEventListener('click', this.onGalleryImageClick);
    this.galleryLikesCount.addEventListener('click', this.onGalleryLikesCountClick);

    this.setActivePicture(activePictureIndex);

    this.galleryOverlay.classList.remove('invisible');
  };

  Gallery.prototype.remove = function() {

    this.hide();

    BaseComponent.prototype.remote.call(this);
  };

  Gallery.prototype.hide = function() {

    this.galleryOverlay.classList.add('invisible');

    this.galleryClose.removeEventListener('click', this.onGalleryCloseClick);
    this.galleryImage.removeEventListener('click', this.onGalleryImageClick);
    this.galleryLikesCount.removeEventListener('click', this.onGalleryLikesCountClick);


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

  Gallery.prototype.onGalleryLikesCountClick = function(evt) {

    var activePictureData = this.pictures[this.activePictureIndex].data;

    if (this.galleryLikesCount.classList.contains('likes-count-liked')) {

      activePictureData.upLikesCount();
      this.galleryLikesCount.classList.remove('likes-count-liked');
    } else {

      activePictureData.downLikesCount();
      this.galleryLikesCount.classList.add('likes-count-liked');
    }

  };
  return new Gallery();
});

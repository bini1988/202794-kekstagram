
'use strict';

define(function() {

  var PictureData = function(data) {
    this.data = data;
    this.liked = false;
  };

  PictureData.prototype.onLikesChange = null;

  PictureData.prototype.isLiked = function() {
    return this.liked;
  };

  PictureData.prototype.getCreationDate = function() {
    return new Date(this.data.created);
  };

  PictureData.prototype.getLikesCount = function() {
    return this.data.likes;
  };

  PictureData.prototype.getCommentsCount = function() {
    return this.data.comments;
  };

  PictureData.prototype.getPictureUrl = function() {
    return (this.data.preview) ? this.data.preview : this.data.url;
  };

  PictureData.prototype.upLikesCount = function() {

    this.liked = true;
    this.data.likes++;

    if (typeof this.onLikesChange === 'function') {
      this.onLikesChange(this);
    }

    return this.data.likes;
  };

  PictureData.prototype.downLikesCount = function() {

    this.liked = false;
    this.data.likes--;

    if (typeof this.onLikesChange === 'function') {
      this.onLikesChange(this);
    }

    return this.data.likes;
  };

  return PictureData;
});

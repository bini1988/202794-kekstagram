
'use strict';

define(function() {

  var PictureData = function(data) {
    this.data = data;
  };

  PictureData.prototype.onUsefulnessChange = null;

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
    return this.data.likes++;
  };

  PictureData.prototype.downLikesCount = function() {
    return this.data.likes--;
  };

  return PictureData;
});


'use strict';

define(function() {

  var BaseComponent = function(el) {
    this.element = el;
  };

  BaseComponent.prototype.show = function(parentNode) {
    parentNode.appendChild(this.element);
  };

  BaseComponent.prototype.remove = function() {
    this.element.parentNode.removeChild(this.element);
  };

  return BaseComponent;
});

'use strict';

define(function() {

  var load = function(url, callback, callbackName) {

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

  return load;
});

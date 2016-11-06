'use strict';

define(function() {

  var getSearchString = function(params) {

    return Object.keys(params).map(function(key) {
      return key + '=' + params[key];
    }).join('&');
  };

  var load = function(url, params, callback) {

    var xhr = new XMLHttpRequest();

    if (params) {
      url += '?' + getSearchString(params);
    }

    xhr.onload = function(evt) {
      callback(JSON.parse(evt.target.response));
    };

    xhr.onerror = function() {
      console.warn('Ошибка при попытке доступа к ресурсу ' + url);
    };

    xhr.ontimeout = function() {
      console.warn('Ошибка при попытке доступа к ресурсу ' + url + '. Превышен интервал ожидания.');
    };

    xhr.open('GET', url);

    xhr.timeout = 10000;

    xhr.send();
  };

  return load;
});

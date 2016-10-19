'use strict';

function getMessage(a, b) {

  var outMessage = 'Переданы некорректные данные';

  if (typeof a === 'boolean') {
    outMessage = (a)
      ? 'Переданное GIF-изображение анимировано и содержит ' + b + ' кадров'
      : 'Переданное GIF-изображение не анимировано';
  }

  if (typeof a === 'number') {
    outMessage = 'Переданное SVG-изображение содержит ' + a + ' объектов и ' + (b * 4) + ' атрибутов';
  }

  if (Array.isArray(a) && !Array.isArray(b)) {

    var amountOfRedPoints = a.reduce(function(pItem, cItem) {
      return pItem + cItem;
    });

    outMessage = 'Количество красных точек во всех строчках изображения: ' + amountOfRedPoints;
  }

  if (Array.isArray(a) && Array.isArray(b)) {

    var artifactsSquare = 0;

    for(var i = 0; i < a.length; i++) {
      artifactsSquare += a[i] * b[i];
    }

    outMessage = 'Общая площадь артефактов сжатия: ' + artifactsSquare + ' пикселей';
  }

  return outMessage;
}


'use strict';

module.exports = function(list, filterID) {

  var outList = list;

  switch(filterID) {
    case 'filter-popular':
      outList = list.sort(sortByPopular);
      break;
    case 'filter-new':
      outList = list.filter(filterByDays);
      outList = outList.sort(sortByDate);
      break;
    case 'filter-discussed':
      outList = list.sort(sortByDiscussed);
      break;
  }

  return outList;
};

function sortByPopular(a, b) {
  // По убыванию числа лайков
  return b.likes - a.likes;
}

function sortByDiscussed(a, b) {
  //По убыванию количества комментариев
  return b.comments - a.comments;
}

function sortByDate(a, b) {
  //По дате создания
  return new Date(b.created) - new Date(a.created);
}

function filterByDays(item) {
  // Фотографии сделанные в течение трех последних дней
  var DAYS_AGO = 3;
  var daysAgoDate = new Date();

  daysAgoDate.setDate(daysAgoDate.getDate() - DAYS_AGO);
  daysAgoDate.setHours(0, 0, 0, 0);

  return item.created > daysAgoDate;
}

/**
 * @fileoverview
 * @author Igor Alexeenko (o0)
 */

'use strict';

define(['./utils', './load', './picture', './gallery'], function(utils, load, Picture, gallery) {

  var PICTURES_URL = 'http://localhost:1507/api/pictures';
  var PAGE_SIZE = 12;
  var THROTTLE_DELAY = 100;
  var SCROLL_GAP = 100;

  var pictures = [];
  var curPage = 0;
  var curFilter = localStorage.getItem('curFilter') || 'filter-popular';
  var isNextPageExist = true;

  var picturesContainer = document.querySelector('.pictures');
  var filtersForm = document.querySelector('.filters');
  var footer = document.querySelector('footer');

  var optOnScrollWindow = utils.throttle(onScrollWindow, THROTTLE_DELAY);

  window.addEventListener('scroll', optOnScrollWindow);

  var checkedFilter = filtersForm.querySelector('input[id="' + curFilter + '"]');

  if (checkedFilter) {
    checkedFilter.checked = true;
  }

  filtersForm.addEventListener('change', function(evt) {
    applyFilter(evt.target.id);
  }, true);


  renderNextPage();

  function renderNextPage() {

    if (!isNextPageExist) {
      return;
    }

    load(PICTURES_URL, getURLOptions(curPage, curFilter), function(data) {

      isNextPageExist = data.length;
      curPage++;

      renderPictures(data);

      gallery.setPictures(pictures);

      if (isNextPageExist && isFooterVisible()) {
        renderNextPage();
      }
    });
  }

  function renderPictures(data) {

    filtersForm.classList.add('hidden');

    var pictureItems = data.map(function(item) {
      return new Picture(item);
    });

    pictureItems.forEach(function(item) {
      item.show(picturesContainer);
    });

    Array.prototype.push.apply(pictures, pictureItems);

    filtersForm.classList.remove('hidden');
  }

  function removePictures() {

    pictures.forEach(function(item) {
      item.remove();
    });

    pictures.length = 0;
  }

  function getURLOptions(page, filterName) {

    return {
      from: (page * PAGE_SIZE) || 0,
      to: (page * PAGE_SIZE + PAGE_SIZE) || Number.MAX_VALUE,
      filter: filterName || 'filter-popular'
    };
  }

  function applyFilter(filterName) {

    if (filterName === curFilter) {
      return;
    }

    isNextPageExist = true;
    curFilter = filterName;
    curPage = 0;

    removePictures();

    renderNextPage();

    localStorage.setItem('curFilter', curFilter);
  }

  function isFooterVisible() {
    return (footer.getBoundingClientRect().bottom - window.innerHeight) <= SCROLL_GAP;
  }

  function onScrollWindow() {

    if (isFooterVisible()) {
      renderNextPage();
    }
  }

});

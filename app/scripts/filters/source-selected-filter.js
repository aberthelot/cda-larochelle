'use strict';

angular.module('cdaLarochelleApp')
  .filter('sourceSelectedFilter', function () {
    return function (items) {

      var arrayToReturn = [];
      for (var i=0; i<items.length; i++) {
        if (items[i].selected) {
          arrayToReturn.push(items[i]);
        }
      }
      // console.log(arrayToReturn.length + ' result(s) found');

      return arrayToReturn;
    };
  });
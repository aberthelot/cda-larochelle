'use strict';

angular.module('cdaLarochelleApp')
  .filter('groupFilter', function () {
    return function (items, name) {

      var arrayToReturn = [];
      for (var i=0; i<items.length; i++) {
        if (name == items[i].source.type) {
          arrayToReturn.push(items[i]);
        }
      }
      // console.log(arrayToReturn.length + ' result(s) found');

      return arrayToReturn;
    };
  });
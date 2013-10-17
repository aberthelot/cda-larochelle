'use strict';

angular.module('cdaLarochelleApp')
  .filter('sourceFilter', function () {
    return function (items, sources) {

      var selectedSources = [];
      for (var i = 0; i < sources.length; i++) {
        if (sources[i].selected) {
          selectedSources.push(sources[i].name);
        }
      };
      // console.log('Selected sources : ' + selectedSources);

      var arrayToReturn = [];
      for (var i=0; i<items.length; i++) {
        if (selectedSources.indexOf(items[i].source.type) != -1) {
          arrayToReturn.push(items[i]);
        }
      }
      // console.log(arrayToReturn.length + ' result(s) found');

      return arrayToReturn;
    };
  });
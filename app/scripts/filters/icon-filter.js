'use strict';

angular.module('cdaLarochelleApp')
  .filter('iconFilter', function () {
    return function (name, sources) {

      var iconToReturn = '';
      for (var i = 0; i < sources.length; i++) {
        if (sources[i].name == name) {
          iconToReturn = sources[i].icon;
        }
      };
      // console.log('Icon return : ' + iconToReturn);

      return iconToReturn;
    };
  });

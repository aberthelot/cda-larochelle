'use strict';

angular.module('cdaLarochelleApp')
  .directive('test', function () {
    return {
      templateUrl: 'views/partials/selectdate.html',
      transclude: true,
    };
  });

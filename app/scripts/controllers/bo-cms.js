'use strict';

angular.module('cdaLarochelleApp')
  .controller('BoCmsCtrl', function ($scope, news) {
    // $scope.awesomeThings = [
    //   'HTML5 Boilerplate',
    //   'AngularJS',
    //   'Karma'
    // ];

    $scope.awesomeThings = news.someMethod();
  });

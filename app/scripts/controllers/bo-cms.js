'use strict';

angular.module('cdaLarochelleApp')
  .controller('BoCmsCtrl', function ($scope, Topic) {
    $scope.news = Topic.query();
  });

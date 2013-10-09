'use strict';

angular.module('cdaLarochelleApp')
.controller('BoCmsCtrl', function ($scope, Topic) {
  $scope.topics = Topic.query();

  console.log('HUHU ' + Topic.query().length);
  console.log('YTYT ' + $scope.topics);


  // on récupère la date du jour
  var now = moment();
  $scope.now = now.valueOf();
  $scope.daysMonth = new Array();
  for (var i = 0; i < now.daysInMonth(); i++) {
    var day = moment().startOf('month').add('days', i);
    $scope.daysMonth.push(day.valueOf());

    // for (var i = 0; i < $scope.topics.length; i++) {
    // };

  };

});

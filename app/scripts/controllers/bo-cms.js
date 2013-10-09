'use strict';

angular.module('cdaLarochelleApp')
  .controller('BoCmsCtrl', function ($scope, Topic) {
  $scope.topics = Topic.query();

  // on récupère la date du jour
  var now = moment();
  $scope.now = now.valueOf();
  // on récupère le mois
  // $scope.monthNumber = moment().month();

  $scope.daysMonth = new Array();

  // console.log(now.daysInMonth());

  for (var i = 0; i < now.daysInMonth(); i++) {
    console.log(i);
    var day = moment().startOf('month').add('days', i);
    $scope.daysMonth.push(day.valueOf());
  };
  // $scope.daysMonth = moment().daysInMonth();

  // console.log('TEST :: ' + $scope.daysMonth.length);



  });

'use strict';

angular.module('cdaLarochelleApp')
.controller('BoCmsCtrl', function ($scope, $rootScope, Topic) {
  // on récupère les sujets d'actualité
  $scope.topics = Topic.query();

  console.log($scope.topics);

  // on récupère la date du jour
  var now = moment();
  $scope.now = now.valueOf();
  // on construit le tableau de jours du mois
  $scope.daysMonth = new Array();
  for (var i = 0; i < now.daysInMonth(); i++) {
    var day = moment().startOf('month').add('days', i);
    $scope.daysMonth.push(day.valueOf());
  };

  $rootScope.$on('dropEvent', function(evt, id, day, scheduled) {

      // console.log('Actualité #' + id + ' déposée le ' + day);

      for (var i = 0; i < $scope.topics.length; i++) {
        if ($scope.topics[i].id === id) {
          if ('begin' === scheduled) {
            // console.log(scheduled);
            if (moment(day).isAfter($scope.topics[i].scheduledEnd)) {
              alert('Impossible de mettre une date de début après une date de fin');
            } else {
              $scope.topics[i].scheduledBegin = day;
              if ($scope.topics[i].scheduledEnd == null || $scope.topics[i].scheduledEnd == "") {
                $scope.topics[i].scheduledEnd = day;
              }
            }
          } else {

            if (moment(day).isBefore($scope.topics[i].scheduledBegin)) {
              alert('Impossible de mettre une date de fin après une date de début');
            } else {
              $scope.topics[i].scheduledEnd = day;
              if ($scope.topics[i].scheduledBegin == null || $scope.topics[i].scheduledBegin == "") {
                $scope.topics[i].scheduledBegin = day;
              }
            }
            // console.log(scheduled);

          }
        $scope.topics[i].isScheduled = true;
        }
      };

      $scope.$apply();
  });

});

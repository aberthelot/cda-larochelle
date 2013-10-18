'use strict';

angular.module('cdaLarochelleApp')
.controller('BoCmsCtrl', function ($scope, $rootScope, Topic) {
  // on récupère les sujets d'actualité
  $scope.topics = Topic.query();

  // console.log($scope.topics);

  // par défaut on sélectionne le jour en cours
  $scope.daySelected = moment().valueOf();
  // on construit le tableau de jours du mois
  buildCalendar();

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

  $scope.cancelScheduling = function(index) {
    $scope.topics[index].isScheduled = false;
    $scope.topics[index].scheduledBegin = "";
    $scope.topics[index].scheduledEnd = "";
  }

  $scope.backwardMonth = function() {
    // on recule d'un mois la date en cours
    $scope.daySelected = moment($scope.daySelected).add('months', -1).valueOf();
    // on construit le tableau de jours du mois
    buildCalendar();
  }

  $scope.forwardMonth = function() {
    // on avance d'un mois la date en cours
    $scope.daySelected = moment($scope.daySelected).add('months', 1).valueOf();
    // on construit le tableau de jours du mois
    buildCalendar();
  }

  function buildCalendar() {
    var daySelected = moment($scope.daySelected);
    // on construit le tableau de jours du mois
    var daysMonth = new Array();
    for (var i = 0; i < daySelected.daysInMonth(); i++) {
      var day = moment(daySelected).startOf('month').add('days', i);
      daysMonth.push(day.valueOf());
    };
    $scope.daysMonth = daysMonth;
  }

});

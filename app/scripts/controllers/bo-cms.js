'use strict';



angular.module('cdaLarochelleApp')
.controller('BoCmsCtrl', function ($scope, $rootScope, Topic, flash) {
  // on récupère les sujets d'actualité
  $scope.topics = Topic.query();

  // par défaut on sélectionne le jour en cours
  $scope.daySelected = moment().valueOf();
  // on construit le tableau de jours du mois
  $scope.daysMonth = buildCalendar($scope.daySelected);


  $rootScope.$on('dropEvent', function(evt, id, day, scheduled) {

        $scope.messages='';
  
    // console.log('ID : ' + id + ' ; day : ' + day);

    for (var i = 0; i < $scope.topics.length; i++) {
      console.log('i : ' + i
        + ', debut : ' + $scope.topics[i].scheduledBegin
        + ', fin : ' + $scope.topics[i].scheduledEnd);
    };

    // 
    var topic = getTopicFromList(id, $scope.topics);

    if (!checkPublishingPeriod(topic, day)) {
      flash('error', 'La date de mise à la une n\'appartient pas à la période de publication');
    } else {

      if ('begin' === scheduled) {
        // console.log(scheduled);
        if (moment(day).isAfter(topic.scheduledEnd)) {
           flash('error', 'Impossible de mettre une date de début après une date de fin');
        } else {
          var scheduledEnd;
          if (topic.scheduledEnd == null || topic.scheduledEnd == "") {
            scheduledEnd = day;
          } else {
            scheduledEnd = topic.scheduledEnd;
          }
          if (!checkAvailableCategory(topic, day, scheduled, $scope.topics)) {
            flash('error', 'Chevauchement entre les actualités');
          } else {
            topic.scheduledBegin = day;
            topic.scheduledEnd = scheduledEnd;
            topic.isScheduled = true;
          }
        }
      } else {
        if (moment(day).isBefore(topic.scheduledBegin)) {
           flash('error','Impossible de mettre une date de fin après une date de début');

        } else {

          var scheduledBegin;
          if (topic.scheduledBegin == null || topic.scheduledBegin == "") {
            scheduledBegin = day;
          } else {
            scheduledBegin = topic.scheduledBegin;
          }
          if (!checkAvailableCategory(topic, day, scheduled, $scope.topics)) {
              $scope.$parent.error = "Chevauchement entre les actualités";
          } else {
            topic.scheduledBegin = scheduledBegin;
            topic.scheduledEnd = day;
            topic.isScheduled = true;
          }
        }
        // console.log(scheduled);
      }

      $scope.$apply();
    }
  });

  $scope.cancelScheduling = function(index) {

    for (var i = 0; i < $scope.topics.length; i++) {
      console.log('i : ' + i
        + ', debut : ' + $scope.topics[i].scheduledBegin
        + ', fin : ' + $scope.topics[i].scheduledEnd);
    };
    console.log('-_-_-_-_-_-_-_');

    $scope.topics[index].isScheduled = false;
    $scope.topics[index].scheduledBegin = "";
    $scope.topics[index].scheduledEnd = "";

    for (var i = 0; i < $scope.topics.length; i++) {
      console.log('i : ' + i
        + ', debut : ' + $scope.topics[i].scheduledBegin
        + ', fin : ' + $scope.topics[i].scheduledEnd);
    };
  }

  $scope.backwardMonth = function() {
    // on recule d'un mois la date en cours
    $scope.daySelected = moment($scope.daySelected).add('months', -1).valueOf();
    // on construit le tableau de jours du mois
    $scope.daysMonth = buildCalendar($scope.daySelected);
  }

  $scope.forwardMonth = function() {
    // on avance d'un mois la date en cours
    $scope.daySelected = moment($scope.daySelected).add('months', 1).valueOf();
    // on construit le tableau de jours du mois
    $scope.daysMonth = buildCalendar($scope.daySelected);
  }
})

function buildCalendar(day) {
  var daySelected = moment(day);
  // on construit le tableau de jours du mois
  var daysMonth = new Array();
  for (var i = 0; i < daySelected.daysInMonth(); i++) {
    var day = moment(daySelected).startOf('month').add('days', i);
    daysMonth.push(day.valueOf());
  };
  return daysMonth;
}


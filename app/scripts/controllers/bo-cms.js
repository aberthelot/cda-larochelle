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

    // 
    var topic = getTopicFromScope(id);


    if (checkPublishingPeriod(topic, day)) {
      alert('La date de mise à la une n\'appartient pas à la période de publication');
    } else {

      if ('begin' === scheduled) {
        // console.log(scheduled);
        if (moment(day).isAfter(topic.scheduledEnd)) {
          alert('Impossible de mettre une date de début après une date de fin');
        } else {
          var scheduledEnd;
          if (topic.scheduledEnd == null || topic.scheduledEnd == "") {
            scheduledEnd = day;
          } else {
            scheduledEnd = topic.scheduledEnd;
          }
          if (!checkCategory(topic, day, scheduledEnd)) {
            topic.scheduledBegin = day;
            topic.scheduledEnd = scheduledEnd;
            topic.isScheduled = true;
          } else {
            alert('Chevauchement entre les actualités');
          }
        }
      } else {
        if (moment(day).isBefore(topic.scheduledBegin)) {
          alert('Impossible de mettre une date de fin après une date de début');
        } else {

          var scheduledBegin;
          if (topic.scheduledBegin == null || topic.scheduledBegin == "") {
            scheduledBegin = day;
          } else {
            scheduledBegin = topic.scheduledBegin;
          }
          if (!checkCategory(topic, scheduledBegin, day)) {
            topic.scheduledBegin = scheduledBegin;
            topic.scheduledEnd = day;
            topic.isScheduled = true;
          } else {
            alert('Chevauchement entre les actualités'); 
          }
        }
        // console.log(scheduled);
      }

      $scope.$apply();



    }



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

  function getTopicFromScope(id) {
    var topic;
    // on parcourt toutes les actualités connues pour retrouver l'actualité en question
    for (var i = 0; i < $scope.topics.length; i++) {
      // vérification sur l'identifiant
      if ($scope.topics[i].id == id) {
        topic = $scope.topics[i];
      }
    }

    return topic;
  }

  function checkPublishingPeriod(topic, day) {
    var publishingError = false;

    // on vérifie que la date de mise à la une appartient bien à la période de publication
    if (moment(day).isAfter(topic.publishEnd) || moment(day).isBefore(topic.publishBegin)) {
      publishingError = true;
    }

    return publishingError;
  }

  function checkCategory(topic, scheduledBegin, scheduledEnd) {
    var categoryError = false;
    // on parcourt toutes les actualités connues
    for (var i = 0; i < $scope.topics.length; i++) {
      
      // vérifications avec les autres actualités
      if ($scope.topics[i].id != topic.id) {
        // vérifications sur les mêmes catégories
        if ($scope.topics[i].category.id == topic.category.id) {

          // console.log("Day : " + moment(day));
          // console.log("Test : " + moment(day));

          // on vérifie que la date de début n'appartient pas à la période d'une autre actualité de même catégorie
          if (moment(scheduledBegin).isAfter($scope.topics[i].scheduledBegin) && moment(scheduledBegin).isBefore($scope.topics[i].scheduledEnd)) {
            categoryError = true;
          }

          // on vérifie que la date de fin n'appartient pas à la période d'une autre actualité de même catégorie
          if (moment(scheduledEnd).isAfter($scope.topics[i].scheduledBegin) && moment(scheduledEnd).isBefore($scope.topics[i].scheduledEnd)) {
            categoryError = true;
          }

          // on vérifie que la période que l'on veut créer n'englobe pas la période d'une autre actualité de même catégorie
          if (moment(scheduledBegin).isBefore($scope.topics[i].scheduledBegin) && moment(scheduledEnd).isAfter($scope.topics[i].scheduledEnd)) {
            categoryError = true;
          }
        }
      }
    }

    return categoryError;
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

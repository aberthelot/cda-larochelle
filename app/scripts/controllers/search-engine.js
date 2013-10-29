'use strict';

angular.module('cdaLarochelleApp')
.controller('SearchEngineCtrl', function ($scope, $rootScope, Document) {
  // on récupère les documents
  $scope.documents = Document.query();

  $scope.display = 'display-list';
  $scope.group = 'source';
  $scope.sort = 'relevance';
  $scope.dropavailable = false;

$scope.daySelected = moment().valueOf();

  $rootScope.$on('moveSource', function(evt, indexBegin, indexEnd) {
    // console.log('SearchEngineCtrl receive \'moveSource\' with parameters indexBegin : ' + indexBegin + ' | indexEnd ' + indexEnd);
    // on récupére la source à enlever
    var sourceRemoved = $scope.sources.splice(indexBegin, 1);
    // on réinjecte la source enlevée
    $scope.sources.splice(indexEnd, 0, sourceRemoved[0]);

    $scope.$apply();
  });


  $scope.periods = [
    {
      label: '--',
      dateSearchBegin: '',
      dateSearchEnd: ''
    },
    {
      label: 'Aujourd\'hui',
      dateSearchBegin: moment().valueOf(),
      dateSearchEnd: moment().valueOf()
    },
    {
      label: 'Cette semaine',
      dateSearchBegin: moment().startOf('week').valueOf(),
      dateSearchEnd: moment().endOf('week').valueOf()
    },
    {
      label: 'Ce mois-ci',
      dateSearchBegin: moment().startOf('month').valueOf(),
      dateSearchEnd: moment().endOf('month').valueOf()
    },
    {
      label: 'A venir',
      dateSearchBegin: moment().valueOf(),
      dateSearchEnd: ''
    }
  ];

  // $scope.testemail = '';
  $scope.testemail = $scope.periods[0];

    $scope.$watch('testemail', function() {
        // $scope.searchCity = null;
    });

  $scope.sources = [
    {
      "name" : "email",
      "label" : "Emails",
      "selected" : true,
      "icon" : "icon-envelope",
      "parameters" : [
        {
          "label" : "De",
          "type" : "text",
          "model" : "from.email",
          "value" : ""
        },
        {
          "label" : "À",
          "type" : "text",
          "model" : "to.email",
          "value" : ""
        }
      ]
    },
    {
      "name" : "contact",
      "label" : "Contacts",
      "selected" : true,
      "icon" : "icon-user",
      "parameters" : [
        {
          "label" : "Société",
          "type" : "text",
          "format" : "",
          "model" : "company",
          "value" : ""
        }
      ]
    },
    {
      "name" : "meet",
      "label" : "Rendez-vous",
      "selected" : true,
      "icon" : "icon-calendar",
      "parameters" : [
        {
          "label" : "Organisateur",
          "type" : "text",
          "model" : "organizers.lastname",
          "value" : ""
        },
        {
          "label" : "Participants",
          "type" : "text",
          "model" : "contributors.lastname",
          "value" : ""
        }
      ]
    },
    {
      "name" : "todo",
      "label" : "Tâches Exchange",
      "selected" : true,
      "icon" : "icon-edit",
      "parameters" : []
    },
        {
      "name" : "layout",
      "label" : "Pages (layouts)",
      "selected" : true,
      "icon" : "icon-columns",
      "parameters" : []
    },
    {
      "name" : "article",
      "label" : "Articles",
      "selected" : true,
      "icon" : "icon-align-left",
      "parameters" : []
    },
    {
      "name" : "topic",
      "label" : "Actualités",
      "selected" : true,
      "icon" : "icon-file-text-alt",
      "parameters" : []
    },
    {
      "name" : "application",
      "label" : "Les applications",
      "selected" : true,
      "icon" : "icon-dashboard",
      "parameters" : []
    },
    {
      "name" : "rss",
      "label" : "Les flux RSS",
      "selected" : true,
      "icon" : "icon-rss",
      "parameters" : []
    },
    {
      "name" : "library",
      "label" : "Documents Alfresco",
      "selected" : true,
      "icon" : "icon-folder-open-alt",
      "parameters" : []
    },
    {
      "name" : "directory",
      "label" : "L'annuaire",
      "selected" : true,
      "icon" : "icon-group",
      "parameters" : []
    }
  ];

  $scope.deselectall = function() {
    for (var i = 0; i < $scope.sources.length; i++) {
      $scope.sources[i].selected = false;
    }
  }

  $scope.selectall = function() {
    for (var i = 0; i < $scope.sources.length; i++) {
      $scope.sources[i].selected = true;
    }
  }

});

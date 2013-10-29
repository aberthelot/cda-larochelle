'use strict';

angular.module('cdaLarochelleApp')
.controller('SearchEngineCtrl', function ($scope, $rootScope, Document) {
  // on récupère les documents
  $scope.documents = Document.query();

  $scope.display = 'display-list';
  $scope.group = 'global';
  $scope.sort = 'relevance';
  $scope.dropavailable = false;

  $rootScope.$on('moveSource', function(evt, indexBegin, indexEnd) {
    // console.log('SearchEngineCtrl receive \'moveSource\' with parameters indexBegin : ' + indexBegin + ' | indexEnd ' + indexEnd);
    // on récupére la source à enlever
    var sourceRemoved = $scope.sources.splice(indexBegin, 1);
    // on réinjecte la source enlevée
    $scope.sources.splice(indexEnd, 0, sourceRemoved[0]);

    $scope.$apply();
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
      "selected" : false,
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
      "selected" : false,
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
      "selected" : false,
      "icon" : "icon-edit",
      "parameters" : []
    },
        {
      "name" : "layout",
      "label" : "Pages (layouts)",
      "selected" : false,
      "icon" : "icon-columns",
      "parameters" : []
    },
    {
      "name" : "article",
      "label" : "Articles",
      "selected" : false,
      "icon" : "icon-align-left",
      "parameters" : []
    },
    {
      "name" : "topic",
      "label" : "Actualités",
      "selected" : false,
      "icon" : "icon-file-text-alt",
      "parameters" : []
    },
    {
      "name" : "application",
      "label" : "Les applications",
      "selected" : false,
      "icon" : "icon-dashboard",
      "parameters" : []
    },
    {
      "name" : "rss",
      "label" : "Les flux RSS",
      "selected" : false,
      "icon" : "icon-rss",
      "parameters" : []
    },
    {
      "name" : "library",
      "label" : "Documents Alfresco",
      "selected" : false,
      "icon" : "icon-folder-open-alt",
      "parameters" : []
    },
    {
      "name" : "directory",
      "label" : "L'annuaire",
      "selected" : false,
      "icon" : "icon-group",
      "parameters" : []
    }
  ];

  $scope.deselectall = function() {
    for (var i = 0; i < $scope.sources.length; i++) {
      $scope.sources[i].selected = false;
    }
  }

});

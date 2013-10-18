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
      "selected" : false,
      "icon" : "icon-calendar",
      "parameters" : []
    },
    {
      "name" : "todo",
      "selected" : false,
      "icon" : "icon-edit",
      "parameters" : []
    },
        {
      "name" : "layout",
      "selected" : false,
      "icon" : "icon-columns",
      "parameters" : []
    },
    {
      "name" : "article",
      "selected" : false,
      "icon" : "icon-align-left",
      "parameters" : []
    },
    {
      "name" : "topic",
      "selected" : false,
      "icon" : "icon-file-text-alt",
      "parameters" : []
    },
    {
      "name" : "application",
      "selected" : false,
      "icon" : "icon-dashboard",
      "parameters" : []
    },
    {
      "name" : "rss",
      "selected" : false,
      "icon" : "icon-rss",
      "parameters" : []
    },
    {
      "name" : "library",
      "selected" : false,
      "icon" : "icon-folder-open-alt",
      "parameters" : []
    },
    {
      "name" : "directory",
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

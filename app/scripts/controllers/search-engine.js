'use strict';

angular.module('cdaLarochelleApp')
.controller('SearchEngineCtrl', function ($scope, Document) {
  // on récupère les documents
  $scope.documents = Document.query();

  $scope.display = 'display-list';
  $scope.group = 'global';
  $scope.sort = 'relevance';

  $scope.sources = [
    {
      "name" : "email",
      "selected" : true,
      "icon" : "icon-envelope"
    },
    {
      "name" : "contact",
      "selected" : true,
      "icon" : "icon-user"
    },
    {
      "name" : "meet",
      "selected" : true,
      "icon" : "icon-calendar"
    },
    {
      "name" : "todo",
      "selected" : true,
      "icon" : "icon-edit"
    },
        {
      "name" : "layout",
      "selected" : true,
      "icon" : "icon-columns"
    },
    {
      "name" : "article",
      "selected" : true,
      "icon" : "icon-align-left"
    },
    {
      "name" : "topic",
      "selected" : true,
      "icon" : "icon-file-text-alt"
    },
    {
      "name" : "application",
      "selected" : true,
      "icon" : "icon-dashboard"
    },
    {
      "name" : "rss",
      "selected" : true,
      "icon" : "icon-rss"
    },
    {
      "name" : "library",
      "selected" : true,
      "icon" : "icon-folder-open-alt"
    },
    {
      "name" : "directory",
      "selected" : true,
      "icon" : "icon-group"
    }
  ];

});

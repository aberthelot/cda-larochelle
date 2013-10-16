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

  $rootScope.$on('dropon', function(evt) {
    // console.log('SearchEngineCtrl receive \'dropon\'');
    $scope.droponair = 'on';

    $scope.$apply();
  });

  $rootScope.$on('dropoff', function(evt) {
    // console.log('SearchEngineCtrl receive \'dropon\'');
    $scope.droponair = 'off';

    $scope.$apply();
  });

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

'use strict';

angular.module('cdaLarochelleApp')
.controller('SearchEngineCtrl', function ($scope, Document) {
  // on récupère les documents
  $scope.documents = Document.query();

  $scope.sources = {
    email: true,
    contact:true,
    meet:true,
    todo:true,
    layout:true,
    article:true,
    topic:true,
    application:true,
    rss:true,
    library:true,
    directory:true
  };


});

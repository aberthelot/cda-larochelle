'use strict';

angular.module('cdaLarochelleApp')
.controller('SearchEngineCtrl', function ($scope, Document) {
  // on récupère les documents
  $scope.documents = Document.query();

  $scope.display = 'display-list';
  $scope.group = 'global';
  $scope.sort = 'relevance';

  // $scope.sources = [
  //   {
  //     "name" : "email",
  //     "selected" : true
  //   },
  //   {
  //     "name" : "contact",
  //     "selected" : true
  //   },
  // ];  


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

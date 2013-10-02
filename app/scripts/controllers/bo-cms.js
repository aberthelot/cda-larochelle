'use strict';

angular.module('cdaLarochelleApp')
  .controller('BoCmsCtrl', function ($scope, news) {
    // $scope.awesomeThings = [
    //   'HTML5 Boilerplate',
    //   'AngularJS',
    //   'Karma'
    // ];

  // Récupérations des évènements
  // news.query(function(data){
  //  $scope.awesomeThings = data;
  // });

    $scope.news = news.query();

    // console.log('youpi 1');
    // console.log($scope.news);
    // console.log('youpi 2');
  });

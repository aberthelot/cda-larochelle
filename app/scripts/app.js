'use strict';

angular.module('cdaLarochelleApp', [
  'TopicServices',
  'DocumentServices',
  // 'draganddropUI',
  'ui.highlight'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/bo-cms', {
        templateUrl: 'views/bo-cms.html',
        controller: 'BoCmsCtrl'
      })
      .when('/search-engine', {
        templateUrl: 'views/search-engine.html',
        controller: 'SearchEngineCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

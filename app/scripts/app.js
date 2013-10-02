'use strict';

angular.module('cdaLarochelleApp', [])
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
      .when('/search-engin', {
        templateUrl: 'views/serach-engine.html',
        controller: 'SearchEngineCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

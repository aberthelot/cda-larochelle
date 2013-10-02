'use strict';

angular.module('newsServices', ['ngResource'])
  .factory('news', function ($resource) {
    // Service logic
    // ...

    return $resource('/scripts/services/mocks/news.json');

  });

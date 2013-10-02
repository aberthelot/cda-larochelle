'use strict';

angular.module('TopicServices', ['ngResource'])
  .factory('Topic', function ($resource) {
    // Service logic
    // ...

    // return $resource('/scripts/services/mocks/news.json');
    return $resource('/scripts/services/mocks/topics.json');
  });

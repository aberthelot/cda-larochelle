'use strict';

angular.module('DocumentServices', ['ngResource'])
  .factory('Document', function ($resource) {
    return $resource('/scripts/services/mocks/documents.json');
  });


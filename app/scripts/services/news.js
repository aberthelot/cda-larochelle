'use strict';

angular.module('newsServices', [])
  .factory('news', function () {
    // Service logic
    // ...

    // 
    var awesomeThings = [
      'Test A',
      'Test B',
      'Test C'
    ];

    // Public API here
    return {
      someMethod: function () {
        return awesomeThings;
      }
    };
  });

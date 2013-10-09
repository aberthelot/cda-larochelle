'use strict';

describe('Filter: scheduled', function () {

  // load the filter's module
  beforeEach(module('cdaLarochelleApp'));

  // initialize a new instance of the filter before each test
  var scheduled;
  beforeEach(inject(function ($filter) {
    scheduled = $filter('scheduled');
  }));

  it('should return the input prefixed with "scheduled filter:"', function () {
    var text = 'angularjs';
    expect(scheduled(text)).toBe('scheduled filter: ' + text);
  });

});

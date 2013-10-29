'use strict';

describe('Filter: periodfilter', function () {

  // load the filter's module
  beforeEach(module('cdaLarochelleApp'));

  // initialize a new instance of the filter before each test
  var periodfilter;
  beforeEach(inject(function ($filter) {
    periodfilter = $filter('periodfilter');
  }));

  it('should return the input prefixed with "periodfilter filter:"', function () {
    var text = 'angularjs';
    expect(periodfilter(text)).toBe('periodfilter filter: ' + text);
  });

});

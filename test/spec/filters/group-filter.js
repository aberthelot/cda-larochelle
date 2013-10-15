'use strict';

describe('Filter: groupFilter', function () {

  // load the filter's module
  beforeEach(module('cdaLarochelleApp'));

  // initialize a new instance of the filter before each test
  var groupFilter;
  beforeEach(inject(function ($filter) {
    groupFilter = $filter('groupFilter');
  }));

  it('should return the input prefixed with "groupFilter filter:"', function () {
    var text = 'angularjs';
    expect(groupFilter(text)).toBe('groupFilter filter: ' + text);
  });

});

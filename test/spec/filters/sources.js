'use strict';

describe('Filter: sources', function () {

  // load the filter's module
  beforeEach(module('cdaLarochelleApp'));

  // initialize a new instance of the filter before each test
  var sources;
  beforeEach(inject(function ($filter) {
    sources = $filter('sources');
  }));

  it('should return the input prefixed with "sources filter:"', function () {
    var text = 'angularjs';
    expect(sources(text)).toBe('sources filter: ' + text);
  });

});

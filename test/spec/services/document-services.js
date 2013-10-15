'use strict';

describe('Service: documentServices', function () {

  // load the service's module
  beforeEach(module('cdaLarochelleApp'));

  // instantiate service
  var documentServices;
  beforeEach(inject(function (_documentServices_) {
    documentServices = _documentServices_;
  }));

  it('should do something', function () {
    expect(!!documentServices).toBe(true);
  });

});

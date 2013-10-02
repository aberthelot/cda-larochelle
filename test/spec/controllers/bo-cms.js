'use strict';

describe('Controller: BoCmsCtrl', function () {

  // load the controller's module
  beforeEach(module('cdaLarochelleApp'));

  var BoCmsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BoCmsCtrl = $controller('BoCmsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});

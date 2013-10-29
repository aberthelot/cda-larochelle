'use strict';

describe('Directive: myFieldSearch', function () {

  // load the directive's module
  beforeEach(module('cdaLarochelleApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<my-field-search></my-field-search>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the myFieldSearch directive');
  }));
});

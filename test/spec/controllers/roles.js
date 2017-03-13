'use strict';

describe('Controller: RolesCtrl', function () {

  // load the controller's module
  beforeEach(module('skinkApp'));

  var RolesCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RolesCtrl = $controller('RolesCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(RolesCtrl.awesomeThings.length).toBe(3);
  });
});

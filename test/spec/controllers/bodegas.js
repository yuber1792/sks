'use strict';

describe('Controller: BodegasCtrl', function () {

  // load the controller's module
  beforeEach(module('skinkApp'));

  var BodegasCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BodegasCtrl = $controller('BodegasCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(BodegasCtrl.awesomeThings.length).toBe(3);
  });
});

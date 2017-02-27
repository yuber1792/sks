'use strict';

describe('Controller: VisitasCtrl', function () {

  // load the controller's module
  beforeEach(module('skinkApp'));

  var VisitasCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    VisitasCtrl = $controller('VisitasCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(VisitasCtrl.awesomeThings.length).toBe(3);
  });
});

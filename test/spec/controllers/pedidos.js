'use strict';

describe('Controller: PedidosCtrl', function () {

  // load the controller's module
  beforeEach(module('skinkApp'));

  var PedidosCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PedidosCtrl = $controller('PedidosCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(PedidosCtrl.awesomeThings.length).toBe(3);
  });
});

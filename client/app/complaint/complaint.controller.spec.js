'use strict';

describe('Controller: ComplaintCtrl', function () {

  // load the controller's module
  beforeEach(module('buzzAppApp'));

  var ComplaintCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ComplaintCtrl = $controller('ComplaintCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});

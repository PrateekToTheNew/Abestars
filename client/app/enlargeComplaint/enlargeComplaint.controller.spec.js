'use strict';

describe('Controller: EnlargeComplaintCtrl', function () {

  // load the controller's module
  beforeEach(module('buzzAppApp'));

  var EnlargeComplaintCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EnlargeComplaintCtrl = $controller('EnlargeComplaintCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});

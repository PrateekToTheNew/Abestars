'use strict';

describe('Controller: EnlargePostCtrl', function () {

  // load the controller's module
  beforeEach(module('buzzAppApp'));

  var EnlargePostCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EnlargePostCtrl = $controller('EnlargePostCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});

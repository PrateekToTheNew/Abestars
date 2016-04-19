'use strict';

describe('Controller: PostRetrievalCtrl', function () {

  // load the controller's module
  beforeEach(module('buzzAppApp'));

  var ProfileCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ProfileCtrl = $controller('PostRetrievalCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});

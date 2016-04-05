angular.module('App')
.controller('LeftMenuController', function ($scope, Locations) {
  $scope.locations = Locations.data;

  $scope.getIcon = function (current) {
    if (current) {
      return 'ion-ios-navigate';
    }
    return 'ion-ios-location'
  };

})
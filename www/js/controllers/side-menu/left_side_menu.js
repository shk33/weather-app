angular.module('App')
.controller('LeftMenuController', function ($scope, Locations) {
  $scope.locations = Locations.data;
})
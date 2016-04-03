angular.module('App')
.controller('WeatherController', function ($scope, $http, $stateParams, $ionicActionSheet, Settings) {

  $scope.params = $stateParams;
  $scope.settings = Settings;

  /*
  * Obtaning Weather info from API
  */
  $http.get('/api/forecast/' + $stateParams.lat + ',' + $stateParams.lng, 
    {params: {units: Settings.units}})
    .success(function (forecast) {
      $scope.forecast = forecast;
    });


  /*
  * Methods for 3 Paging views in weather info
  */
  var barHeight = document.getElementsByTagName('ion-header-bar')[0].clientHeight;
  $scope.getWidth = function () {
    return window.innerWidth + 'px';
  };
  $scope.getTotalHeight = function () {
    return parseInt(parseInt($scope.getHeight()) * 3) + 'px';
  }; 
  $scope.getHeight = function () {
    return parseInt(window.innerHeight - barHeight) + 'px';
  };

  /*
  * Show Options Menu
  */
  $scope.showOptions = function () {
    var sheet = $ionicActionSheet.show({
      buttons: [
      {text: 'Toggle Favorite'},
      {text: 'Set as Primary'},
      {text: 'Sunrise Sunset Chart'}
      ],
      cancelText: 'Cancel',
      buttonClicked: function (index) {
        if (index === 0) {
          Locations.toggle($stateParams);
        }
        if (index === 1) {
          Locations.primary($stateParams);
        }
        if (index === 2) {
          $scope.showModal();
        }
        return true;
      }
    });
  };

});
angular.module('App', ['ionic','ngCordova'])

.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('search', {
      url: '/search',
      controller: 'SearchController',
      templateUrl: 'views/search/search.html'
    })

    .state('settings', {
      url: '/settings',
      controller: 'SettingsController',
      templateUrl: 'views/settings/settings.html'
    })

    .state('weather', {
      url: '/weather/:city/:lat/:lng',
      controller: 'WeatherController',
      templateUrl: 'views/weather/weather.html'
    })

  $urlRouterProvider.otherwise('/search');

})

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.run(function ($cordovaGeolocation, $http, $state, Locations) {
  $cordovaGeolocation.getCurrentPosition()
  .then(function (data) {
    $http.get('https://maps.googleapis.com/maps/api/geocode/json', 
      {params: {latlng: data.coords.latitude + ',' + data.coords.longitude}})
    .success(function (response) {
        var location = {
          lat: data.coords.latitude,
          lng: data.coords.longitude,
          city: response.results[0].formatted_address,
          current: true
        };

        Locations.data.unshift(location);
        $state.go('weather', location);
        
      });
    });
})
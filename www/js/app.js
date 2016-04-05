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

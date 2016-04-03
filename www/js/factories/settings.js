angular.module('App')
.factory('Settings', function () {
  var Settings = {
    units: 'us',
    days: 8
  };
  return Settings;
});
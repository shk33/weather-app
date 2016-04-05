angular.module('App')
.factory('Locations', function ($ionicPopup) {

  function store () {
    localStorage.setItem('locations', angular.toJson(Locations.data));
  }

  var Locations = {
    data: [],
    getIndex: function (item) {
      var index = -1;
      angular.forEach(Locations.data, function (location, i) {
        if (item.lat == location.lat && item.lng == location.lng) {
          index = i;
        }
      });
      return index;
    },
    toggle: function (item) {
      var index = Locations.getIndex(item);
      if (index >= 0) {
        $ionicPopup.confirm({
          title: 'Are you sure?',
          template: 'This will remove ' + Locations.data[index].city
        }).then(function (res) {
          if (res) {
            Locations.data.splice(index, 1);
          }
        });
      } else {
        Locations.data.push(item);
        $ionicPopup.alert({
          title: 'Location saved'
        });
      }
      store();
    },
    primary: function (item) {
      var index = Locations.getIndex(item);
      if (index >= 0) {
        Locations.data.splice(index, 1);
        Locations.data.splice(0, 0, item);
      } else {
        Locations.data.unshift(item);
      }
      store();
    }
  };

  /*When app starts, tries to
  load data from localStorage
  or else sets a blank array*/
  try {
    var items = angular.fromJson(localStorage.getItem('locations')) || [];
    Locations.data = items;
  } catch (e) {
    Locations.data = [];
  }

  return Locations;
});
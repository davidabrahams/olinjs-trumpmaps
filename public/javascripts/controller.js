var app = angular.module('app', []);

app.controller('home', function ($scope, $filter, $http) {

  var myLatlng = {lat: 42.360, lng: -71.058};

  $scope.map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: myLatlng
  });

  google.maps.event.addListener($scope.map, 'dblclick', function(event) {
    $('#latitude').val(event.latLng.lat());
    $('#longitude').val(event.latLng.lng());
    addMarker(event.latLng, $scope.map);
  });

  function addMarker(location, map) {
    // Add the marker at the clicked location, and add the next-available label
    // from the array of alphabetical characters.
    var marker = new google.maps.Marker({
      position: location,
      label: 'TRUMP',
      map: map
    });
  }
});

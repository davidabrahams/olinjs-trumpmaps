var app = angular.module('app', []);

app.controller('home', function ($scope, $filter, $http) {

  var myLatlng = {lat: 42.360, lng: -71.058};
  $scope.formData = {};
  // $scope.formData.latitude = 39.5;
  // $scope.formData.longitude = -98.350;

  $scope.map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: myLatlng
  });

  $scope.submit = function() {
    $http.post("api/trump", {
      name: $scope.formData.name,
      img: $scope.formData.img,

    }).then(onSuccess);
  };

  google.maps.event.addListener($scope.map, 'dblclick', function(event) {
    $scope.$apply(function () {
      $scope.formData.latLng = event.latLng;
    });
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

  var onSuccess = function(data) {
  };
});

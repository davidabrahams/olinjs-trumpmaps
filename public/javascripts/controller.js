var app = angular.module('app', []);

app.controller('home', function ($scope, $filter, $http) {

  var myLatlng = {lat: 42.360, lng: -71.058};
  var markers = [];
  $scope.formData = {};

  $scope.map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: myLatlng
  });

  $scope.submit = function() {
    $http.post("api/trump", {
      name: $scope.formData.name,
      img: $scope.formData.img,
      latLng: $scope.formData.latLng
    }).then(onSuccess);
  };

  google.maps.event.addListener($scope.map, 'dblclick', function(event) {
    $scope.$apply(function () {
      $scope.formData.latLng = event.latLng;
      var marker = new google.maps.Marker({
        position: event.latLng,
        label: 'TRUMP',
        map: $scope.map
      });
    });
  });

  function addMarker(location, map, img) {
    // Add the marker at the clicked location, and add the next-available label
    // from the array of alphabetical characters.
    var marker = new google.maps.Marker({
      position: location,
      label: 'TRUMP',
      map: map
    });

    var reader = new FileReader();
    reader.onload = function (e) {
      var contentString = '<img src="' + e.target.result + '" alt="your image" />'
      var infowindow = new google.maps.InfoWindow({
        content: contentString
      });
      marker.addListener('click', function() {
        infowindow.open(map, marker);
      });
    };

    // TODO: THIS DOESN'T WORK. THE READER REQUIRES IMG TO BE A 'BLOB', WHICH
    // MONGO CAN'T STORE.

    // reader.readAsDataURL(img);
    return marker;
  }

  function clear_markers() {
    markers.forEach( function(marker) {
      marker.setMap(null);
    });
  }

  var onSuccess = function(data) {
    var trumps = data.data;
    clear_markers();
    trumps.forEach( function (trump) {
      var m = addMarker(trump.latLng, $scope.map, trump.img);
      markers.push(m);
    });
  };

  $scope.uploadImage = function(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function (e) {
        $('#blah')
          .attr('src', e.target.result)
          .width(150)
          .height(200);
      };
      $scope.formData.img = input.files[0];
      reader.readAsDataURL(input.files[0]);
    }
  }

  $http.get('api/trump').then(onSuccess);
});

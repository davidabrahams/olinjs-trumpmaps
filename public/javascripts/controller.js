var app = angular.module('app', []);

app.controller('home', function ($scope, $filter, $http) {
  // I think this file could use a bit of organization -- gather all of the
  // functions on $scope together, gather all of the functions which are local
  // to the controller together, maybe bring the lines which execute right away
  // (e.g. the http.gets at the end) up to the top
  var myLatlng = {lat: 42.360, lng: -71.058}; // could you pull this from somewhere instead of hard-coding?
  var markers = [];
  var infowindows = [];
  $scope.formData = {};

  // Set up map properties
  $scope.map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: myLatlng
  });

  $scope.submit = function() {
    // Making sure all required fields are there
    if ( $scope.formData.name && $scope.formData.img && $scope.formData.lat
         && $scope.formData.lng )
    {
      var data = {
        name: $scope.formData.name,
        img: $scope.formData.img,
        latLng: {lat: $scope.formData.lat, lng: $scope.formData.lng}
      };
      // Post the data and on error (Image bigger than 1MB), warn users
      $http.post("api/trump", data).then(onSuccess, function errorCallback(response){
        $('.error').stop().fadeIn(400).delay(3000).fadeOut(400); // Fade out after 3 seconds
      });
    }
    else
    {
      // what's going on here?
    }
  };

  $scope.comment_submit = function() {
    if ($scope.selectedtrump && $scope.comment_text) {
      var data = {
        id: $scope.selectedtrump._id,
        comment: $scope.comment_text
      };
      $http.post("api/trump/comment", data).then(onSuccess);
    }
  }

  $scope.cancel_comment = function() {
    $scope.showme = 1;
    infowindows.forEach( function(iw) {
      iw.close();
    });
    $('#comment_form').trigger('reset');
    $scope.selectedtrump = null;
  }

  google.maps.event.addListener($scope.map, 'dblclick', function(event) {
    $scope.$apply(function () {
      $scope.formData.lat = event.latLng.lat();
      $scope.formData.lng = event.latLng.lng();
      var marker = new google.maps.Marker({
        position: event.latLng,
        label: 'TRUMP',
        map: $scope.map
      });
    });
  });

  function addMarker(trump, map) {
    // Add the marker at the clicked location, and add the next-available label
    // from the array of alphabetical characters.
    var marker = new google.maps.Marker({
      position: trump.latLng,
      label: 'TRUMP',
      map: map
    });

    var contentString = Handlebars.templates.info_window({img: trump.img})
    var infowindow = new google.maps.InfoWindow({
      content: contentString
    });
    marker.addListener('click', function() {
      $scope.$apply(function () {
        infowindows.forEach( function(iw) {
          iw.close();
        });
        $scope.selectedtrump = trump;
        infowindow.open(map, marker);
        $scope.showme = 2;
        infowindow.addListener('closeclick', function() {
          $scope.$apply(function () {
            $scope.showme = 1;
            $scope.selectedtrump = null;
          });
        })
      });
    });
    infowindows.push(infowindow);

    return marker;
  }

  function clear_markers() {
    markers.forEach( function(marker) {
      marker.setMap(null);
    });
    markers = [];
    infowindows = [];
  }

  // maybe pick one way of declaring functions? as var ___ or as function ___
  // I'm left wondering whether you declared in different ways for a reason, and I don't think there is one --
  // ok with inconsistency but only when there's really good reason for it
  var onSuccess = function(data) {
    var trumps = data.data;
    if ($scope.selectedtrump) {
      $scope.selectedtrump = $.grep(trumps, function(t) {
        return t._id == $scope.selectedtrump._id;
      })[0];
    }
    clear_markers();
    trumps.forEach( function (trump) {
      var m = addMarker(trump, $scope.map);
      markers.push(m);
    });
    $('#form').trigger('reset');
    $('#comment_form').trigger('reset');
    $scope.formData.lat = null;
    $scope.formData.lng = null;
    $scope.showimage = false;
  };

  $scope.uploadImage = function(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function (e) {
        $scope.$apply(function () {
          $scope.formData.img = e.target.result;
          $('#uploaded')
            .attr('src', e.target.result);
          $scope.showimage = true;
        });
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  $http.get('api/trump').then(onSuccess);
  $http.get('loggedin').then(function (data) {
    var user =data.data;
    if (user) {
      $scope.showme = 1;
    } else {
      $scope.showme = 0;
    }

  });
});

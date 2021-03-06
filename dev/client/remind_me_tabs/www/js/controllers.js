angular.module('RemindMe.controllers', ['RemindMe.services'])

.controller('TodosCtrl', ['$scope', '$state', 'UserDoc', function($scope, $state, UserDoc){
  //params for query. change to :username eventually
  //to use locally stored username
  $scope.todos = todos;

  /*
  $scope.todos = [];
  $scope.completed = [];
  todos.forEach(function(todo){
    if(todo.completed) {
      $scope.completed.push(todo);
      console.log(todo.task + " added to complete");
    }
    else {
      $scope.todos.push(todo);
      console.log(todo.task + "added to todos");
    }
  })
  */


  $scope.create = function(){
    $state.go('tab.newtodo');
  };

  $scope.completed = function(todo){
    /*
    this guy needs some work
    */
      todo.completed = !todo.completed;
      //var id = todo._id
      //update todo on server as completed
      UserDoc.update({created:todo.created}, todo);
      console.log(todo.task + " marked as completed");
      //remove from todos array
      $scope.todos.splice($scope.todos.indexOf(todo), 1);
      $scope.completed.push(todo);
  };

  $scope.remove = function(todo){
    console.log("about to delete " + todo.created);
    UserDoc.remove(todo);
    $scope.todos.splice($scope.todos.indexOf(todo), 1);
  };

}])

.controller('TodoDetailCtrl', function($scope, $location) {
  $scope.todo = todo;
  //date is sent from server as string
  //so must convert to date for displaying
  //$scope.date = new Date(todo.date);
})

.controller('NewTodoCtrl', function($scope, $state, UserDoc){//inject service
  $scope.todos = todos;
  $scope.todo = {
    task:'',
    date: '',
    created: '',
    loc: {
      long: '35',
      lat: '35',
    },
    completed: false,
    push_notif: false
  };

  $scope.disableTap = function(){
    container = document.getElementsByClassName('pac-container');
    // disable ionic data tab
    angular.element(container).attr('data-tap-disabled', 'true');
    // leave input field if google-address-entry is selected
    angular.element(container).on("click", function(){
        document.getElementById('searchBar').blur();
    });
  }

  $scope.close = function(){
    //ad logic if stuff was entered to ask 'are you sure?'
    $state.go('tab.todos');
  };

  $scope.createTodo = function(addLocation){
    //add new todo using rest api (PUT)
    if(addLocation){
      console.log("adding place");
      //get placeDetail object from autocomplete bar
      var place = autocomplete.getPlace();
      //set long and lat
      $scope.todo.loc.long = place.geometry.location.D;
      $scope.todo.loc.lat = place.geometry.location.k;
      console.log($scope.todo.loc.long + ' ' + $scope.todo.loc.lat);
    }
    //create new todo
    $scope.todo.created = new Date().getTime();
    UserDoc.create($scope.todo);
    $scope.todos.push($scope.todo);
    $state.go('tab.todos');
  };

  var input = document.getElementById('searchBar');
  var options = {
    types: ['geocode']
  };
  autocomplete = new google.maps.places.Autocomplete(input, options);
})

.controller('MapCtrl', function($scope, $ionicLoading) {
  $scope.mapCreated = function(map) {
    console.log("Map Created");
    $scope.map = map;
    if($scope.todo){
      console.log("todo is present");
      $scope.centerOn();
    }
  };

  $scope.centerOnMe = function () {
    console.log("Centering");
    if (!$scope.map) {
      return;
    }

    $scope.loading = $ionicLoading.show({
      content: 'Getting current location...',
      showBackdrop: false
    });

    navigator.geolocation.getCurrentPosition(function (pos) {
      //is the current coordinates
      console.log('Got pos', pos);
      $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
      $ionicLoading.hide();
    }, function (error) {
      alert('Unable to get location: ' + error.message);
    });
  };

  $scope.centerOn = function() {
    console.log("Centering");
    if (!$scope.map) {
      return;
    }

    $scope.loading = $ionicLoading.show({
      content: 'Getting current location...',
      showBackdrop: false
    });

    $scope.map.setCenter(new google.maps.LatLng(
                          $scope.todo.loc.lat, $scope.todo.loc.long));
    $ionicLoading.hide();

  };
})
/*
.controller('TodoEditCtrl', function($scope, $state){
  $scope.todo = todo;
})
*/

.controller('FriendsCtrl', function($scope, Locations) {
  $scope.locations = Locations.all();
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Locations) {
  $scope.location = Locations.get($stateParams.locationId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});

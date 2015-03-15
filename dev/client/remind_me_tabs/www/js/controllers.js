angular.module('RemindMe.controllers', ['RemindMe.services'])

.controller('TodosCtrl', ['$scope', '$state', 'UserDoc', function($scope, $state, UserDoc){
  //params for query. change to :username eventually
  //to use locally stored username
  $scope.todos = todos;

  $scope.create = function(){
    $state.go('tab.newtodo');
  };

  $scope.completed = function(todo){
      todo.completed = true;
      var id = todo._id
      //update todo on server as completed
      UserDoc.update({_id:id}, todo);
      console.log(todo.task + " marked as completed");
      //remove from todos
      $scope.todos.splice($scope.todos.indexOf(todo), 1);
  };

  $scope.remove = function(todo){
    console.log("about to delete " + todo._id);
    UserDoc.remove(todo);
    $scope.todos.splice($scope.todos.indexOf(todo), 1);
  };

}])

.controller('TodoDetailCtrl', function($scope, $location) {
  $scope.todo = todo;

  //date is sent from server as string
  //so must convert to date for displaying
  //$scope.date = new Date(todo.date);

  $scope.edit = function(){
    console.log($location.path() + '/edit')
    $location.path($location.path() + '/edit');
  }
})

.controller('NewTodoCtrl', function($scope, $state, UserDoc){//inject service
  $scope.todos = todos;
  $scope.todo = {
    task:'',
    date: '',
    long: '35',
    lat: '35',
    completed: false,
    push_notif: false
  };

  $scope.addLocation = false;

  $scope.close = function(){
    //ad logic if stuff was entered to ask 'are you sure?'
    $state.go('tab.todos');
  };

  $scope.createTodo = function(){
    //add new todo using rest api (PUT)
    var place = autocomplete.getPlace();
    console.log(place.geometry.location);
    $scope.todo.long = place.geometry.location.D;
    $scope.todo.lat = place.geometry.location.k
    UserDoc.create($scope.todo);
    $scope.todos.push($scope.todo);
    //update scope of parent somehow
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

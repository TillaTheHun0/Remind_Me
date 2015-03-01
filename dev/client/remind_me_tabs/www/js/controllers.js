angular.module('RemindMe.controllers', ['RemindMe.services'])

.controller('TodosCtrl', ['$scope', '$state', 'UserDoc', function($scope, $state, UserDoc){
  //params for query. change to :username eventually
  //to use locally stored username
  $scope.todos = todos;

  $scope.create = function(){
    $state.go('tab.newtodo');
  };

  $scope.completed = function(todo){

  };

  $scope.remove = function(todo){
    console.log("about to delete " + todo._id);
    UserDoc.remove(todo);
    $scope.todos.splice($scope.todos.indexOf(todo), 1);
  };

}])

.controller('NewTodoCtrl', function($scope, $state, UserDoc){//inject service
  $scope.todo = {
    task:'',
    date: '',
    long: '35',
    lat: '35',
    completed: false,
    push_notif: false
  };
  $scope.close = function(){
    //ad logic if stuff was entered to ask 'are you sure?'
    $state.go('tab.todos');
  };

  $scope.createTodo = function(todos){
    //add new todo using rest api (PUT)
    UserDoc.update($scope.todo);
    //$scope.todos.push($scope.todo);
    //update scope of parent somehow
    $state.go('tab.todos');
  };

})

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

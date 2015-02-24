angular.module('RemindMe.controllers', ['RemindMe.services'])

.controller('TodosCtrl', ['$scope', '$state', function($scope, $state){
  //params for query. change to :username eventually
  //to use locally stored username
  $scope.create = function(){
    $state.go('tab.newtodo');
  };

  $scope.todos = todos;
}])

.controller('NewTodoCtrl', function($scope, $state, UserDoc){

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

  $scope.createTodo = function(){
    //add new todo using rest api (PUT)
    UserDoc.update($scope.todo);
    $state.go('tab.todos');
  };

})

.controller('TodoDetailCtrl', function($scope, $stateParams,$state) {
  /*
  $scope.editTodo = function(){
    $state.go('tab.edittodo');
  };
  */

  $scope.todo = todo;
})

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

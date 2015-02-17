angular.module('RemindMe.controllers', ['RemindMe.services'])

.controller('UserCtrl', ['$scope', 'UserData', function($scope, UserData){
  //params for query. change to :username eventually
  //to use locally stored username
  var params = {username:'tilla'};

  UserData.get(params).$promise.then(function(doc){
    $scope.user = doc;
    $scope.todos = doc.todos;
  });

  //console.log($scope.user);
  /*
  UserData.all().$promise.then(function(data){
    console.log(data[0]);
    $scope.user = data[0];
    $scope.todos = data[0].todos;
  });
  */

}])

.controller('TodosCtrl', function($scope, Todos) {
  $scope.todos = Todos.all();
  $scope.remove = function(todo){Todos.remove(todo);}
})

.controller('TodoDetailCtrl', function($scope, $stateParams, Todos) {
  $scope.todo = Todos.get($stateParams.todoId);
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

angular.module('RemindMe.controllers', ['RemindMe.services'])

.controller('TodosCtrl', ['$scope', function($scope){
  //params for query. change to :username eventually
  //to use locally stored username
  //$scope.user = user;
  $scope.todos = todos;
  /*

  UserData.get(params).$promise.then(function(doc){
    $scope.user = doc;
    $scope.todos = doc.todos;
  });
  */
}])

.controller('TodoDetailCtrl', function($scope, $stateParams) {
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

angular.module('RemindMe.services', ['ngResource'])

.factory('LoginData', function(){
  var user = {
    username: '',
    password: ''
  };

  return{
    getUser: function(){
      return user.username;
    },
    getPass: function(){
      return user.password;
    },
    set: function(username, pass){
      console.log("setting " + username + pass);
      user.username = username;
      user.password = pass;
    }
  }
})

//add actual factory
.factory('UserDoc', function($resource, LoginData){
  //returns resource to RESTful API
  var user = LoginData.getUser();
  console.log(user);
  return $resource('https://polar-thicket-8181.herokuapp.com/api/:username/:created',
  {username: LoginData.getUser(), password: LoginData.getPass()},
  {
    //later change to @username & @todo_id
    create: {method:'PUT'},
    update: {method:'PUT'},
    remove: {method:'DELETE'}
  });
})

.factory('UsersCol', function($resource, $rootScope){
  return $resource('https://polar-thicket-8181.herokuapp.com/api/users',
  {username: "@username", password: "@password"},
  {
    post: {method:'POST'}
  });
})

//test data used initially 
.factory('Todos', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var todos = [{
    id: 0,
    task: 'Do the Laundry',
    time: 'Jan 3, 2015 5:30 PM',
    loCal: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
    id: 1,
    task: 'Pick up dry cleaning',
    time: 'Jan 3, 2015 11:30 AM',
    loCal: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
  }, {
    id: 2,
    task: 'Do Homework',
    time: 'Jan 3, 2015 4:30 PM',
    loCal: 'https://pbs.twimg.com/profile_images/491274378181488640/Tti0fFVJ.jpeg'
  }, {
    id: 3,
    task: 'Pay Rent',
    time: 'Jan 1, 2015 12:00 AM',
    loCal: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  }, {
    id: 4,
    task: 'DO stuff',
    time: 'Jan 5, 2015',
    loCal: 'https://pbs.twimg.com/profile_images/491995398135767040/ie2Z_V6e.jpeg'
  }];

  return {
    all: function() {
      return todos;
    },
    remove: function(todo) {
      todos.splice(todos.indexOf(todo), 1);
    },
    get: function(todoId) {
      for (var i = 0; i < todos.length; i++) {
        if (todos[i].id === parseInt(todoId)) {
          return todos[i];
        }
      }
      return null;
    }
  }
});

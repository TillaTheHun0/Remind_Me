angular.module('RemindMe.services', ['ngResource'])

//add actual factory
.service('UserDoc', function($resource){
  //returns resource to RESTful API
  return $resource('http://localhost:8081/api/:username/:_id',
  {username: 'tilla'},
  {
    //later change to @username & @todo_id
    update: {method:'PUT'},
    remove: {method:'DELETE'}
  });
})

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
})

/**
 * A simple example service that returns some data.
 */
.factory('Locations', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  // Some fake testing data
  var locations = [
  {
    id: 0,
    name: 'Ben Sparrow',
    notes: 'Enjoys drawing things',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    notes: 'Odd obsession with everything',
    face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
  }, {
    id: 2,
    name: 'Andrew Jostlen',
    notes: 'Wears a sweet leather Jacket. I\'m a bit jealous',
    face: 'https://pbs.twimg.com/profile_images/491274378181488640/Tti0fFVJ.jpeg'
  }, {
    id: 3,
    name: 'Adam Bradleyson',
    notes: 'I think he needs to buy a boat',
    face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  }, {
    id: 4,
    name: 'Perry Governor',
    notes: 'Just the nicest guy',
    face: 'https://pbs.twimg.com/profile_images/491995398135767040/ie2Z_V6e.jpeg'
  }];


  return {
    all: function() {
      return locations;
    },
    get: function(locationId) {
      // Simple index lookup
      return locations[locationId];
    }
  }
});

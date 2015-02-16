// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('RemindMe', ['ionic', 'RemindMe.controllers', 'RemindMe.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/tabs.html"
  })

  // Each tab has its own nav history stack:

  .state('tab.user' , {
    url: '/user',
    views: {
      'tab-user': {
        templateUrl: 'templates/User-test.html',
        controller: 'UserCtrl'
      }
    }
  })

  .state('tab.todos', {
    url: '/todos',
    views: {
      'tab-todos': {
        templateUrl: 'templates/tab-todos.html',
        controller: 'TodosCtrl'
      }
    }
  })

  .state('tab.todo-detail', {
    url: '/todos/:todoId',
    views: {
      'tab-todos': {
        templateUrl: 'templates/todo-detail.html',
        controller: 'TodoDetailCtrl'
      }
    }
  })

  /*unused states (chat)
  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })

    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })
  */

  .state('tab.location', {
      url: '/locations',
      views: {
        'tab-locations': {
          templateUrl: 'templates/tab-locations.html',
          controller: 'FriendsCtrl'
        }
      }
    })
    .state('tab.location-detail', {
      url: '/locations/:locationId',
      views: {
        'tab-locations': {
          templateUrl: 'templates/location-detail.html',
          controller: 'FriendDetailCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/todos');
});

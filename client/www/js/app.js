// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'ngRoute'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/menu.html",
      controller: 'AppCtrl'
    })

    .state('app.search', {
      url: "/search",
      views: {
        'menuContent' :{
          templateUrl: "templates/search.html"
        }
      }
    })

    .state('app.question', {
      url: "/question",
      views: {
        'menuContent' :{
          templateUrl: "templates/question.html",
          controller: "QuestionCtrl"
        }
      }
    })

    .state('app.playlists', {
      url: "/playlists",
      views: {
        'menuContent' :{
          templateUrl: "templates/playlists.html",
          controller: 'PlaylistsCtrl'
        }
      }
    })

    .state('app.questions', {
      url: "/questions",
      views: {
        'menuContent' :{
          templateUrl: "templates/questions.html",
          controller: 'QuestionCtrl'
        }
      }
    })

    .state('app.one', {
      url: "/questions/:questionId",
      views: {
        'menuContent' :{
          templateUrl: "templates/question.html",
          controller: 'QuestionCtrl'
        }
      }
    })

    .state('app.subjects', {
                url: "/subjects",
                views: {
                    'menuContent': {
                        templateUrl: "templates/subjects.html"
                    }
                }
            })

            .state('app.topics', {
                url: "/topics",
                views: {
                    'menuContent': {
                        templateUrl: "templates/topics.html",
                        controller: 'topics'
                    }
                }
            })

            .state('app.home', {
                url: "/home",
                views: {
                    'menuContent': {
                        templateUrl: "templates/home.html",
                        controller: 'home'
                    }
                }
            })

            .state('app.testType', {
                url: "/testType",
                views: {
                    'menuContent': {
                        templateUrl: "templates/testType.html"
                    }
                }
            })

            .state('app.signup', {
                url: "/signup",
                views: {
                    'menuContent': {
                        templateUrl: "templates/signup.html",
                        controller: 'signup'
                    }
                }
            })

            .state('app.login', {
                url: "/login",
                views: {
                    'menuContent': {
                        templateUrl: "templates/login.html"
                        //controller: 'signup'
                    }
                }
            })

            .state('app.years', {
                url: "/years",
                views: {
                    'menuContent': {
                        templateUrl: "templates/years.html"
                    }
                }
            })

            .state('app.test', {
                url: '/test',
                views: {
                    'menuContent': {
                        templateUrl: "templates/test.html",
                        controller: 'QuestionCtrl'
                    }
                }
            })

            .state('app.single', {
                url: "/playlists/:playlistId",
                views: {
                    'menuContent': {
                        templateUrl: "templates/playlist.html",
                        controller: 'PlaylistCtrl'
                    }
                }
            })

            .state('app.profile', {
                url: "/profile",
                views: {
                    'menuContent': {
                        templateUrl: "templates/profile.html"
                    }
                }
            });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/login');
});
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

    .state('app.intro', {
        url: '/intro',
        views: {
        'menuContent' :{
          templateUrl: "templates/intro.html",
          controller: 'IntroCtrl'
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

    .state('app.testQuestions', {
      url: "/testQuestions",
      views: {
        'menuContent' :{
          templateUrl: "templates/testQuestions.html",
          controller: "QuestionCtrl"
        }
      }
    })

    .state('app.yearQuestions', {
      url: "/yearQuestions",
      views: {
        'menuContent' :{
          templateUrl: "templates/yearQuestions.html",
          controller: "QuestionCtrl"
        }
      }
    })

    .state('app.tips', {
      url: "/tips",
      views: {
        'menuContent' :{
          templateUrl: "templates/tips.html"
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
            .state('app.testSubjects', {
                url: "/testSubjects",
                views: {
                    'menuContent': {
                        templateUrl: "templates/testSubjects.html"
                    }
                }
            })

            .state('app.yearSubjects', {
                url: "/yearSubjects",
                views: {
                    'menuContent': {
                        templateUrl: "templates/yearSubjects.html"
                    }
                }
            })
            .state('app.topics', {
                url: "/topics",
                views: {
                    'menuContent': {
                        templateUrl: "templates/topics.html"
                    }
                }
            })

            .state('app.testTopics', {
                url: "/testTopics",
                views: {
                    'menuContent': {
                        templateUrl: "templates/testTopics.html"
                    }
                }
            })

            .state('app.yearTopics', {
                url: "/yearTopics",
                views: {
                    'menuContent': {
                        templateUrl: "templates/yearTopics.html"
                    }
                }
            })

            .state('app.home', {
                url: "/home",
                views: {
                    'menuContent': {
                        templateUrl: "templates/home.html"
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

            .state('app.store', {
                url: "/store",
                views: {
                    'menuContent': {
                        templateUrl: "templates/store.html"
                    }
                }
            })

            .state('app.ranking', {
                url: "/ranking",
                views: {
                    'menuContent': {
                        templateUrl: "templates/ranking.html"
                    }
                }
            })

            .state('app.share', {
                url: "/share",
                views: {
                    'menuContent': {
                        templateUrl: "templates/share.html"
                    }
                }
            })

            .state('app.help', {
                url: "/help",
                views: {
                    'menuContent': {
                        templateUrl: "templates/help.html"
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

            .state('app.profile', {
                url: "/profile",
                views: {
                    'menuContent': {
                        templateUrl: "templates/profile.html"
                    }
                }
            })

            .state('app.profileTopic', {
                url: "/profileTopic",
                views: {
                    'menuContent': {
                        templateUrl: "templates/profileTopic.html"
                    }
                }
            });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
});
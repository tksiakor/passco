angular.module('starter.controllers', [])

    .controller('AppCtrl', function ($scope, $ionicModal, $timeout) {
        // Form data for the login modal
        $scope.loginData = {};

        // Create the login modal that we will use later
        $ionicModal.fromTemplateUrl('templates/login.html', {
            scope: $scope
        }).then(function (modal) {
            $scope.modal = modal;
        });

        // Triggered in the login modal to close it
        $scope.closeLogin = function () {
            $scope.modal.hide();
        };

        // Open the login modal
        $scope.login = function () {
            $scope.modal.show();
        };

        // Perform the login action when the user submits the login form
        $scope.doLogin = function () {
            console.log('Doing login', $scope.loginData);

            // Simulate a login delay. Remove this and replace with your login
            // code if using a login system
            $timeout(function () {
                $scope.closeLogin();
            }, 1000);
        };

        $scope.question = "Who is the president of Ghana?";
        $scope.answers = [
            {text: "John Mills", value: "a"},
            {text: "Jerry John Rawlings", value: "b"},
            {text: "John Kuffour", value: "c"},
            {text: "John Mahama", value: "d"}
        ];

        $scope.subjects = [
            {subject: "Core Mathematics", id: 1},
            {subject: "English Language", id: 2},
            {subject: "Social Studies", id: 3},
            {subject: "Integrated Science", id: 4}
        ];
    })

    .controller('PlaylistsCtrl', function ($scope) {
        $scope.playlists = [
            {title: 'Reggae', id: 1},
            {title: 'Chill', id: 2},
            {title: 'Dubstep', id: 3},
            {title: 'Indie', id: 4},
            {title: 'Rap', id: 5},
            {title: 'Cowbell', id: 6}
        ];
    })

    .controller('topics', function ($scope) {
        $scope.topics = [
            {name: "Fractions", id: 1},
            {name: "Algebra", id: 2},
            {name: "Logic", id: 3},
            {name: "Inequalities", id: 4},
            {name: "Transformation", id: 5},
            {name: "Numbers", id: 6},
            {name: "Graphs", id: 7},
            {name: "Sets", id: 8}
        ];
    })

    .controller('home', function ($scope) {

    })

    .controller('PlaylistCtrl', function ($scope, $stateParams) {
    });

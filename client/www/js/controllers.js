angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $http, $timeout, $location) {

  var url = "http://128.199.54.243:3001/getall";

  // Form data for the login modal
  $scope.loginData = {};
  $scope.signUpData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  $scope.user={
            isAuthenticated : true, //false by default
            username : "",
            authenticate : function(){
                if(this.isAuthenticated==false)
                $location.path("/app/login");
            },
            startApp : function () {
                $location.path("/app/home");
            },
            logout : function(){
                this.isAuthenticated=false;
                this.username = "";
            }
        };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function () {
            //console.log('Doing login', $scope.loginData);
            //$http.get("http://128.199.54.243:3001/auth?uname="+$scope.loginData.username+"&pwd="+$scope.loginData.password+"")
                //.success(function (response) {
                    //console.log(response);
                    //if(response ==1) {
                        $scope.user.isAuthenticated = true;
                        $scope.user.username = $scope.loginData.username;
                        $scope.user.startApp();
                    //}
                //});
  };

  // Perform the signup action when the user submits the signup form
        $scope.doSignup = function () {
            console.log('Doing signup', $scope.signUpData);

            // Simulate a login delay. Remove this and replace with your login
            // code if using a login system
            $http.get("http://128.199.54.243:3001/register?fname="+$scope.signUpData.firstName+"&uname="+$scope.signUpData.username+"&lname="+$scope.signUpData.lastName+"&pwd="+$scope.signUpData.password+"")
                .success(function (response) {
                    console.log(response);
                    if(response==1){
                        $location.path("/app/login");
                    }
                });
            $timeout(function () {
                $scope.closeLogin();
            }, 1000);
        };

    $scope.subjects = [
            //{subject: "Core Mathematics", id: 1},
            //{subject: "English Language", id: 2},
            {subject: "Social Studies", id: "Social Studies"}
            //{subject: "Integrated Science", id: 4}
        ];

        $scope.currentTopics = {
            requestTopics: function () {
                $http.get("http://128.199.54.243:3001/listss")
                    .success(function (response) {
                        //this.topics = response;
                        $scope.currentTopics.topics = response;
                        console.log($scope.currentTopics.topics);
                    });
            },
            topics: ""
        };

        $scope.selectedItems = {
            topic: "",
            subject: "",
            testType: "",
            testTypeUrl: "",
            setTopic: function (newTopic) {
                this.topic = newTopic;
            },
            setSubject: function (newSubject, e) {
                this.subject = newSubject;
                $scope.currentTopics.requestTopics();
                //console.log($scope.currentTopics.topics);
            },
            setTestType: function (newType, e) {
                this.testType = newType;
                if (newType == 1)
                    this.setTestTypeUrl("#/app/topics");
                else
                    this.setTestTypeUrl("#/app/years");
            },
            setTestTypeUrl: function (url) {
                this.testTypeUrl = url;
            }
        };

   $scope.connect = function(meth, link){
      var request = $http({
                        method: meth,
                        url: link,
                        params: {
                            action: meth
                        }
                    });
      console.log("Request returns: "+ request);
      return request;
  }

  $scope.toggleSubmit = function(){
    $scope.state = "disabled";
  }

  $scope.check = function(){

  }

})

.controller('ProgressCtrl', function($scope) {
  $scope.progress = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {


})

.controller('QuestionsCtrl', function($scope) {
    
  
})

.controller('topics', function ($scope) {
        $scope.user.authenticate();
    })

    .controller('subjects',function ($scope){
        $scope.user.authenticate();
    })

    .controller('test',function ($scope){
        $scope.user.authenticate();
    })

    .controller('testType',function ($scope){
        $scope.user.authenticate();
    })

    .controller('years',function ($scope){
        $scope.user.authenticate();
    })

    .controller('signup', function ($scope) {
        $scope.user = {
            username: "",
            password: "",
            firstName: "",
            lastName: "",
            setUsername: function (newUsername) {
                this.username = newUsername;
            },
            setPassword: function (newPassword) {
                this.password = newPassword;
            },
            setFirstName: function (newFirstName) {
                this.password = newFirstName;
            },
            setLastName: function (newLastName) {
                this.password = newLastName;
            },
            setAll:function (username,password,firstName,lastName){
                this.username=username;
                this.password=password;
                this.firstName = firstName;
                this.lastName = lastName;
                //console.log(this.firstName,this.password,this.firstName,this.lastName);
            },
            signup:function(username,password,firstName,lastName){
                this.setAll(username,password,firstName,lastName);
            }
        }

    })


.controller('QuestionCtrl', function($scope, $stateParams) {
  $scope.questions = [
      {_id:"546478ff8923185200139ca5",
        session:"J",
        subject:"Social Studies",
        topic:"A",
        question:"Who is the president of Ghana? ",
        ans_a:"John Mills",
        ans_b:"John Mahama",
        ans_c:"John Kuffour",
        ans_d:"John Rawlings",
        ans_e:"",
        answer:4,
        year:[]
      },

      {_id:"c33328ff892318520013946c",
        session:"J",
        subject:"Social Studies",
        topic:"A",
        question:"Population census in Ghana is conducted under the auspices of the ",
        ans_a:"Ministry of Economic Planning",
        ans_b:"Ministry of Information",
        ans_c:"Statistical Service",
        ans_d:"Electoral Commission",
        ans_e:"",
        answer:4,
        year:[]
      },

      {_id:"a46478ff8923185200139ca1",
        session:"J",
        subject:"Social Studies",
        topic:"A",
        question:"Which ministry is responsible for the population census ",
        ans_a:"Ministry of Economic Planning",
        ans_b:"Ministry of Information",
        ans_c:"Statistical Service",
        ans_d:"Electoral Commission",
        ans_e:"",
        answer:4,
        year:[]
      }];

      $scope.size = 0;
      for ( property in $scope.questions)   
      {
          if($scope.questions.hasOwnProperty(property))
          {
              $scope.size++;
          }
      }

      $scope.status=true;
      $scope.ans = {selected:false};
      $scope.state = function(status) {
        if($scope.ans.selected===false)
          return true;
        else
          return false;
      };
      
      
      $scope.chosen =function(val){
        if(val){
          $scope.ans.value=val;   
           $scope.state();
        }

      };
      $scope.count = 0;
      $scope.activeQ = $scope.questions[0];

      $scope.nextQ = function(){
        $scope.ans = {selected:false};
        // Grade current question
        if($scope.ans.value===$scope.activeQ.answer){
          console.log("Correct!"+$scope.ans.value);
        }
        else{
          console.log("Wrong"+$scope.ans.value);
        }
        
        // Move to next question
        if($scope.count<$scope.size-1)
          $scope.count++;

        return $scope.questions[$scope.count];
      };
      $scope.prevQ = function(){
        if($scope.count>0)
          $scope.count--;
        return $scope.questions[$scope.count];
      };




})

.controller('ResultsCtrl', function($scope) {
  
})



    .controller('home', function ($scope) {
        $scope.user.authenticate();
        //ask for subject
        //by topic or by year
        //get questions
        //but start button to start timer
        //show question
    })

    .controller('PlaylistCtrl', function ($scope, $stateParams) {
    });
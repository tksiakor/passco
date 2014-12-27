angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $http, $timeout, $location, $q) {

  var url = "http://128.199.54.243:3001/getall";

  // Form data for the login modal
  $scope.loginData = {};
  $scope.signUpData = {};

  $scope.setQuestions = function(res){
        $scope.questions = res;
        console.log("Serialized: "+ $scope.questions);
  };

  $scope.getFiveQ = function(topic){
        var defer = $q.defer();
        $scope.allQues = {};
        $http.get('http://128.199.54.243:3001/getfive?topic='+topic)
          .success(function(res){
            $scope.setQuestions(res);
            console.log("Scope: " + $scope.questions[0].id);
            defer.resolve(res);
          })
          .error(function(err,status){
            defer.reject(err);
          })
          console.log("Promises: "+defer.promise);
          return defer.promise;
      };

      $scope.fiveQ = function(topic){
        $scope.getFiveQ(topic)
          .then(function(res){
            //success
            console.log("Online connection successful");
          }, function(err){
            //error
            console.log("Internet not working");
          });

        };
       

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
                console.log("Topic Code: "+newTopic);
                $scope.getFiveQ(this.topic)
                .then(function(res){
                  //success
                  $location.path("/app/question");
                }, function(err){
                  //error
                });
                

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


.controller('QuestionCtrl', function($scope, $stateParams, $q, $http, $location) {

      $scope.size = 0;
      for (property in $scope.questions)   
      {
          if($scope.questions.hasOwnProperty(property))
          {
              $scope.size++;
          }
      }
        $scope.isDisabled = false;
        
        $scope.setDisabled = function(){
          $scope.isDisabled = true;
        }

        $scope.showAns = function(){
          return $scope.isDisabled;
        };

        $scope.loadNew = function(topic){
          $scope.getFiveQ(topic)
          .then(function(res){
                  //success
                  //$route.reload();
                  $location.path('/app/topics');
                }, function(err){
                  //error
                });
        }

        $scope.isHidden = true;

        $scope.viewResults = function(){
          $scope.isDisabled = true;
          $scope.isHidden = false;
          console.log($scope.correctQ);
          
        }

        $scope.ansCount = 1;

        //console.log($scope.questions[0].choices[0]);
          
      $scope.condition = function(){return $scope.isHidden};
      
      $scope.numCorrect = 0;
      $scope.correctQ = {qid:""};


      $scope.checkAns = function(qid, choice, answer){
        if(choice===parseInt(answer)){
          console.log("Correct!" + choice);
          $scope.numCorrect++;
          $scope.color = 'balanced';
          //if ( !( 'qid' in $scope.correctQ ) ) {
              $scope.correctQ['qid'] = qid;
          //}   
          //$scope.correctQ.push(qid);
        }
        else{
          console.log("Wrong" + choice);
          $scope.color = 'assertive';
        }

      }
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

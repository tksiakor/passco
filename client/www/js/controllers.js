angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $http, $timeout) {

  var url = "http://128.199.54.243:3000/getall";
  // $http.get(url).success(function (data) {
  //       console.log(url);
  //       $scope.get = data;
  //       console.log($scope.get);

  //   $scope.quesans = {
  //                     "id": $scope.get._id, 
  //                     "session" :$scope.get.session, 
  //                     "subject":$scope.get.subject, 
  //                     "topic": $scope.get.topic, 
  //                     "question":$scope.get.question,
  //                     "a":$scope.get.ans_a,
  //                     "b":$scope.get.ans_b,
  //                     "c":$scope.get.ans_c,
  //                     "d":$scope.get.ans_d,
  //                     "e":$scope.get.ans_e,
  //                     "ans":$scope.get.answer,
  //                     "year":$scope.get.year
  //                   }
  //     });

  // Form data for the login modal
  $scope.loginData = {};

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

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
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



  
  // {"_id":"546478ff8923185200139ca5",
  //   "session":"J",
  //   "subject":"Social Studies",
  //   "topic":"A",
  //   "question":"Population census in Ghana is conducted under the auspices of the ",
  //   "ans_a":"Ministry of Economic Planning",
  //   "ans_b":"Ministry of Information",
  //   "ans_c":"Statistical Service",
  //   "ans_d":"Electoral Commission",\
  //   "ans_e":"",
  //   "answer":4,
  //   "year":[]
  // }



  $scope.toggleSubmit = function(){
    $scope.state = "disabled";
  }

  $scope.check = function(){
    
      //console.log("Chosen: " + chosen);
      //console.log("Passed: " + $scope.answer);
      //console.log("Correct: " + $scope.quesans.ans);

      
    
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
        // Grade current question
        if($scope.ans.value===$scope.activeQ.answer){
          console.log("Correct!"+$scope.ans.value);
        }
        else{
          console.log("Wrong"+$scope.ans.value);
        }
        $scope.ans = {selected:false};
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
  
});
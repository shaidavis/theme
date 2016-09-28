//The QuestionCtrl is for issues related to the admin's creation and display of Questions
app.controller('FacebookCtrl', ['$scope', 'questions', 'qa', 'facebook', '$location', '$route', '$window', function($scope, questions, qa, facebook, $location, $route, $window) {

 

  $scope.thisUserFriendCount = facebook.thisUserFriendCount
  $scope.allUsersFriendCountsAvg = facebook.allUsersFriendCountsAvg
  $scope.allUsersFriendCountsMedian = facebook.allUsersFriendCountsMedian

  $scope.allUsersFirstNameLengthAvg = facebook.allUsersFirstNameLengthAvg
  $scope.allUsersLastNameLengthAvg = facebook.allUsersLastNameLengthAvg
  $scope.allUsersFullNameLengthAvg = facebook.allUsersFullNameLengthAvg
  $scope.allUsersEmailLengthAvg = facebook.allUsersEmailLengthAvg

  $scope.thisUserFirstNameLength = facebook.thisUserFirstNameLength
  $scope.thisUserLastNameLength = facebook.thisUserLastNameLength
  $scope.thisUserFullNameLength = facebook.thisUserFullNameLength
  $scope.thisUserEmailLength = facebook.thisUserEmailLength

  $scope.thisUserFirstNameFirstLetter = facebook.thisUserFirstNameFirstLetter
  $scope.thisUserLastNameFirstLetter = facebook.thisUserLastNameFirstLetter

  $scope.allUsersMaleCount = facebook.allUsersMaleCount
  $scope.allUsersFemaleCount = facebook.allUsersFemaleCount


  $scope.data1 = [facebook.thisUserFriendCount, facebook.allUsersFriendCountsAvg, facebook.allUsersFriendCountsMedian]
  $scope.labels1 = ['Your Friend Count', 'Average Friend Count', 'Median Friend Count']
  $scope.options = {
      scales: {
        xAxes: [{
          ticks: {
            autoSkip: false,
            maxRotation: 0,
            minRotation: 0
          }
        }],
        yAxes: [{
          ticks: {
            
            userCallback: function(label, index, labels) {
                         // when the floored value is the same as the value we have a whole number
                         if (Math.floor(label) === label) {
                             return label;
                         }
                     }
                },

          id: 'y-axis-1',
          type: 'linear',
          display: true,
          position: 'left'
        }]
      }
    }


  $scope.data2 = [
  [facebook.thisUserFirstNameLength, facebook.thisUserLastNameLength, facebook.thisUserFullNameLength, facebook.thisUserEmailLength],
  [facebook.allUsersFirstNameLengthAvg, facebook.allUsersLastNameLengthAvg, facebook.allUsersFullNameLengthAvg, facebook.allUsersEmailLengthAvg]
  ];

  // $scope.data2 = [
  //   [65, 59, 80, 10],
  //   [28, 48, 40, 11]
  // ]

  // $scope.colors2 = ['black', 'black', 'black'];
  $scope.labels2 = ["First Name", "Last Name", "Full Name", "Email"];
  $scope.series2 = ['You', 'User Average'];
  $scope.options2 = {
      scales: {
        xAxes: [{
          ticks: {
            autoSkip: false,
            maxRotation: 0,
            minRotation: 0
          }
        }]
      }
    }


  $scope.data3 = 
  [
    facebook.allFirstNameLettersCount,
    facebook.allLastNameLettersCount
  ]
  $scope.labels3 = facebook.alphabet
  // $scope.data3 = [facebook.allFirstNameLettersCount]
  // $scope.labels3 = [facebook.allFirstNameLetters]
  $scope.series3 = ['First Name Initial', 'Last Name Initial'];
  $scope.options3 = {
      scales: {
        xAxes: [{
          ticks: {
            autoSkip: false,
            maxRotation: 0,
            minRotation: 0
          }
        }]
      }
    }

  $scope.data4 = facebook.allUsersGenderCount
  $scope.labels4 = ["Female", "Male", "Non-Binary", "Unspecified"],
  // $scope.data3 = [facebook.allFirstNameLettersCount]
  // $scope.labels3 = [facebook.allFirstNameLetters]
  // $scope.series3 = ['First Name Initial', 'Last Name Initial'];
  $scope.options3 = {
      scales: {
        xAxes: [{
          ticks: {
            autoSkip: false,
            maxRotation: 0,
            minRotation: 0
          }
        }]
      }
    }

    


   $scope.getThisUserFacebookInfo = function(){
      console.log("1. inside getThisUserFacebookInfo - controller")
      facebook.getThisUserFriendCount()
      
    }



  

 
}]);


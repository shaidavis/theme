//The QuestionCtrl is for issues related to the admin's creation and display of Questions
app.controller('FacebookCtrl', ['$scope', 'questions', 'qa', 'facebook', '$location', '$route', '$window', function($scope, questions, qa, facebook, $location, $route, $window) {

  $scope.thisUserFriendCount = facebook.thisUserFriendCount
  $scope.allUsersFriendCountsAvg = facebook.allUsersFriendCountsAvg
  $scope.allUsersFriendCountsMedian = facebook.allUsersFriendCountsMedian
  
  $scope.data1 = [facebook.thisUserFriendCount, facebook.allUsersFriendCountsAvg, facebook.allUsersFriendCountsMedian]
  $scope.labels1 = ['Your Friend Count', 'Average User Friend Count', 'Median User Friend Count']


   $scope.getThisUserFacebookInfo = function(){
      console.log("1. inside getThisUserFacebookInfo - controller")
      facebook.getThisUserFriendCount()
      
    }



  

 
}]);


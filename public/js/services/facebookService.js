app.factory('facebook', ['$http', function($http) {

var facebookService = {


    thisUserFriendCount:'',
    thisUserFirstNameFirstLetter:'',
    thisUserLastNameFirstLetter:'',
    thisUserFirstNameLength:'',
    thisUserLastNameLength:'',
    thisUserFullNameLength:'',
    thisUserEmailLength:'',
    thisUserGender:'',

    allUsersFriendCounts:[],
    allUsersFriendCountsAvg: '',
    allUsersFriendCountsMedian: '',
    allUsersFirstNameFirstLetter:[],
    allUsersLastNameFirstLetter:[],
    allUsersFirstNameLength:[],
    allUsersLastNameLength:[],
    allUsersFullNameLength:[],
    allUsersEmailLength:[],
    allUsersGender:[],
    
    
    

    getThisUserFacebookInfo: function(){
      console.log("2. inside getThisUserFacebookInfo - service")
      return $http.get('/facebook/user/getinfo').then(function(data){

        facebookService.thisUserFriendCount = data.data.friendCount
        // facebookService.friendCountData.push(facebookService.thisUserFriendCount)
        facebookService.thisUserFirstNameFirstLetter = data.data.firstName.charAt(0)
        facebookService.thisUserLastNameFirstLetter = data.data.lastName.charAt(0)
        facebookService.thisUserFirstNameLength = data.data.firstName.length
        facebookService.thisUserLastNameLength = data.data.lastName.length
        facebookService.thisUserFullNameLength = ((data.data.firstName.length) + (data.data.lastName.length))
        facebookService.thisUserEmailLength = data.data.email.length
        facebookService.thisUserGender = data.data.gender

        console.log(facebookService.thisUserFriendCount)
        console.log(facebookService.thisUserFirstNameFirstLetter)
        console.log(facebookService.thisUserLastNameFirstLetter)
        console.log(facebookService.thisUserFirstNameLength)
        console.log(facebookService.thisUserLastNameLength)
        console.log(facebookService.thisUserFullNameLength)
        console.log(facebookService.thisUserEmailLength)
        console.log(facebookService.thisUserGender)
      })

    },
   
    getAllUserFacebookInfo: function(){
      console.log("2. inside getAllUserFacebookInfo - service")

      return $http.get('/facebook/users/getinfo').then(function(data){
        for (i = 0; i < data.data.length; i ++){
          facebookService.allUsersFriendCounts.push(data.data[i].friendCount)
          let friendCounts = facebookService.allUsersFriendCounts
          let allUsersFriendCountsSum = friendCounts.reduce((previous, current) => current += previous);
          facebookService.allUsersFriendCountsAvg = allUsersFriendCountsSum / friendCounts.length;

          friendCounts.sort(function(a, b) {
            return a - b;
          });

          var middle = Math.floor((friendCounts.length - 1) / 2); // NB: operator precedence
          if (friendCounts.length % 2) {
              facebookService.allUsersFriendCountsMedian = friendCounts[middle];
          } else {
              facebookService.allUsersFriendCountsMedian = (friendCounts[middle] + friendCounts[middle + 1]) / 2.0;
          }
          
          // facebookService.friendCountData.push(facebookService.allUsersFriendCountsMedian)
          // facebookService.friendCountData.push(facebookService.allUsersFriendCountsAvg)

          facebookService.allUsersFirstNameFirstLetter.push(data.data[i].firstName.charAt(0))
          facebookService.allUsersLastNameFirstLetter.push(data.data[i].lastName.charAt(0))
          facebookService.allUsersFirstNameLength.push(data.data[i].firstName.length)
          facebookService.allUsersLastNameLength.push(data.data[i].lastName.length)
          facebookService.allUsersFullNameLength.push((data.data[i].firstName.length)+(data.data[i].lastName.length))
          facebookService.allUsersEmailLength.push(data.data[i].email.length)
          facebookService.allUsersEmailLength.push(data.data[i].gender)

        }
        
        console.log(facebookService.allUsersFriendCounts)
        console.log("*", facebookService.allUsersFriendCountsAvg)
        console.log("*", facebookService.allUsersFriendCountsMedian)
        console.log(facebookService.allUsersFirstNameFirstLetter)
        console.log(facebookService.allUsersFirstNameFirstLetter)
        console.log(facebookService.allUsersLastNameFirstLetter)
        console.log(facebookService.allUsersFirstNameLength)
        console.log(facebookService.allUsersLastNameLength)
        console.log(facebookService.allUsersEmailLength)
        console.log(facebookService.allUsersGender)
        console.log(data.data)
        
      })

    },


    


  };
  

  return facebookService;
}]);
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

    allUsersFirstNameLengthAvg:'',
    allUsersLastNameLengthAvg:'',
    allUsersFullNameLengthAvg:'',
    allUsersEmailLengthAvg:'',


    allUsersFirstNameLength:[],
    allUsersLastNameLength:[],
    allUsersFullNameLength:[],
    allUsersFirstNameFirstLetter:[],
    allUsersLastNameFirstLetter:[],
    allUsersEmailLength:[],
    
    
    allUsersGender:[],
    allUsersGenderLabels:['female', 'male', 'non-binary', 'unspecified'], 
    allUsersGenderCount:[0, 0, 0, 0],
    allUsersMaleCount: '',
    allUsersFemaleCount: '',
    
    alphabet:["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
    allFirstNameLettersCount:[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    allLastNameLettersCount:[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    
    

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
          facebookService.allUsersFriendCountsAvg = Math.round(allUsersFriendCountsSum / friendCounts.length);

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


          facebookService.allUsersFirstNameLength.push(data.data[i].firstName.length)
          facebookService.allUsersLastNameLength.push(data.data[i].lastName.length)
          facebookService.allUsersFullNameLength.push((data.data[i].firstName.length)+(data.data[i].lastName.length))
          facebookService.allUsersEmailLength.push(data.data[i].email.length)
          facebookService.allUsersGender.push(data.data[i].gender.toLowerCase())


          

          let allUsersFirstNameLengthSum = facebookService.allUsersFirstNameLength.reduce((previous, current) => current += previous);
          facebookService.allUsersFirstNameLengthAvg = Math.round(allUsersFirstNameLengthSum / facebookService.allUsersFirstNameLength.length);

          let allUsersLastNameLengthSum = facebookService.allUsersLastNameLength.reduce((previous, current) => current += previous);
          facebookService.allUsersLastNameLengthAvg = Math.round(allUsersLastNameLengthSum / facebookService.allUsersLastNameLength.length);

          let allUsersFullNameLengthSum = facebookService.allUsersFullNameLength.reduce((previous, current) => current += previous);
          facebookService.allUsersFullNameLengthAvg = Math.round(allUsersFullNameLengthSum / facebookService.allUsersFullNameLength.length);

          let allUsersEmailLengthSum = facebookService.allUsersEmailLength.reduce((previous, current) => current += previous);
          facebookService.allUsersEmailLengthAvg = Math.round(allUsersEmailLengthSum / facebookService.allUsersEmailLength.length);



          facebookService.allUsersFirstNameFirstLetter.push(data.data[i].firstName.charAt(0).toUpperCase())
          facebookService.allUsersFirstNameFirstLetter.sort()

          console.log(facebookService.allUsersFirstNameFirstLetter.length)
          
          facebookService.allUsersLastNameFirstLetter.push(data.data[i].lastName.charAt(0).toUpperCase())
          facebookService.allUsersLastNameFirstLetter.sort()



          if(i == data.data.length-1){
            for ( var j = 0; j < facebookService.allUsersFirstNameFirstLetter.length; j++) {

              var indexOfLetter = facebookService.alphabet.indexOf(facebookService.allUsersFirstNameFirstLetter[j])
              facebookService.allFirstNameLettersCount[indexOfLetter]++

              // if (facebookService.allUsersFirstNameFirstLetter[j] === "A"){
              //   facebookService.allFirstNameLettersCount[0] += 1
              // }
              // if (facebookService.allUsersFirstNameFirstLetter[j] === "B"){
              //   facebookService.allFirstNameLettersCount[1] +=  1
              // }
              // if (facebookService.allUsersFirstNameFirstLetter[j] === "C"){
              //   facebookService.allFirstNameLettersCount[2] +=  1
              // }
              // if (facebookService.allUsersFirstNameFirstLetter[j] === "D"){
              //   facebookService.allFirstNameLettersCount[3] +=  1
              // }
              // if (facebookService.allUsersFirstNameFirstLetter[j] === "E"){
              //   facebookService.allFirstNameLettersCount[4] +=  1
              // }
              // if (facebookService.allUsersFirstNameFirstLetter[j] === "F"){
              //   facebookService.allFirstNameLettersCount[5] //////////////ææ//////æææ+=  1
              // }
              // if (facebookService.allUsersFirstNameFirstLetter[j] === "G"){
              //   facebookService.allFirstNameLettersCount[6] +=  1
              // }
              // if (facebookService.allUsersFirstNameFirstLetter[j] === "H"){
              //   facebookService.allFirstNameLettersCount[7] += 1
              // }
              // if (facebookService.allUsersFirstNameFirstLetter[j] === "I"){
              //   facebookService.allFirstNameLettersCount[8] += 1
              // }
              // if (facebookService.allUsersFirstNameFirstLetter[j] === "J"){
              //   facebookService.allFirstNameLettersCount[9] += 1
              // }            
            }            
          }

          if(i == data.data.length-1){
            for ( var k = 0; k < facebookService.allUsersLastNameFirstLetter.length; k++) {

              var indexOfLetter = facebookService.alphabet.indexOf(facebookService.allUsersLastNameFirstLetter[k])
              facebookService.allLastNameLettersCount[indexOfLetter]++
      
            }            
          }
          

          if(i == data.data.length-1){
            for ( var l = 0; l < facebookService.allUsersGender.length; l++) {

              var indexOfGender = facebookService.allUsersGenderLabels.indexOf(facebookService.allUsersGender[l])
              facebookService.allUsersGenderCount[indexOfGender]++
            }
          }

          // facebookService.allUsersFirstNameLength:'',
          // facebookService.allUsersLastNameLengthAvg:'',
          // facebookService.allUsersFullNameLengthAvg:'',
          // facebookService.allUsersEmailNameLengthAvg:'', 
        console.log(facebookService.allUsersFirstNameFirstLetter)
        console.log(facebookService.allUsersLastNameFirstLetter)
        console.log(facebookService.allUsersGender)
        console.log("@@", facebookService.allFirstNameLettersCount)
        console.log("@@", facebookService.allLastNameLettersCount)
        console.log("@@", facebookService.allUsersGenderCount)
      }        
      })


    },

  };
  

  return facebookService;
}]);
//The Answer service is for issues related to the Users' input of answers to questions
app.factory('answers', ['$http', function($http) {


var answerService = {

    answers:[],
    answersSpecific:[],


    getAllAnswers: function() {
      return $http.get('/answers').then(function(data) {
        
        angular.copy(data.data, answerService.answers);
      });
    },

    // getCurrentQuestion: function(id) {
      
    //   return $http.get('/questions/id').then(function(data) {
    //     res.send();
    //   });
    // },

    // GET DISPLAY EACH ANSWER SUBMITTED. IN THE QUESTION.HTML, USE {{answer.answerText[0].value}}
    getAllAnswersToThisInputQ: function(id){
      console.log("inside the getAllAnswersToThisQ - service ")
      return $http.get('/questions/'+id+'/answers').success(function(data){
        console.log("OK, I'm back from the answer route!")
        console.log("here are the answers:", data)
        console.log("Type of data:", typeof data)
        for (i = 0; i < data.length; i ++) {
          answerService.answersSpecific.push(data[i])
        }

      });

    },

    getAllAnswersToThisSelectQ: function(id){
      console.log("inside the getAllAnswersToThisQ - service ")
      return $http.get('/questions/'+id+'/answers').success(function(data){
        // console.log("OK, I'm back from the answer route!")
        console.log("here are the answers:", data)
        // console.log("Type of data:", typeof data)
        var answer1 = {
          count:0,
          value:'',
          questionID:''
        }
        var answer2 = {
          count: 0,
          value: '',
          questionID:''
        }
        var answer3 = {
          count: 0,
          value: '',
          questionID:''
        }
        var answer4 = {
          count: 0,
          value: '',
          questionID:''
        }


        for (i = 0; i < data.length; i ++) {
          
          if(data[i].answerText[0].key == 1){
            answer1.count += 1;
            answer1.value = data[i].answerText[0].value
            answer1.questionID = data[i].questionID
          } else if (data[i].answerText[0].key == 2){
            answer2.count += 1;
            answer2.value = data[i].answerText[0].value
            answer2.questionID = data[i].questionID
          } else if (data[i].answerText[0].key == 3){
            answer3.count += 1;
            answer3.value = data[i].answerText[0].value  
            answer3.questionID = data[i].questionID        
          } else if (data[i].answerText[0].key == 4){
            answer4.count += 1;
            answer4.value = data[i].answerText[0].value
            answer4.questionID = data[i].questionID        
          }
        }
        answerService.answersSpecific.push(answer1)
        answerService.answersSpecific.push(answer2)
        answerService.answersSpecific.push(answer3)
        answerService.answersSpecific.push(answer4)
        console.log('answerService.answersSpecific:', answerService.answersSpecific)
      })

    },



    createAnswer: function(answer) {
      console.log("createAnswer: I'm in the answer service!")
      console.log("answer:", answer)



      return $http.post('/answer', answer).success(function(data){
        console.log("I'm back from the answer route!")
        console.log("here's the answer:", data)
        answerService.answers.push(data);
      });
    },



    // whoIsCurrentUser: function(){
    //   $window.localStorage['rereddit-jwt'];
    //   var token = auth.getToken();
    //   var payload = JSON.parse($window.atob(token.split('.')[1]))
    //   var id = payload._id
    //   console.log(id)
    // }


  };  
  return answerService;
}]);



    // GET DISPLAY EACH ANSWER SUBMITTED. IN THE QUESTION.HTML, USE {{answer.answerText[0].value}}
    // getAllAnswersToThisQ: function(id){
    //   console.log("inside the getAllAnswersToThisQ - service ")
    //   return $http.get('/questions/'+id+'/answers').success(function(data){
    //     console.log("OK, I'm back from the answer route!")
    //     console.log("here are the answers:", data)
    //     console.log("Type of data:", typeof data)
    //     for (i = 0; i < data.length; i ++) {
    //       answerService.answersSpecific.push(data[i])
    //     }

    //   });

    // },



    //AGGREGATE ANSWERS AND JUST DISPLAY THE COUNT FOR EACH
    // getAllAnswersToThisQ: function(id){
    //   console.log("inside the getAllAnswersToThisQ - service ")
    //   return $http.get('/questions/'+id+'/answers').success(function(data){
    //     // console.log("OK, I'm back from the answer route!")
    //     console.log("here are the answers:", data)
    //     // console.log("Type of data:", typeof data)
    //     var answer1 = {
    //       count:0,
    //       value:''
    //     }
    //     var answer2 = {
    //       count: 0,
    //       value: ''
    //     }
    //     var answer3 = {
    //       count: 0,
    //       value: ''
    //     }
    //     var answer4 = {
    //       count: 0,
    //       value: ''
    //     }

    //     for (i = 0; i < data.length; i ++) {
    //       console.log(data[i].answerText[0].key)
    //       if(data[i].answerText[0].key == 1){
    //         answer1.count += 1;
    //         answer1.value = data[i].answerText[0].value
    //       } else if (data[i].answerText[0].key == 2){
    //         answer2.count += 1;
    //         answer2.value = data[i].answerText[0].value
    //       } else if (data[i].answerText[0].key == 3){
    //         answer3.count += 1;
    //         answer3.value = data[i].answerText[0].value          
    //       } else if (data[i].answerText[0].key == 4){
    //         answer4.count += 1;
    //         answer4.value = data[i].answerText[0].value
    //       }
    //     }

    //     console.log("answercount:", answer1)
    //     console.log("answercount:", answer2)
    //     console.log("answercount:", answer3)
    //     console.log("answercount:", answer4)
    //     answerService.answersSpecific.push(answer1)
    //     answerService.answersSpecific.push(answer2)
    //     answerService.answersSpecific.push(answer3)
    //     answerService.answersSpecific.push(answer4)

    //   })

    // },
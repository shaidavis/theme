app.factory('questions', ['$http', function($http) {

var questionService = {

    questions:[],
    randomQuestion:[],
    answeredQuestions:[],
    // unansweredQuestions: new Set(),
    unansweredRandomQ: {},



    getRandomQuestion: function () {
      return $http.get('/question/random').then(function(data) {
        angular.copy(data.data, questionService.randomQuestion);
        console.log("service - random question", data.data)
        
      });
    },    

    getAll: function() {
      return $http.get('/question/all-questions').then(function(data) {       
        angular.copy(data.data, questionService.questions);
      });
    },

    getUserAnsweredQuestions: function() {
      // console.log("2. inside the getUserAnsweredQuestions service function")
      return $http.get('/questions/user/answered').then(function(data){
         // console.log('answered questions:', data.data.answers)
         angular.copy(data.data, questionService.answeredQuestions);
        
        });
    },

    // getRandomUnansweredQforUser: function() {
    // console.log("2. inside the getRandomUnansweredQforUser service function")
    //   // questionService.unansweredRandomQ = []
    //     // questionService.getUserAnsweredQuestions().then(function(){     

    //     var randomInt = Math.floor(Math.random() * ((questionService.questions.length-1) - 0 + 1)) + 0;
    //     var randomQ = questionService.questions[randomInt]
    //     console.log("random question:", randomQ)
    //     console.log("questionService.answeredQuestions:", questionService.answeredQuestions.answers)
    //     console.log('randomQ:', randomQ)
    //     console.log("questionService.answeredQuestions.answers.length", questionService.answeredQuestions.answers.length)
    //     if(questionService.answeredQuestions.answers.length > 0){
    //       for(i = 0; i < questionService.answeredQuestions.answers.length; i ++){
    //           console.log(questionService.answeredQuestions.answers[i].questionID + " and " + randomQ._id)
    //           if(questionService.answeredQuestions.answers[i].questionID === randomQ._id){
    //             console.log("called again")
    //             questionService.getRandomUnansweredQforUser()            
    //           }
    //           else{
    //             console.log("good, no match")
    //             questionService.unansweredRandomQ = randomQ
    //             // angular.copy(randomQ, questionService.unansweredRandomQ)
    //             console.log(randomQ);
    //             return randomQ;
    //           }
    //         }
    //       } else {
    //         console.log("there were no answers")
    //         return randomQ
    //       }    
    // },


    getRandomUnansweredQforUser: function() {
      console.log("alll questions:", questionService.questions)
      console.log("answered questions:", questionService.answeredQuestions)
      function getRandQ(){
          return questionService.questions[Math.floor(Math.random() * questionService.questions.length)]
        }
      
      let randQ = null
      while(!randQ){
        randQ = getRandQ()
          for(var i = 0; i < questionService.answeredQuestions.answers.length; i++){
                  if(questionService.answeredQuestions.answers[i]._id == randQ._id){
                      console.log("MATCHED****", questionService.answeredQuestions.answers[i]._id, "and", randQ._id)
                      randQ = null
                  }
              }
          }
          console.log(randQ)
          return randQ
      

    },

    get: function(id) {
      return $http.get('/questions/' + id).then(function(res){
        return res.data;
      });
    },

    createQuestion: function(question) {
      console.log("I'm in the service!")
      console.log(question)

      return $http.post('/question', question).success(function(data){
        console.log("I'm back from the route!")
        questionService.questions.push(data);
      });
    },


  };
  

  return questionService;
}]);
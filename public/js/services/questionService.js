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
      console.log("2. inside the getUserAnsweredQuestions service function")
      return $http.get('/questions/user/answered').then(function(data){
         console.log('answered questions:', data.data)

         angular.copy(data.data, questionService.answeredQuestions);
        
        });
    },




    getRandomUnansweredQforUser: function() {
      questionService.getUserAnsweredQuestions()
      console.log("alll questions:", questionService.questions)
      console.log('---------------------------------------------')
      console.log("answered questions:", questionService.answeredQuestions.answers)
      function getRandQ(){
        
          return questionService.questions[Math.floor(Math.random() * questionService.questions.length)]
        }
      
      let randQ = null
      while(!randQ){
        randQ = getRandQ()
        console.log('can we use this random  q?', randQ)
          for(var i = 0; i < questionService.answeredQuestions.answers.length; i++){
                console.log('hey from the get random =======================================', randQ)
                  if(questionService.answeredQuestions.answers[i].questionID === randQ._id){
                      console.log("******MATCHED****", questionService.answeredQuestions.answers[i].questionID, "and", randQ._id)
                      randQ = null
                  }
              }
          console.log(randQ)
          return randQ
          }
      

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
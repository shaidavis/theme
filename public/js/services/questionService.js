app.factory('questions', ['$http', function($http) {

var questionService = {

    questions:[],

    getAll: function() {
      return $http.get('/questions').then(function(data) {
        for (i = 0; i <data.data.length; i ++){
          if(data.data[i].visible === true){
            console.log(JSON.stringify(data.data[i].text) + " is unanswered")
            questionService.questions.push(data.data[i])
          } else {
            console.log(JSON.stringify(data.data[i].text) + "is answered")
          }
        }
        console.log("service data", data)
        
        // angular.copy(data.data, questionService.questions);
      });
    },

    getUserAnsweredQuestions: function() {
      return $http.get('/questions/user/answered').then(function(data){
        for (i = 0; i <data.data.length; i ++){
          if(data.data[i].answerText[i]){
            console.log(data.data[i].questionID.text + ": " + JSON.stringify(data.data[i].answerText[i].value))
         } else {
            console.log(data.data[i].questionID.text)
         }
        }
      })
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
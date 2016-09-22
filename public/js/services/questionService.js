app.factory('questions', ['$http', function($http) {

var questionService = {

    questions:[],

    getAll: function() {
      return $http.get('/questions').then(function(data) {
        
        angular.copy(data.data, questionService.questions);
      });
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
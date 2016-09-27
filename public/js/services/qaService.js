app.factory('qa', ['$http', function($http) {

var qaService = {


    questions:[],
    randomQuestion:[],
    answeredQuestions:[],
    // unansweredQuestions: new Set(),
    unansweredRandomQ: {},
	answers:[],
    answersSpecific:[],
    usersAnswers:[],

    getAllAnswers: function() {
      return $http.get('/answers').then(function(data) {
        
        angular.copy(data.data, qaService.answers);
      });
    },

    getAllAnswersToThisInputQ: function(id){
      console.log("inside the getAllAnswersToThisQ - service ")
      return $http.get('/questions/'+id+'/answers').success(function(data){
        console.log("OK, I'm back from the answer route!")
        console.log("here are the answers:", data)
        console.log("Type of data:", typeof data)
        for (i = 0; i < data.length; i ++) {
          qaService.answersSpecific.push(data[i])
        }

      });

    },
    getAllAnswersToThisSelectQ: function(id){
      console.log("inside the getAllAnswersToThisQ - service ")
      return $http.get('/questions/'+id+'/answers').success(function(data){
        // console.log("OK, I'm back from the answer route!")
        // console.log("getAllAnswersToThisSelectQ Here are the answers:", data)
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
        qaService.answersSpecific.push(answer1)
        qaService.answersSpecific.push(answer2)
        qaService.answersSpecific.push(answer3)
        qaService.answersSpecific.push(answer4)
        console.log('getAllAnswersToThisSelectQ: qaService.answersSpecific:', qaService.answersSpecific)
      })

    },



    createAnswer: function(answer) {
      console.log("3. createAnswer: I'm in the answer service!")
      console.log("4. answer:", answer)



      return $http.post('/answer', answer).success(function(data){
        console.log("7. I'm back from the answer route!")
        console.log("8. here's the answer:", data)
        qaService.answers.push(data);
        console.log("9. qaService.answers:", qaService.answers)
      });
    },


    getRandomQuestion: function () {
      return $http.get('/question/random').then(function(data) {
        angular.copy(data.data, qaService.randomQuestion);
        console.log("service - random question", data.data)
        
      });
    },    

    getAll: function() {
    	console.log("hi")
      return $http.get('/question/all-questions').then(function(data) {       
        angular.copy(data.data, qaService.questions);
      });
    },

    getUserAnsweredQuestions: function() {
      console.log("2. inside the getUserAnsweredQuestions service function")
      return $http.get('/questions/user/answered').then(function(data){
         console.log('answered questions:', data.data)

         angular.copy(data.data, qaService.answeredQuestions);
        
        });
    },




    getRandomUnansweredQforUser: function() {
      qaService.getUserAnsweredQuestions()
      console.log("alll questions:", qaService.questions)
      console.log('---------------------------------------------')
      console.log("answered questions:", qaService.answeredQuestions.answers)
      function getRandQ(){
        
          return qaService.questions[Math.floor(Math.random() * qaService.questions.length)]
        }
      
      let randQ = null
      while(!randQ){
        randQ = getRandQ()
        console.log('A can we use this random  q?', randQ)
          for(var i = 0; i < qaService.answeredQuestions.answers.length; i++){
          		console.log('B can we use this random  q? - inside The FOR', randQ)
                console.log('hey from the get random =======================================', randQ)
                  if(qaService.answeredQuestions.answers[i].questionID === randQ._id){
                      console.log("******MATCHED****", qaService.answeredQuestions.answers[i].questionID, "and", randQ._id)
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



  };
  

  return qaService;
}]);
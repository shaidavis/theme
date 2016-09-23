//The AnswerCtrl is for issues related to the Users' input of answers to questions

app.controller('AnswerCtrl', ['$scope', 'answers', 'questions', '$location', '$route', function($scope, answers, questions, $location, $route) {
	
	$scope.questions = questions.questions;
	$scope.answers = answers.answers
	$scope.answersSpecific = answers.answersSpecific
	$scope.categoryIcon = ''

	$scope.categoryIcons = function (question){
      if (question.category === "Preferences"){
        $scope.categoryIcon = "http://i.imgur.com/tkh8pai.png"
      }
	}
  
	$scope.currentQuestion = function(question, answer){

		if(question._id === answer.questionID){
			return true;
		} else {
			return false;
		}
	}


	$scope.shareAnswer = function() {
	  alert("this is how i'll share an answer on social media")
	}

	$scope.getAllAnswers = function(question){
		console.log("get all answers")
	}


	$scope.submitSelectAnswer = function (question, answerText) {		
		console.log("answerTextType:", typeof answerText)
		//for "select" answers, i need to turn the string into an object so I can retrieve just the value
		let answerTextObject = JSON.parse(answerText)
		
		console.log("answerTextObject.value:", answerTextObject.value)
		let answer = {
			userID: '',
			questionID: question._id,
			answerText: []
		}
		//Take the parsed answerObject and push it into the array,
		//this is my way of 'sneaking' an object into a schema.
		//I want this as an answer so I can have a key as well as a value and run calculations.
		answer.answerText.push(answerTextObject)
		answers.createAnswer(answer);
		question.visible = false;
		answers.getAllAnswersToThisSelectQ(question._id)


	}


	// $scope.submitInputAnswer = function (question, answerText) {
	// 	let answerTextObject = {
	// 		key: '',
	// 		value: answerText
	// 	}
	// 	let answer = {
	// 		userID: '',
	// 		questionID: question._id,
	// 		answerText: []
	// 	}
	// 	answer.answerText.push(answerTextObject)
	// 	console.log("answerTextType:", typeof answerText)
	// 	answers.createAnswer(answer);
	// 	question.visible = false;
	// 	answers.getAllAnswersToThisSelectQ(question._id)
	// }

	// WORKING VERSION OF SUBMITINPUTANSWER
	$scope.submitInputAnswer = function (question, answerText) {		
		console.log("answerTextType:", typeof answerText)
		answers.createAnswer({ 
			userID: '',
		  	questionID: question._id,
	  		answerText: answerText
		});
		question.visible = false;
		answers.getAllAnswersToThisInputQ(question._id)
	}

}]);




//The AnswerCtrl is for issues related to the Users' input of answers to questions

app.controller('AnswerCtrl', ['$scope', 'qa','$location', '$route', function($scope, qa, $location, $route) {
	$scope.randomQuestion = qa.randomQuestion	
	$scope.questions = qa.questions;
	$scope.answers = qa.answers
	$scope.answersSpecific = qa.answersSpecific
	$scope.userAnswers = qa.userAnswers
	$scope.singleRandomQ = qa.unansweredRandomQ

	// $scope.singleRandomQ = questions.unansweredRandomQ

	// $scope.getRandomUnansweredQforUser = function(){
	//  // $scope.singleRandomQ = []
 //     console.log("1. inside the controller getRandomUnansweredQforUser function")
 //     questions.getRandomUnansweredQforUser().then(function(randomQ){
 //     	console.log(randomQ);
 //     	$scope.singleRandomQ = randomQ
 //    	 })
 //     	console.log("3. back from service")
 // 	 }


	$scope.getRandomUnansweredQforUser = function(){
	 // $scope.singleRandomQ = []
     console.log("1. inside the controller getRandomUnansweredQforUser function")
     $scope.singleRandomQ = qa.getRandomUnansweredQforUser()
     // console.log("&&&&&&", questions.getRandomUnansweredQforUser())
     // questions.getRandomUnansweredQforUser().then(function(randomQ){
     // 	$scope.singleRandomQ = randomQ;
     // 	console.log(randomQ)
     // 	console.log("3. back from service")
     // 	})
 	 }

	$scope.getRandomQuestion = function () {
	    console.log("in randomQuestion controller function")
	    questions.getRandomQuestion() 
	 }
  
	$scope.currentQuestion = function(question, answer){
		if(question._id === answer.questionID){
			return true;
		} else {
			return false;
		}
	}

	$scope.currentRandomUnansweredQuestion = function(singleRandomQ, answer){
		console.log("inside currentRandomUnansweredQuestion")
		if(singleRandomQ._id === answer.questionID){
			console.log("inside currentRandomUnansweredQuestion - the question id matches the answered question")
			return true;
		} else {
			return false;
		}
	}


	$scope.currentRandomQuestion = function(randomQuestion, answer){
		if(randomQuestion._id === answer.questionID){
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


//SUBMIT ANSWERS - ALL QUESTION PAGE
	//submitSelectAnswer - all questions
	$scope.submitSelectAnswer = function (question, answerText) {		
		console.log("answerTextType:", typeof answerText)
		//for "select" answers, i need to turn the string of the answerText into an object so I can retrieve just the value
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
		qa.createAnswer(answer);
		question.visible = false;
		qa.getAllAnswers()
		qa.getAllAnswersToThisSelectQ(question._id)
	}

	// WORKING VERSION OF SUBMITINPUTANSWER - all questions
	$scope.submitInputAnswer = function (question, answerText) {		
		console.log("answerTextType:", typeof answerText)
		qa.createAnswer({ 
			userID: '',
		  	questionID: question._id,
	  		answerText: answerText
		});
		question.visible = false;
		qa.getAllAnswers()
		qa.getAllAnswersToThisInputQ(question._id)
	}

//SUBMIT ANSWERS - SINGLE RANDOM QUESTION PAGE
	//single random questions
	$scope.submitRandomSelectAnswer = function (randomQuestion, answerText) {		
		console.log("1. answerTextType:", typeof answerText)
		//for "select" answers, i need to turn the string of the answerText into an object so I can retrieve just the value
		let answerTextObject = JSON.parse(answerText)
		
		console.log("2. answerTextObject.value:", answerTextObject.value)
		let answer = {
			userID: '',
			questionID: randomQuestion._id,
			answerText: []
		}
		//Take the parsed answerObject and push it into the array,
		//this is my way of 'sneaking' an object into a schema.
		//I want this as an answer so I can have a key as well as a value and run calculations.
		answer.answerText.push(answerTextObject)
		qa.createAnswer(answer);
		randomQuestion.visible = false;
		qa.getAllAnswers()
		qa.getAllAnswersToThisSelectQ(randomQuestion._id)
	}

	// WORKING VERSION OF SUBMITINPUTANSWER -random quesiton
	$scope.submitRandomInputAnswer = function (randomQuestion, answerText) {		
		console.log("answerTextType:", typeof answerText)
		qa.createAnswer({ 
			userID: '',
		  	questionID: randomQuestion._id,
	  		answerText: answerText
		});
		randomQuestion.visible = false;
		qa.getAllAnswers()
		qa.getAllAnswersToThisInputQ(randomQuestion._id)
	}



}]);




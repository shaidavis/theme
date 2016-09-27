//The AnswerCtrl is for issues related to the Users' input of answers to questions

app.controller('AnswerCtrl', ['$scope', 'qa','$location', '$route', function($scope, qa, $location, $route) {
	$scope.randomQuestion = qa.randomQuestion	
	$scope.questions = qa.questions;
	$scope.answers = qa.answers
	$scope.answersSpecific = qa.answersSpecific
	$scope.userAnswers = qa.userAnswers
	$scope.singleRandomQ = qa.unansweredRandomQ

	  $scope.colors = ['#45b7cd', '#ff6384', '#ff8e72'];
	  // $scope.labels = ["Jan", "Feb", "Mar"];
	  $scope.series = ['Series A', 'Series B'];
	  // $scope.data = [
	  //   [65, 59, 80],
	  //   [28, 48, 40]
	  // ];

  
  {{$scope.answersSpecific}} 
  $scope.data = []
  $scope.labels = []
 //  $scope.colors = [{
 //    fillColor: ['#e84c3d', '#d43a2c'],
 //    strokeColor: 'rgba(47, 132, 71, 0.8)',
 //    highlightFill: ['#d43a2c','#e84c3d'],
 //    highlightStroke: 'rgba(47, 132, 71, 0.8)'
	// }];

  $scope.onClick = function (points, evt) {
    console.log(points, evt);
  };
  $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];
  $scope.options = {
    scales: {
      yAxes: [
        {
          ticks: {
    		beginAtZero: true,
   			min: 0,
   			userCallback: function(label, index, labels) {
                     // when the floored value is the same as the value we have a whole number
                     if (Math.floor(label) === label) {
                         return label;
                     }
                 }
          	},

          id: 'y-axis-1',
          type: 'linear',
          display: true,
          position: 'left'
        },
        {
          id: 'y-axis-2',
          type: 'linear',
          display: false,
          position: 'right'
        }
      ]
    }
  };

  $scope.tallySelect = function (question){
  	console.log(question)
  	$scope.data = []
  	$scope.labels = []
  	let answer1 = {count: 0, value: ''}
  	let answer2 = {count: 0, value: ''}
  	let answer3 = {count: 0, value: ''}
  	let answer4 = {count: 0, value: ''}
  	 	
  	console.log("question.answerOptions", question.answerOptions)

    answer1.value = question.answerOptions[0].value
    answer2.value = question.answerOptions[1].value
    if (question.answerOptions.length == 3){
    	answer3.value = question.answerOptions[2].value    	
    }
    if (question.answerOptions.length == 4){
    	answer3.value = question.answerOptions[2].value    	
    	answer4.value = question.answerOptions[3].value
    }
    
    console.log(answer1.count)
    console.log(answer2.count)
    console.log(answer3.count)
    console.log(answer4.count)

        
  	for (i = 0; i < question.answersCollected.length; i ++) {
          
          if(question.answersCollected[i].answerText[0].key == 1){
            answer1.count += 1;
            
          } else if (question.answersCollected[i].answerText[0].key == 2){
            answer2.count += 1;
            
          } else if (question.answersCollected[i].answerText[0].key == 3){
            answer3.count += 1;
                
          } else if (question.answersCollected[i].answerText[0].key == 4){
            answer4.count += 1;
               
          }
        }

    console.log(answer1.count)
    console.log(answer2.count)
    console.log(answer3.count)
    console.log(answer4.count)

    $scope.data.push(answer1.count)
    $scope.labels.push(answer1.value)
    $scope.data.push(answer2.count)
    $scope.labels.push(answer2.value)
    if (answer3.value.length > 0){
	    $scope.data.push(answer3.count)
	    $scope.labels.push(answer3.value)
    }
	if (answer4.value.length > 0){
		$scope.data.push(answer4.count)
	    $scope.labels.push(answer4.value)
	}    




  };

$scope.tallyInput = function (question){
  	console.log(question)
  	$scope.data = []
  	$scope.labels = []
  	 	

        
  	for (i = 0; i < question.answersCollected.length; i ++) {
  		$scope.data.push(question.answersCollected[i].answerText[0])
  		
     }

   

  };

  

  // $scope.data = Admin.chart;



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
	    qa.getRandomQuestion() 
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
		qa.getAllAnswers()
		qa.getAllAnswersToThisSelectQ(question._id)
		$scope.tallySelect(question)
		question.visible = false;
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
		//for "select" answers, i need to turn the string of the answerText into an object so I can retrieve just the value
		let answerTextObject = JSON.parse(answerText)
		
		
		let answer = {
			userID: '',
			questionID: randomQuestion._id,
			answerText: []
		}
		//Take the parsed answerObject and push it into the array,
		//this is my way of 'sneaking' an object into a schema.
		//I want this as an answer so I can have a key as well as a value and run calculations.
		answer.answerText.push(answerTextObject)
		// randomQuestion.answersCollected.push(answer)
		qa.getAllAnswers()
		qa.getAllAnswersToThisSelectQ(randomQuestion._id)
		qa.createAnswer(randomQuestion, answer);
		$scope.tallySelect(randomQuestion)
		$scope.userAnswer = answerTextObject.value
		randomQuestion.visible = false;
		// 
	}

	// WORKING VERSION OF SUBMITINPUTANSWER -random quesiton
	$scope.submitRandomInputAnswer = function (randomQuestion, answerText) {		

		let answer = {
			userID: '',
			questionID: randomQuestion._id,
			answerText: answerText
		}

		qa.getAllAnswers()
		qa.getAllAnswersToThisInputQ(randomQuestion._id)
		qa.createAnswer(randomQuestion, answer);
		$scope.tallyInput(randomQuestion)
		$scope.userAnswer = answerText
		randomQuestion.visible = false;
		
	}



}]);




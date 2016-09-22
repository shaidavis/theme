//The QuestionCtrl is for issues related to the admin's creation and display of Questions
app.controller('QuestionCtrl', ['$scope', 'questions', '$location', '$route', '$window', function($scope, questions, $location, $route, $window) {


    

   $scope.createQuestion = function() {
   	console.log("CreateQuestion activated!")
    if ($scope.type === "Text") {
        
    } else if ($scope.type === "Number") {

    } else if ($scope.type === "Multiple") {

    } else {

    }

    let answerOptions = []
    if ($scope.answer1 !== undefined) {
    answerOptions.push({key: 1, value: $scope.answer1})      
    }
    if ($scope.answer2 !== undefined) {
    answerOptions.push({key: 2, value: $scope.answer2})      
    }
    if ($scope.answer3 !== undefined) {
    answerOptions.push({key: 3, value: $scope.answer3})      
    }
    if ($scope.answer4 !== undefined) {
    answerOptions.push({key: 4, value: $scope.answer4})      
    }

    let visible = ""
    if ($scope.visible == "true"){
       visible = true
    } else {
       visible = false
    }
    
    questions.createQuestion({ 
      text: $scope.text, 
      inputType: $scope.type,
      category: $scope.category,
      visible: visible,
      graphType: $scope.graph,
      source: $scope.source,
      weight: $scope.weight,
      answerOptions: answerOptions
      

    });

    
      $scope.text = '';
      $scope.inputType = '';
      $scope.category = '';
      $scope.weight = '';
      $scope.answer1 = '';
      $scope.answer2 = '';
      $scope.answer3 = '';
      $scope.answer4 = '';

   
   $route.reload();
  

  }


 
}]);


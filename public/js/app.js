var app = angular.module('MyApp', ['ngRoute', 'satellizer', 'chart.js']);
  app.config(['$routeProvider','$locationProvider', '$authProvider', function($routeProvider, $locationProvider, $authProvider) {


    $locationProvider.html5Mode(true);

    $routeProvider
      .when('/', {
        templateUrl: 'partials/home.html'
      })
      .when('/charts', {
        templateUrl: 'partials/charts.html',
        controller: 'ChartsCtrl'
      })
      .when('/contact', {
        templateUrl: 'partials/contact.html',
        controller: 'ContactCtrl'
      })
      .when('/login', {
        templateUrl: 'partials/login.html',
        controller: 'LoginCtrl',
        resolve: { skipIfAuthenticated: skipIfAuthenticated }
      })
      .when('/signup', {
        templateUrl: 'partials/signup.html',
        controller: 'SignupCtrl',
        resolve: { skipIfAuthenticated: skipIfAuthenticated }
      })
      .when('/account', {
        templateUrl: 'partials/profile.html',
        controller: 'ProfileCtrl',
        resolve: { loginRequired: loginRequired }
      })
      .when('/forgot', {
        templateUrl: 'partials/forgot.html',
        controller: 'ForgotCtrl',
        resolve: { skipIfAuthenticated: skipIfAuthenticated }
      })
      .when('/question', {
        templateUrl: 'partials/question.html',
        controller: 'AnswerCtrl',
        resolve: {
          questionPromise: ['questions', function(questions){
          return questions.getRandomQuestion();
          }],
          answerPromise: ['answers', function(answers){
          return answers.getAllAnswers();
          }] 
        }
      })   
      .when('/single-random-q', {
        templateUrl: 'partials/single-random-q.html',
        controller: 'AnswerCtrl',
        resolve: {
          getAllQuestionsPromise: ['questions', function(questions){
          return questions.getAll();
          }],
          getUserAnsweredQuestionsPromise: ['questions', function(questions){
          return questions.getUserAnsweredQuestions();
          }]
          // ,
          // getRandomUnansweredQPromise: ['questions', function(questions){
          // return questions.getRandomUnansweredQforUser();
          // }]          
        }   
      })    
      .when('/all-questions', {
        templateUrl: 'partials/all-questions.html',
        controller: 'AnswerCtrl',
        resolve: {
          questionPromise: ['questions', function(questions){
          return questions.getAll();
          }],
          answerPromise: ['answers', function(answers){
          return answers.getAllAnswers();
          }]

          
        }
      })
      .when('/all-answers', {
        templateUrl: 'partials/all-questions.html',
        controller: 'AnswerCtrl',
        resolve: {
          questionPromise: ['questions', function(questions){
          return questions.getAll();
          }],
          answerPromise: ['answers', function(answers){
          return answers.getAllAnswers();
          }]
          
        }
      })
      .when('/user/answers', {
        templateUrl: 'partials/all-answers.html',
        controller: 'AnswerCtrl',
        resolve: {

          userAnswers: ['answers', function(answers){
          var userId = JSON.parse(localStorage.user)._id;
          return answers.getUsersAnsweredQs(userId);
          }],
    
          questionPromise: ['questions', function(questions){
          return questions.getAll();
          }],
          answerPromise: ['answers', function(answers){
          return answers.getAllAnswers();
          }]
          
        }
      })
      .when('/question-creator', {
        templateUrl: 'partials/question-creator.html',
        controller: 'QuestionCtrl'
      })
      .when('/reset/:token', {
        templateUrl: 'partials/reset.html',
        controller: 'ResetCtrl',
        resolve: { skipIfAuthenticated: skipIfAuthenticated }
      })
      .otherwise({
        templateUrl: 'partials/404.html'
      });

    $authProvider.loginUrl = '/login';
    $authProvider.signupUrl = '/signup';
    $authProvider.facebook({
      url: '/auth/facebook',
      clientId: '538603316330604',
      redirectUri: 'http://localhost:3000/auth/facebook/callback'
    });

    function skipIfAuthenticated($location, $auth) {
      if ($auth.isAuthenticated()) {
        $location.path('/');
      }
    }

    function loginRequired($location, $auth) {
      if (!$auth.isAuthenticated()) {
        $location.path('/login');
      }
    }
  }
]);

  app.run(function($rootScope, $window) {
    if ($window.localStorage.user) {
      $rootScope.currentUser = JSON.parse($window.localStorage.user);
    }
  });

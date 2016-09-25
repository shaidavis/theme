var express = require('express');
var path = require('path');
var logger = require('morgan');
var compression = require('compression');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var dotenv = require('dotenv');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var moment = require('moment');
var request = require('request');


// Load environment variables from .env file
dotenv.load();



// Models
var Answer = require('./models/Answer');
var Question = require('./models/Question');
var User = require('./models/User');


// Controllers AKA ROUTES
var userController = require('./controllers/user');
var contactController = require('./controllers/contact');
var questionController = require('./controllers/questions')
var answerController = require('./controllers/answers')

var app = express();

mongoose.connect('mongodb://localhost/theme');

// mongoose.connect(process.env.MONGODB || 'mongodb://localhost/theme');


mongoose.connection.on('error', function() {
  console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
  process.exit(1);
});
app.set('port', process.env.PORT || 3000);
app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use(function(req, res, next) {
  req.isAuthenticated = function() {
    var token = (req.headers.authorization && req.headers.authorization.split(' ')[1]) || req.cookies.token;
    try {
      return jwt.verify(token, process.env.TOKEN_SECRET);
    } catch (err) {
      return false;
    }
  };

  if (req.isAuthenticated()) {
    var payload = req.isAuthenticated();
    User.findById(payload.sub, function(err, user) {
      req.user = user;
      next();
    });
  } else {
    next();
  }
});


//PARAMS
app.param('answer', function(req, res, next, id) {
 var query = Answer.findById(id);

 query.exec(function (err, answer){
   if (err) { return next(err); }
   if (!answer) { return next(new Error('can\'t find answer')); }

   req.answer = answer;
   return next();
 });
});

app.param('question', function(req, res, next, id) {
 var query = Question.findById(id);

 query.exec(function (err, question){
   if (err) { return next(err); }
   if (!question) { return next(new Error('can\'t find question')); }

   req.question = question;
   return next();
 });
});

app.param('user', function(req, res, next, id) {
 var query = User.findById(id);

 query.exec(function (err, user){
   if (err) { return next(err); }
   if (!user) { return next(new Error('can\'t find user')); }

   req.user = user;
   return next();
 });
});


//ROUTES
app.post('/contact', contactController.contactPost);
app.put('/account', userController.ensureAuthenticated, userController.accountPut);
app.delete('/account', userController.ensureAuthenticated, userController.accountDelete);
app.post('/signup', userController.signupPost);
app.post('/login', userController.loginPost);
app.post('/forgot', userController.forgotPost);
app.post('/reset/:token', userController.resetPost);
app.get('/unlink/:provider', userController.ensureAuthenticated, userController.unlink);
app.post('/auth/facebook', userController.authFacebook);
app.get('/auth/facebook/callback', userController.authFacebookCallback);
app.get('/questions', questionController.questionsGet);
app.post('/question', questionController.questionPost);
app.get('/answers', answerController.answersGet);
app.get('/answers/:answer', answerController.returnSingleAnswer);
// app.get('/questions/:answer', answerController.findQuestionOfAnswer);
app.get('/questions/:question/answers', answerController.allAnswersToQuestion);
app.post('/answer', answerController.answerPost);
app.put('/account/import', userController.jsonImport);
app.get('/questions/user/answered', questionController.getUserAnsweredQuestions)
app.get('/questions/user/unanswered', questionController.getUserUnansweredQuestions)




app.get('*', function(req, res) {
  res.redirect('/#' + req.originalUrl);
});

// Production error handler
if (app.get('env') === 'production') {
  app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.sendStatus(err.status || 500);
  });
}

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});

module.exports = app;

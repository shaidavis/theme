var Question = require('../models/Question');
var Answer = require('../models/Answer');
// var User = require('../models/User');





/**
 * GET /all questions
 */
exports.questionsGet = function(req, res, next) {  
  Question.find(function(err, questions){
    if(err){ return next(err); }
    // console.log(questions)
    res.json(questions);
  });
};


// exports.getUserAnsweredQuestions = function(req, res, next) {
//   console.log("in route for getUserAnsweredQuestions")
//   var userid = req.user.id
//   Answer.find({userID:userid},function (err, userAnsweredQuestions){
//     if (err) {return next(err); }
//     if (!userAnsweredQuestions) {return next(new Error('user has no answers in system')); }
//     console.log("user's answered questions are:", userAnsweredQuestions)
//   res.json(userAnsweredQuestions)
//   });
// };

exports.getUserAnsweredQuestions = function(req, res, next) {
  console.log("in route for getUserAnsweredQuestions")
  var userid = req.user.id
  Answer.find({ userID: userid })
  .populate('questionID')
  // .populate('answerText')
  .exec(function (err, userAnsweredQuestions) {
    if (err) return handleError(err);
    console.log("user's answered questions are:", userAnsweredQuestions);
    res.json(userAnsweredQuestions)
  });
};

exports.getUserUnansweredQuestions = function(req, res, next) {
  var userid = req.user.id
  Answer.find({userID:userid},function (err, userUnansweredQuestions){
    if (err) {return next(err); }
    if (!userAnsweredQuestions) {return next(new Error('user has no answers in system')); }
    console.log("user's answered questions are:", userAnsweredQuestions)
  res.json(userAnsweredQuestions)
  });
};
  

/**
 * GET /single question
 */
// exports.questionsGet = function(req, res, next) {
//   Question.find(function(err, questions){
//     if(err){ return next(err); }

//     res.json(questions);
//   });
// };

/**
 * POST /question
 */
exports.questionPost = function(req, res, next) {

  console.log("req.body", req.body)
  console.log("I'm in the route!")
  var question = new Question(req.body);

  question.save(function(err, question){
    if(err){ return next(err); }

    res.json(question);
  });
};
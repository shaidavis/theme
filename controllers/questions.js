var Question = require('../models/Question');





/**
 * GET /all questions
 */
exports.questionsGet = function(req, res, next) {
  Question.find(function(err, questions){
    if(err){ return next(err); }

    res.json(questions);
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
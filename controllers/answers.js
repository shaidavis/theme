var express = require('express');
var router = express.Router()

var Answer = require('../models/Answer');
/**
 * GET /all answers to all questions
 '/answers'*/
exports.answersGet = function(req, res, next) {
  Answer.find(function(err, answers){
    if(err){ return next(err); }

    res.json(answers);
  });
};



/* GET / return a JSON of a single answer, given its answer ID 
'/answers/:answer'*/
exports.returnSingleAnswer = function(req, res, next) {
    res.json(req.answer)  
}


/* GET /all answers to a particular question, given a questionID 
'/questions/:question/answers'*/
exports.allAnswersToQuestion = function(req, res, next) {
  console.log('question id:', req.question._id)
  Answer.find({questionID:req.question._id},function (err, allAnswers){
      if (err) {return next(err); }
      if (!allAnswers) {return next(new Error('can\'t find answers')); }
      console.log("allAnswers are:", allAnswers)
  res.json(allAnswers)    
  }) 
};

/**
 * POST /answer
 */
exports.answerPost = function(req, res, next) {
  console.log("I'm in the route!")
  console.log(req.user)
  req.body.userID = req.user.id;  
  
  var answer = new Answer(req.body);
  console.log("answer from the post route:", answer)
  answer.save(function(err, answer){
    if(err){ return next(err); }

    res.json(answer);
  });
};



